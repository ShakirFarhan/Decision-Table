import { useStore } from '../store';
import './css/table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import DashBoardLayout from './layout/indext';
const Table = () => {
  const { whenRowData, mode, editRowData, colDefs, setGridRef } = useStore(
    (store) => store
  );

  const gridRef: React.MutableRefObject<any> = useRef(null);

  //default options for each column, For the column, it has some predefined properties related to their behaviour.
  const defaultColDef = useMemo(
    () => ({
      enableRowGroup: true,
      enableValue: true,
      enablePivot: true,
      width: 200,
      // resizable: true,
      sortable: true,
      filter: true,
      editable: false,
      flex: 1,
      minWidth: 300,
    }),
    []
  );

  const isFullWidthRow = useCallback((params: any) => {
    return params.rowNode.data.fullWidth;
  }, []);

  const gridOptions = {
    // other grid options...
    suppressDragLeaveHidesColumns: true,
  };

  useEffect(() => {
    window.addEventListener('error', (e) => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);
  useEffect(() => {
    // Set the grid column definitions whenever colDefs changes
    if (gridRef.current && gridRef.current.gridOptions) {
      gridRef.current.gridOptions.api.setColumnDefs(colDefs);
    }
  }, [colDefs]);
  useEffect(() => {
    document.body.className = mode + '-theme';
  }, [mode]);
  // using this to stop re-render of this below use effect

  //  converts the data available in the table to excel and then it downloads it
  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel({
      fileName: 'exported_table.xlsx',
      processCellCallback: (params: any) => {
        if (params.value && typeof params.value === 'object') {
          return params.value.value; // for type params.value.type
        }
        return params.value;
      },
    });
  }, []);

  const csvDownload = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({
      fileName: 'exported_table.csv',
      processCellCallback: (params: any) => {
        if (params.value && typeof params.value === 'object') {
          return params.value.value; // for type params.value.type
        }
        return params.value;
      },
    });
  }, []);
  // this was causing the delay
  // useEffect(() => {
  //   setGridRef(gridRef);
  // }, [setGridRef]);
  const handleCellValueChanged = (value: any) => {
    const colId = value.column.colId;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editRowData(value, value?.rowIndex, colId, value.newValue);
  };

  return (
    <DashBoardLayout downloadCSV={csvDownload} downloadExcel={onBtExport}>
      <div className="flex flex-col max-w-[130%] bg-[var(--secondary-bg)] h-full">
        <div className="scroll-wrapper flex w-full mt-5 border-t-[1px] border-[var(--primary-border)]">
          <div className="flex-1 w-full h-[400px]">
            <AgGridReact
              ref={gridRef}
              rowData={whenRowData}
              columnDefs={colDefs}
              defaultColDef={defaultColDef}
              className={`ag-theme-alpine`}
              gridOptions={gridOptions}
              onCellValueChanged={handleCellValueChanged}
              // onCellValueChanged={handleCellValueChanged} - property is used to specify a callback function that will be triggered when the value of a cell in the data grid or table is changed.
              rowDragManaged={true}
              animateRows={true}
              groupHeaderHeight={42}
              headerHeight={65}
              isFullWidthRow={isFullWidthRow}
              modules={[ExcelExportModule, CsvExportModule]} // Registering csv and excel to download
              suppressClickEdit={true}
            />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
};
export default Table;
