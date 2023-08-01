import { useStore } from '../store';
import './css/table.scss';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { DecisionTableDataType, Rule, Column, DataTableProps } from '../constants/interfaces';
const Table: React.FC<DataTableProps> = (props) => {
  const { rowData, mode, rowDataType, colDefs, addRowsByProps, setColDefs } = useStore(
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
      sortable: true,
      filter: true,
      editable: false,
      flex: 1,
      minWidth: 300,
    }),
    []
  );

  const renderPropsRows = useCallback(() => {
    if (props.initialValues?.columns.length) {
      addRowsByProps(props.initialValues.columns, props.initialValues.rows);
    }
  }, [props]);

  useEffect(() => {
    renderPropsRows();
  }, []);

  const isFullWidthRow = useCallback((params: any) => {
    return params.rowNode.data.fullWidth;
  }, []);
  useEffect(() => {
    document.body.className = props.mode + '-theme';
  }, [props.mode]);


  // this hook works to get the updated or newly created columns and rows data to send them back to the root component
  useEffect(() => {
    
    // getting all when column data
    const whenCol = colDefs[1].children.map((item, index) => {
      return {
        key: item.id,
        name: item.headerName ? item.headerName : '',
        type: item.dataType,
        isPinned: item.isPinned,
      };
    });

    // getting all then column data
    const thenCol = colDefs[2].children.map((item, index) => {
      return {
        key: item.id,
        name: item.headerName ? item.headerName : '',
        type: item.dataType,
        isPinned: item.isPinned,
      };
    });

    // merging them all into a single one
    const allCols = [...whenCol, ...thenCol];

    const newData: DecisionTableDataType<Rule,Column> = {
        rows: rowDataType,
        columns: allCols,
    };
    props && props.onChange !== undefined && props.onChange(newData);

    // this point we are storing existing columns and rows data inside our session storage to show while reload
    // sessionStorage.setItem("colDefs", JSON.stringify(colDefs));
    // sessionStorage.setItem("rowDataType", JSON.stringify(rowDataType));
  }, [rowDataType, colDefs]);

  return (
    <div className="flex flex-col max-w-[130%] bg-[var(--secondary-bg)] h-full">
      <div className="scroll-wrapper flex w-full mt-5 border-t-[1px] border-[var(--primary-border)]">
        <div className="flex-1 w-full h-[400px]">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            className={`ag-theme-alpine`}
            // onCellValueChanged={handleCellValueChanged} - property is used to specify a callback function that will be triggered when the value of a cell in the data grid or table is changed.
            rowDragManaged={true}
            animateRows={true}
            groupHeaderHeight={42}
            headerHeight={65}
            isFullWidthRow={isFullWidthRow}
            // modules={[ExcelExportModule, CsvExportModule]} // Registering csv and excel to download
            suppressClickEdit={true}
          />
        </div>
      </div>
    </div>
  );
};
export default Table;
