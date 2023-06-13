import './css/table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CustomHeaderCell from './Header/CustomHeaderCell';
import CustomCell from './Cell/CustomCell';
import uuid from 'react-uuid';
import { useStore } from '../store';
import AnyColCell from './Cell/AnyColCell';
import ButtonHeader from './Header/ButtonHeader';
import { AiFillPlusCircle } from 'react-icons/ai';
import { handleEditCol } from '../constants/interfaces';

const Table = () => {
  const { addRow, whenRowData, thenRowData } = useStore((store) => store);
  const gridRef: React.MutableRefObject<any> = useRef(null);
  const uniqID = uuid();
  // store when block column data
  const [whenColumnDefs, setWhenColumnDefs] = useState<any[]>([
    // Grouped column
    {
      id: 'hit',
      headerName: 'Hit Ratio',
      headerClass: 'top-column-header',
      children: [
        {
          id: 'any-col',
          headerName: 'Any',
          field: 'any',

          dataType: '',
          maxWidth: 106,
          minWidth: 100,
          pinned: 'left',
          lockPosition: 'left',
          // rowDrag: true,
          headerComponent: () => (
            // Customized Column Header
            <CustomHeaderCell
              label="Any"
              dataType=""
              id="any-col"
              userColumn={false}
              onColumnChange={handleEditCol}
              handlePin={handlePin}
              handleOptions={handleOptions}
            />
          ),
          headerClass: 'column-header', // every column header has this class
          cellRendererFramework: AnyColCell, // It indicates that there is a customised component called "CustomCell" that functions as a cell. This component allows us to customise the cell's appearance.
          cellRendererParams: (params: any) => ({
            // to control its behavior and appearance.
            onEdit: () => {
              // User defined function

              params.api.startEditingCell({
                rowIndex: params.node.rowIndex,
                colKey: params.column.colId,
              });
            },
            id: 'any-col',
            handleAddRow: handleAddRow,
            cellValue: params.value,
          }),
        },
      ],
    },
    {
      id: 'when',
      headerClass: 'ag-header-cell',
      minWidth: 600,
      children: [],
      headerGroupComponent: () => (
        <ButtonHeader name="When" onClick={handleAddWhenCol} />
      ),
    },
    {
      id: 'then',
      headerClass: 'ag-header-cell',
      minWidth: 600,
      children: [
        {
          id: uniqID,
          headerName: '',
          field: uniqID,

          dataType: '',
          sortable: true,
          // rowDrag: true,
          headerComponent: () => (
            <CustomHeaderCell
              label=""
              dataType=""
              id={uniqID}
              userColumn={true}
              onColumnChange={handleEditCol}
              handlePin={handlePin}
              handleOptions={handleOptions}
            />
          ),
          cellRendererFramework: CustomCell,
          cellRendererParams: (params: any) => ({
            onEdit: () => {
              params.api.startEditingCell({
                rowIndex: params.node.rowIndex,
                colKey: params.column.colId,
              });
            },
            cellValue: params.value,
            id: whenColumnDefs.length === 1 ? 'first-col' : '',
            handleAddRow: whenColumnDefs.length === 1 ? handleAddRow : '',
          }),
          headerClass: 'column-header',
        },
      ],
      headerGroupComponent: () => (
        <ButtonHeader name="Then" onClick={handleAddThenCol} />
      ),
    },
    {
      id: 'annotations',
      headerClass: 'ag-header-cell',
      minWidth: 600,
      children: [
        {
          id: 'annotations',
          field: 'annotations',
          headerName: '',
          headerClass: 'column-header',
          headerComponent: () => (
            <CustomHeaderCell
              label="annotations"
              dataType=""
              id="annotations"
              userColumn={true}
              onColumnChange={() => ''}
              handlePin={() => ''}
              handleOptions={() => ''}
            />
          ),
          cellRendererFramework: CustomCell,
          cellRendererParams: (params: any) => ({
            onEdit: () => {
              params.api.startEditingCell({
                rowIndex: params.node.rowIndex,
                colKey: params.column.colId,
              });
            },
            cellValue: params.value,
            id: whenColumnDefs.length === 1 ? 'first-col' : '',
            handleAddRow: whenColumnDefs.length === 1 ? handleAddRow : '',
          }),
        },
      ],
      headerGroupComponent: () => <ButtonHeader name="Annotations" />,
    },
  ]);

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

  // Function used to add columns in then block
  const handleAddThenCol = (): void => {
    setWhenColumnDefs((data: any) => {
      const newIndex = uuid();
      const newColDefs = [...data];

      const updated = {
        id: newIndex,
        headerName: '',
        field: newIndex,

        dataType: '',
        sortable: true,
        // rowDrag: true,
        headerComponent: () => (
          <CustomHeaderCell
            label=""
            dataType=""
            id={newIndex}
            userColumn={true}
            onColumnChange={handleEditCol}
            handlePin={handlePin}
            handleOptions={handleOptions}
          />
        ),
        cellRendererFramework: CustomCell,
        cellRendererParams: (params: any) => ({
          onEdit: () => {
            params.api.startEditingCell({
              rowIndex: params.node.rowIndex,
              colKey: params.column.colId,
            });
          },
          cellValue: params.value,
        }),
        headerClass: 'column-header',
      };
      newColDefs[2].children.push(updated);

      return newColDefs;
    });
  };

  // Function used to add columns in then block
  // In this function, the first thing we do is add a new column with an unique id common for id and field, and rest of the properties as empty.
  // After that, the handleEditCol function will be activated when the user clicks on that column once more to edit the column header information.
  const handleAddWhenCol = (): void => {
    setWhenColumnDefs((data: any) => {
      const newIndex = uuid();
      const newColDefs = [...data];

      const updated = {
        id: newIndex,
        headerName: '',
        field: newIndex,

        dataType: '',
        sortable: true,
        // rowDrag: true,
        headerComponent: () => (
          <CustomHeaderCell
            label=""
            dataType=""
            id={newIndex}
            userColumn={true}
            onColumnChange={handleEditCol}
            handlePin={handlePin}
            handleOptions={handleOptions}
          />
        ),
        cellRendererFramework: CustomCell,
        cellRendererParams: (params: any) => ({
          onEdit: () => {
            params.api.startEditingCell({
              rowIndex: params.node.rowIndex,
              colKey: params.column.colId,
            });
          },
          cellValue: params.value,
          id: whenColumnDefs.length === 1 ? 'first-col' : '',
          handleAddRow: whenColumnDefs.length === 1 ? handleAddRow : '',
        }),
        headerClass: 'column-header',
      };
      newColDefs[1].children.push(updated);
      return newColDefs;
    });
  };

  const handleAddRow = () => {
    addRow(whenColumnDefs, whenColumnDefs); // Need to be fixed
  };
  // Function used when we want to edit the details of column header
  const handleEditCol: handleEditCol = (
    colId, // id of the selected column
    newHeaderName, // new header name provided by the user
    newTypeName // new type ex: string,number...
  ) => {
    if (colId) {
      setWhenColumnDefs((data: any) => {
        const updatedColumnDefs = [...data];
        const whenCol = updatedColumnDefs[1].children;
        const thenCol = updatedColumnDefs[2].children;
        const whenColIndex = whenCol.findIndex((col: any) => col.id === colId);
        const thenColIndex = thenCol.findIndex((col: any) => col.id === colId);

        if (whenColIndex !== -1) {
          const existingCellRendererParams =
            whenCol[whenColIndex].cellRendererParams;

          whenCol[whenColIndex] = {
            ...whenCol[whenColIndex],
            headerName: newHeaderName,
            dataType: newTypeName,
            headerComponent: () => (
              <CustomHeaderCell
                label={newHeaderName}
                dataType={newTypeName}
                id={colId}
                userColumn={true}
                onColumnChange={handleEditCol}
                handlePin={handlePin}
                handleOptions={handleOptions}
              />
            ),
            cellRendererParams: (params: any) => ({
              ...existingCellRendererParams(params),
              onEdit: () => {
                params.api.startEditingCell({
                  rowIndex: params.node.rowIndex,
                  colKey: params.column.colId,
                });
              },
            }),
          };
        }

        if (thenColIndex !== -1) {
          const existingCellRendererParams =
            thenCol[thenColIndex].cellRendererParams;

          thenCol[thenColIndex] = {
            ...thenCol[thenColIndex],
            headerName: newHeaderName,
            dataType: newTypeName,
            headerComponent: () => (
              <CustomHeaderCell
                label={newHeaderName}
                dataType={newTypeName}
                id={colId}
                userColumn={true}
                onColumnChange={handleEditCol}
                handlePin={handlePin}
                handleOptions={handleOptions}
              />
            ),
            cellRendererParams: (params: any) => ({
              ...existingCellRendererParams(params),
              onEdit: () => {
                params.api.startEditingCell({
                  rowIndex: params.node.rowIndex,
                  colKey: params.column.colId,
                });
              },
            }),
          };
        }
        return updatedColumnDefs;
      });
    }
  };
  // function used to pin a column
  const handlePin = (id: string): void => {
    setWhenColumnDefs((data: any) => {
      const updatedColumnDefs = [...data];
      const index = updatedColumnDefs.findIndex((col) => col.id === id);
      const column = updatedColumnDefs[index];
      updatedColumnDefs[index] = {
        ...column,
        pinned: 'left', // Set pinned property to 'left' unconditionally
      };

      return updatedColumnDefs;
    });
  };
  const gridOptions = {
    // other grid options...
    suppressDragLeaveHidesColumns: true,
  };

  const handleOptions = useCallback(
    (id: string, selectedOption: string): void => {
      if (selectedOption.includes('remove')) {
        setWhenColumnDefs((prevData) => {
          const updatedCols = [...prevData];
          const selectedCol = updatedCols.findIndex((col) => col.id === id);

          let filteredCols: any;

          if (selectedCol !== 1) {
            filteredCols = updatedCols.filter((col) => col.id !== id);
          }
          if (updatedCols[2]) {
            updatedCols[2] = {
              ...updatedCols[2],
              cellRendererParams: (params: any) => ({
                onEdit: () => {
                  params.api.startEditingCell({
                    rowIndex: params.node.rowIndex,
                    colKey: params.column.colId,
                  });
                },
                cellValue: params.value,
                id: 'first-col',
                handleAddRow: handleAddRow,
              }),
            };
            filteredCols = updatedCols.filter((col) => col.id !== id);
            return filteredCols;
          }
          // Handle- Incase of only one column
          filteredCols = [...prevData];
          return filteredCols;
        });
      } else if (selectedOption.includes('a-z')) {
        gridRef.current?.columnApi?.applyColumnState({
          // Api provided to perform sorting on the column data
          state: [{ colId: id, sort: 'asc' }], // here colId - represents which column need to be sorted and sort - whether it is ascending or descending
          defaultState: { sort: null },
        });
      } else if (selectedOption.includes('z-a')) {
        gridRef.current?.columnApi?.applyColumnState({
          state: [{ colId: id, sort: 'desc' }],
          defaultState: { sort: null },
        });
      } else if (selectedOption.includes('duplicate')) {
        setWhenColumnDefs((prevData) => {
          const updatedColDefs: any = [...prevData];

          const index = updatedColDefs.findIndex((col: any) => col.id === id);
          const newid = uuid();

          const selectedColumn = {
            ...updatedColDefs[index],
            id: newid,
            field: newid,
          };
          updatedColDefs.push(selectedColumn);
          return updatedColDefs;
        });
      }
    },
    [whenColumnDefs]
  );

  const handleCellValueChanged = (params: any) => {
    params.api.stopEditing();
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
  // using this to stop re-render of this below use effect
  const isFirstRender = useRef(true);

  // this one will create a column without any value of header name and it's type
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (whenColumnDefs[1].children.length <= 1) {
        // this function is calling to add column at first render
        handleAddWhenCol();
      }
    }
  }, [whenColumnDefs?.length]);

  return (
    <div className="flex flex-col max-w-[130%]">
      <div className="scroll-wrapper flex w-full mt-5 border-t-[1px] border-[#e7e7e7]">
        <div className="flex-1 w-full h-[300px]">
          <AgGridReact
            ref={gridRef}
            rowData={whenRowData}
            // columnDefs={whenColDefs} //zustand state column array
            columnDefs={whenColumnDefs}
            defaultColDef={defaultColDef}
            className={`ag-theme-alpine`}
            gridOptions={gridOptions}
            onCellValueChanged={handleCellValueChanged} //onCellValueChanged - property is used to specify a callback function that will be triggered when the value of a cell in the data grid or table is changed.
            rowDragManaged={true}
            // domLayout={'autoHeight'}
            animateRows={true}
            groupHeaderHeight={42}
            headerHeight={65}
            isFullWidthRow={isFullWidthRow}
          />
        </div>
      </div>
    </div>
  );
};
export default Table;
