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
import { handleEditCol } from '../constants/interfaces';
import { GrDownload } from 'react-icons/gr';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import DashBoardLayout from './layout/indext';
import PopupCell from './Cell/PopupCell';
// cell code
// interface tableInterface {
//   rowData: any[];
//   columnData: any[];
// }
// const disable = (id: any, disabled: any) => {
//   const element = document.querySelector(id);
//   if (element !== null) {
//     element.disabled = disabled;
//   } else {
//     console.error(`Element with ID ${id} not found.`);
//   }
// };

// const setValue = (id: any, value: any) => {
//   if (value) {
//     document.querySelector(id).value = value;
//   }
// };
const Table = () => {
  const { addRow, whenRowData } = useStore((store) => store);
  //cell code
  // const [undoValue, setUndoValue] = useState(null);
  // const [redoValue, setRedoValue] = useState(null);

  const gridRef: React.MutableRefObject<any> = useRef(null);
  const whenID = uuid();
  const thenID = uuid();

  // store when block column data
  const [whenColumnDefs, setWhenColumnDefs] = useState<any[]>([
    // Grouped column
    {
      id: 'hit',
      headerName: 'Hit Ratio',
      headerClass: 'top-column-header',
      suppressMovable: true,

      children: [
        {
          id: 'any-col',
          headerName: 'Any',
          field: 'any',
          dataType: '',
          maxWidth: 106,
          minWidth: 100,
          pinned: 'left',
          suppressMovable: true,
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
      children: [
        {
          id: whenID,
          headerName: '',
          field: whenID,

          dataType: '',
          sortable: true,
          // cell code
          // cellDataType: 'object',
          // valueParser: (params: any) => {
          //   // convert `params.newValue` string value into complex object
          //   console.log('pasrser');
          //   return {
          //     actualValue: params.newValue,
          //     anotherProperty: params.data.anotherProperty,
          //   };
          // },
          // valueGetter: (params: any) => {
          //   // create complex object from data
          //   return {
          //     actualValue: params.data[params.colDef.field],
          //     anotherProperty: params.data.anotherProperty,
          //   };
          // },
          // valueSetter: (params: any) => {
          //   // update data from complex object
          //   console.log('setter');
          //   params.data[params.colDef.field] = params.newValue.actualValue;
          //   return true;
          // },
          // equals: (valueA: any, valueB: any) => {
          //   // compare complex objects
          //   return valueA.actualValue === valueB.actualValue;
          // },

          headerComponent: () => (
            <CustomHeaderCell
              label=""
              dataType=""
              id={whenID}
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
          cellEditor: PopupCell,
          cellEditorParams: (params: any) => ({
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
          cellEditorPopup: true,
          headerClass: 'column-header',
        },
      ],
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
          id: thenID,
          headerName: '',
          field: thenID,

          dataType: '',
          sortable: true,
          // rowDrag: true,
          headerComponent: () => (
            <CustomHeaderCell
              label=""
              dataType=""
              id={thenID}
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
      editable: true,
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
      const whenCol = updatedColumnDefs[1].children;
      const thenCol = updatedColumnDefs[2].children;
      const whenColIndex = whenCol.findIndex((col: any) => col.id === id);
      const thenColIndex = thenCol.findIndex((col: any) => col.id === id);
      if (whenColIndex !== -1) {
        whenCol[whenColIndex] = {
          ...whenCol[whenColIndex],
          pinned: 'left', // Set pinned property to 'left' unconditionally
        };
      }

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
          let whenCol = updatedCols[1].children;
          let thenCol = updatedCols[2].children;
          const whenColIndex = whenCol.findIndex((col: any) => col.id === id);
          const thenColIndex = thenCol.findIndex((col: any) => col.id === id);

          if (whenColIndex !== -1) {
            if (whenColIndex !== 0) {
              whenCol = whenCol.filter((col: any) => col.id !== id);
            }
          }

          if (thenColIndex !== -1) {
            if (thenColIndex !== 0) {
              thenCol = thenCol.filter((col: any) => col.id !== id);
            }
          }

          updatedCols[1].children = whenCol;
          updatedCols[2].children = thenCol;

          return updatedCols;
        });
      } else if (selectedOption.includes('a-z')) {
        const columnState = gridRef.current?.columnApi?.getColumnState();
        const sortedColumns = columnState.map((column: any) => {
          if (column.colId === id) {
            return { ...column, sort: 'asc' }; // Apply ascending sorting to the specified column
          } else {
            return { ...column, sort: null }; // Remove sorting from other columns
          }
        });

        gridRef.current?.columnApi?.applyColumnState({ state: sortedColumns });
      } else if (selectedOption.includes('z-a')) {
        gridRef.current?.columnApi?.applyColumnState({
          state: [{ colId: id, sort: 'desc' }],
          defaultState: { sort: null },
        });
      } else if (selectedOption.includes('duplicate')) {
        setWhenColumnDefs((prevData) => {
          // const updatedColDefs: any = [...prevData];
          const updatedColDefs = [...prevData];
          const whenCol = updatedColDefs[1].children;
          const thenCol = updatedColDefs[2].children;
          const whenColIndex = whenCol.findIndex((col: any) => col.id === id);
          const thenColIndex = thenCol.findIndex((col: any) => col.id === id);

          if (whenColIndex !== -1) {
            const newid = uuid();
            const existingHeaderComponent =
              whenCol[whenColIndex].headerComponent;

            const selectedColumn = {
              ...whenCol[whenColIndex],
              id: newid,
              field: newid,
              headerComponent: (props: any) => (
                <CustomHeaderCell
                  {...existingHeaderComponent().props} // Pass the previous props
                  id={newid}
                />
              ),
            };
            updatedColDefs[1].children.push(selectedColumn);
          }
          if (thenColIndex !== -1) {
            const newid = uuid();
            const existingHeaderComponent =
              thenCol[thenColIndex].headerComponent;

            const selectedColumn = {
              ...thenCol[thenColIndex],
              id: newid,
              field: newid,
              headerComponent: (props: any) => (
                <CustomHeaderCell
                  {...existingHeaderComponent().props} // Pass the previous props
                  id={newid}
                />
              ),
            };
            updatedColDefs[2].children.push(selectedColumn);
          }

          return updatedColDefs;
        });
      }
    },
    []
  );

  // const handleCellValueChanged = (params: any) => {
  //   params.api.stopEditing();
  // };

  // cell code
  // // ---------- Undo/Redo -----------

  // const onFirstDataRendered = useCallback(() => {
  //   setValue('#undoInput', 0);
  //   disable('#undoInput', true);
  //   disable('#undoBtn', true);
  //   setValue('#redoInput', 0);
  //   disable('#redoInput', true);
  //   disable('#redoBtn', true);
  // }, []);

  const onCellValueChanged = useCallback((params: any) => {
    // console.log(params);
    // console.log('value changed');
    // var undoSize = gridRef.current.api.getCurrentUndoSize();
    // // setValue('#undoInput', undoSize);
    // setUndoValue(undoSize);
    // disable('#undoBtn', undoSize < 1);
    // var redoSize = gridRef.current.api.getCurrentRedoSize();
    // // setValue('#redoInput', redoSize);
    // setRedoValue(redoSize);
    // disable('#redoBtn', redoSize < 1);
  }, []);

  // const undo = useCallback(() => {
  //   gridRef.current.api.undoCellEditing();
  // }, []);

  // const redo = useCallback(() => {
  //   gridRef.current.api.redoCellEditing();
  // }, []);

  // // --------------------------------
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
  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     if (whenColumnDefs[1].children.length <= 1) {
  //       // this function is calling to add column at first render
  //       handleAddWhenCol();
  //     }
  //   }
  // }, [whenColumnDefs, handleAddWhenCol]);

  // const onBtExport = useCallback(() => {
  //   gridRef.current.api.exportDataAsExcel();
  // }, []);

  //  converts the data available in the table to excel and then it downloads it

  const onCellClicked = (event: any) => {
    console.log('Cell clicked:', event);
  };

  const onCellEditStart = (event: any) => {
    console.log('Cell edited started :', event);
  };
  const onCellEditEnd = (event: any) => {
    console.log('Cell edited ended :', event);
  };
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
  return (
    <DashBoardLayout
      // cell code
      handleRedo={() => ''}
      handleUndo={() => ''}
      downloadCSV={csvDownload}
      downloadExcel={onBtExport}
    >
      <div className="flex flex-col max-w-[130%]">
        {/*  cell code  */}
        {/* <div>
          <span className="button-group">
            <label>Available Undo's</label>
            <input
              id="undoInput"
              className="undo-redo-input"
              value={undoValue ? undoValue : 0}
            />
            <label>Available Redo's</label>
            <input
              id="redoInput"
              className="undo-redo-input"
              value={redoValue ? redoValue : 0}
            />
            <button id="undoBtn" className="undo-btn" onClick={undo}>
              Undo
            </button>
            <button id="redoBtn" className="redo-btn" onClick={redo}>
              Redo
            </button>
          </span>
        </div> */}
        <div className="scroll-wrapper flex w-full mt-5 border-t-[1px] border-[#e7e7e7]">
          <div className="flex-1 w-full h-[300px]">
            <AgGridReact
              ref={gridRef}
              rowData={whenRowData}
              columnDefs={whenColumnDefs}
              defaultColDef={defaultColDef}
              className={`ag-theme-alpine`}
              gridOptions={gridOptions}
              // onCellValueChanged={handleCellValueChanged} //onCellValueChanged - property is used to specify a callback function that will be triggered when the value of a cell in the data grid or table is changed.
              rowDragManaged={true}
              animateRows={true}
              groupHeaderHeight={42}
              headerHeight={65}
              isFullWidthRow={isFullWidthRow}
              modules={[ExcelExportModule, CsvExportModule]} // Registering csv and excel to download
              suppressClickEdit={true}
              // undo/redo related - cell code
              // enterMovesDown={true}
              // enableRangeSelection={true}
              // enableFillHandle={true}
              // undoRedoCellEditing={true}
              // undoRedoCellEditingLimit={5}
              // enableCellChangeFlash={true}
              // onFirstDataRendered={onFirstDataRendered}

              onCellValueChanged={onCellValueChanged}
              onCellClicked={onCellClicked}
              onCellEditingStarted={onCellEditStart}
              onCellEditingStopped={onCellEditEnd}
            />
          </div>
        </div>
      </div>
    </DashBoardLayout>
  );
};
export default Table;
