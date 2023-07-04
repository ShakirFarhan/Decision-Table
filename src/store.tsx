import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { children, columnInterface } from './constants/interfaces';
import { devtools } from 'zustand/middleware';
import CustomCell from './components/Cell/CustomCell';
import CustomHeaderCell from './components/Header/CustomHeaderCell';
import AnyColCell from './components/Cell/AnyColCell';
import ButtonHeader from './components/Header/ButtonHeader';
import uuid from 'react-uuid';
import { deepClone } from './utils';
let whenID = uuid();
let thenID = uuid();
export interface zustandStoreInterface {
  whenRowData: any[];
  rowDataType: any[];
  thenRowData: any[];
  past: any[];
  future: any[];
  pinnedColumn: any;
  colDefs: columnInterface[];
  gridRef: any;
  mode: 'light' | 'dark';
  undo: () => void;
  redo: () => void;
  handleOptions: (id: any, typeOfOperation: any) => void;
  handleEditCol: (id: any, newHeaderName: any, newTypeName: any) => void;
  handlePin: (id: any) => void;
  addThenColumnDefs: () => void;
  addWhenColumnDefs: () => void;
  editRowData: (core: any, rowIndex: any, colId: any, value: any) => void;
  editRowDataType: (core: any, rowIndex: any, colId: any, value: any) => void;
  addRow: (whenColData: any, thenColData: any) => void;
  duplicateRule: (id: number) => void;
  deleteRule: (id: number) => void;
  clearRule: (id: number) => void;
  setMode: (mode: 'light' | 'dark') => void;
  setGridRef: (gridRef: any) => void;
}

export const useStore = create<zustandStoreInterface>()(
  devtools(
    immer((set, get, api) => ({
      past: [],
      future: [],
      undo: () =>
        set((store) => {
          const pastState = [...store.past];
          const futureState = [...store.future];
          const previousState = pastState.pop();
          if (previousState) {
            futureState.push(store); // Save current state to future
            return {
              ...previousState,
              past: pastState,
              future: futureState,
            };
          }
          return store;
        }),
      redo: () =>
        set((store) => {
          const pastState = [...store.past];
          const futureState = [...store.future];
          const nextState = futureState.pop();
          if (nextState) {
            pastState.push(store); // Save current state to past
            return {
              ...nextState,
              past: pastState,
              future: futureState,
            };
          }
          return store;
        }),
      rowDataType: [],
      gridRef: '',
      colDefs: [
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
              editable: false,
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

                cellValue: params.node.rowIndex + 1,
              }),
            },
          ],
        },
        {
          id: 'when',
          headerClass: 'ag-header-cell',
          lockPosition: true,
          children: [
            {
              id: whenID,
              headerName: '',
              field: whenID,
              dataType: '',
              isPinned: false,
              sortable: true,
              headerComponent: () => (
                <CustomHeaderCell
                  label=""
                  dataType=""
                  id={whenID}
                  userColumn={true}
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
                // id: columnDefs.length === 1 ? 'first-col' : '',
              }),
              headerClass: 'column-header',
            },
          ],
          headerGroupComponent: () => <ButtonHeader name="When" />,
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
              isPinned: false,
              dataType: '',
              sortable: true,

              headerComponent: () => (
                <CustomHeaderCell
                  label=""
                  dataType=""
                  id={thenID}
                  userColumn={true}
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
                // id: columnDefs.length === 1 ? 'first-col' : '',
              }),
              headerClass: 'column-header',
            },
          ],
          headerGroupComponent: () => <ButtonHeader name="Then" />,
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
              isPinned: false,
              headerClass: 'column-header',
              headerComponent: () => (
                <CustomHeaderCell
                  label="annotations"
                  dataType=""
                  id="annotations"
                  userColumn={true}
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
                // id: columnDefs.length === 1 ? 'first-col' : '',
              }),
            },
          ],
          headerGroupComponent: () => <ButtonHeader name="Annotations" />,
        },
      ],

      whenRowData: [
        {
          button: 'Add Rule',
        },
      ],
      thenColData: [],
      thenRowData: [],
      pinnedColumn: null,
      mode: 'light',
      setGridRef: (gridRef) =>
        set((store) => ({
          gridRef: gridRef,
        })),
      addWhenColumnDefs: () =>
        set((store) => {
          const newIndex = uuid();
          const newColDefs: any[] = deepClone(store.colDefs); // Creating a deep copy of store.colDefs
          console.log(newColDefs);
          const updated = {
            id: newIndex,
            headerName: '',
            field: newIndex,
            dataType: '',
            sortable: true,
            isPinned: false,
            headerComponent: () => (
              <CustomHeaderCell
                label=""
                dataType=""
                id={newIndex}
                userColumn={true}
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
          newColDefs[1].children.push(updated);
          return {
            // ...store,
            past: [...store.past, deepClone(store)], // Saving the previous state to past
            future: [],
            colDefs: newColDefs,
          };
        }),
      // Function used to add columns in then block
      // In this function, the first thing we do is add a new column with an unique id common for id and field, and rest of the properties as empty.
      // After that, the handleEditCol function will be activated when the user clicks on that column once more to edit the column header information.
      addThenColumnDefs: () =>
        set((store) => {
          const newIndex = uuid();
          const newColDefs: any = deepClone(store.colDefs);
          const updated = {
            id: newIndex,
            headerName: '',
            field: newIndex,
            dataType: '',
            sortable: true,
            isPinned: false,
            headerComponent: () => (
              <CustomHeaderCell
                label=""
                dataType=""
                id={newIndex}
                userColumn={true}
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
          return {
            colDefs: newColDefs,
            past: [...store.past, deepClone(store)],
          };
        }),

      // Function used when we want to edit the details of column header
      handleEditCol: (colId, newHeaderName, newTypeName) =>
        set((store) => {
          if (colId) {
            const updatedColumnDefs: any = deepClone(store.colDefs);
            const whenCol = updatedColumnDefs[1].children;
            const thenCol = updatedColumnDefs[2].children;
            const whenColIndex = whenCol.findIndex(
              (col: any) => col.id === colId
            );
            const thenColIndex = thenCol.findIndex(
              (col: any) => col.id === colId
            );
            if (whenColIndex !== -1) {
              const existingCellRendererParams =
                whenCol[whenColIndex].cellRendererParams;
              const updatedWhenCol = {
                ...whenCol[whenColIndex],
                headerName: newHeaderName,
                dataType: newTypeName,
                headerComponent: () => (
                  <CustomHeaderCell
                    label={newHeaderName}
                    dataType={newTypeName}
                    id={colId}
                    userColumn={true}
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
              whenCol[whenColIndex] = updatedWhenCol;
            }

            if (thenColIndex !== -1) {
              const existingCellRendererParams =
                thenCol[thenColIndex].cellRendererParams;
              const updatedThenCol = {
                ...thenCol[thenColIndex],
                headerName: newHeaderName,
                dataType: newTypeName,
                headerComponent: () => (
                  <CustomHeaderCell
                    label={newHeaderName}
                    dataType={newTypeName}
                    id={colId}
                    userColumn={true}
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
              thenCol[thenColIndex] = updatedThenCol;
            }
            return {
              colDefs: updatedColumnDefs,
              past: [...store.past, deepClone(store)], // Save current state to past
              future: [],
            };
          } else {
            return {
              colDefs: [store.colDefs],
              past: [...store.past, deepClone(store)], // Save current state to past
              future: [],
            };
          }
        }),
      handleOptions: (id, typeOfOperation) =>
        set((store) => {
          if (typeOfOperation.includes('remove')) {
            const updatedCols: any = deepClone(store.colDefs);
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

            return {
              colDefs: updatedCols,
              past: [...store.past, deepClone(store)], // Save current state to past
              future: [],
            };
          } else if (typeOfOperation.includes('a-z')) {
            const columnState =
              store.gridRef.current?.columnApi?.getColumnState();
            const sortedColumns = columnState.map((column: any) => {
              if (column.colId === id) {
                return { ...column, sort: 'asc' }; // Apply ascending sorting to the specified column
              } else {
                return { ...column, sort: null }; // Remove sorting from other columns
              }
            });

            store.gridRef.current?.columnApi?.applyColumnState({
              state: sortedColumns,
            });
            return {
              colDefs: { ...store.colDefs },
            };
          } else if (typeOfOperation.includes('z-a')) {
            store.gridRef.current?.columnApi?.applyColumnState({
              state: [{ colId: id, sort: 'desc' }],
              defaultState: { sort: null },
            });
            return {
              colDefs: { ...store.colDefs },
            };
          } else if (typeOfOperation.includes('duplicate')) {
            // const updatedColDefs: any = [...prevData];
            const updatedColDefs = deepClone(store.colDefs);
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
            return {
              colDefs: updatedColDefs,
              past: [...store.past, deepClone(store)], // Save current state to past
              future: [],
            };
          } else {
            return {
              colDefs: store.colDefs,
            };
          }
        }),
      // function used to pin a column
      handlePin: (id) =>
        set((store) => {
          const updatedColumnDefs: columnInterface[] = deepClone(store.colDefs);
          const whenCol: children[] = updatedColumnDefs[1].children;
          const thenCol: children[] = updatedColumnDefs[2].children;

          const whenColIndex = whenCol.findIndex((col: any) => col.id === id);
          const thenColIndex = thenCol.findIndex((col: any) => col.id === id);
          if (whenColIndex !== -1) {
            const selectedColumn = whenCol[whenColIndex];
            if (selectedColumn.isPinned) {
              // Column is currently pinned, so unpin it and move to previous position
              selectedColumn.isPinned = false;
              whenCol.splice(whenColIndex, 1);
              whenCol.splice(selectedColumn.previousIndex, 0, selectedColumn);
            } else {
              // Column is currently not pinned, so pin it and move to the first index
              selectedColumn.isPinned = true;
              selectedColumn.previousIndex = whenColIndex; // Store the previous index
              whenCol.splice(whenColIndex, 1);
              whenCol.splice(0, 0, selectedColumn);
            }
          }
          if (thenColIndex !== -1) {
            const selectedColumn = thenCol[thenColIndex];
            if (selectedColumn) {
              if (selectedColumn.isPinned) {
                // Column is currently pinned, so unpin it and move to previous position
                selectedColumn.isPinned = false;
                thenCol.splice(thenColIndex, 1);
                thenCol.splice(selectedColumn.previousIndex, 0, selectedColumn);
              } else {
                // Column is currently not pinned, so pin it and move to the first index
                selectedColumn.isPinned = true;
                selectedColumn.previousIndex = thenColIndex; // Store the previous index
                thenCol.splice(thenColIndex, 1);
                thenCol.splice(0, 0, selectedColumn);
              }
            }
          }

          return {
            colDefs: updatedColumnDefs,
            past: [...store.past, deepClone(store)], // Save current state to past
            future: [],
          };
        }),
      setMode: (mode) =>
        set((store) => ({
          mode: mode,
          // past: [...store.past, store],
          // future: [],
        })),
      duplicateRule: (id) =>
        set((store) => {
          const whenRowData = deepClone(store.whenRowData);
          const duplicatedRow = {
            ...whenRowData[id - 1],
            any: store.whenRowData.length,
          };
          whenRowData.splice(whenRowData.length - 1, 0, duplicatedRow);

          return {
            whenRowData: whenRowData,
            past: [...store.past, deepClone(store)], // Save current state to past
            future: [],
          };
        }),

      clearRule: (id) =>
        set((store) => {
          const allrowdata = store.rowDataType.filter(
            (value) => value.rowIndex !== id - 1
          );

          return {
            whenRowData: store.whenRowData.map((data) => {
              if (data.any === id) {
                return {
                  any: data.any,
                  [data]: '',
                };
              }
              return data;
            }),
            rowDataType: allrowdata,
            past: [...store.past, store], // Save current state to past
            future: [],
          };
        }),

      deleteRule: (id) =>
        set((store) => {
          const allrowdata = store.rowDataType.filter(
            (value) => value.rowIndex !== id - 1
          );
          return {
            whenRowData: store.whenRowData.filter((data) => data.any !== id),
            rowDataType: allrowdata,
            past: [...store.past, store], // Save current state to past
            future: [],
          };
        }),

      editRowDataType: (core, rowIndex, colId, value) =>
        set((store) => {
          const newdata = [];
          const storedata = store.rowDataType;
          const existingindex = store.rowDataType?.findIndex(
            (item: any) => item.key === colId && item.rowIndex === rowIndex
          );

          if (existingindex !== -1) {
            storedata.splice(existingindex, 1);
          }

          storedata.map((item: any) => {
            newdata.push(item);
            return item;
          });

          // pushing newly created row type to the stateR
          newdata.push({
            key: colId,
            value: value,
            rowIndex: rowIndex,
          });

          // storing all to the state
          const updateRowData = [...newdata];

          return {
            rowDataType: updateRowData,
            past: [...store.past, store], // Save current state to past
            future: [],
          };
        }),

      editRowData: (core, rowIndex, colId, value) =>
        set((store) => {
          const updatedRowData = [...store.whenRowData];
          const rowToUpdate = updatedRowData[rowIndex];
          rowToUpdate[colId] = value;
          return {
            whenRowData: updatedRowData,
            past: [...store.past, store], // Save current state to past
            future: [],
          };
        }),

      addRow: (whenColDeta, thenColData) =>
        set((store) => {
          const newWhenRowData = [...store.whenRowData];
          const newThenRowData = [...store.thenRowData];

          const newRowData = Object.fromEntries(
            whenColDeta.map((header: any, index: number) => {
              if (header.id === 'hit') {
                return ['any', store.whenRowData.length];
              }
              return [header.field, ''];
            })
          );

          // Inserting the new row at the second-to-last position
          newWhenRowData.splice(newWhenRowData.length - 1, 0, newRowData);

          const newThenRow = Object.fromEntries(
            thenColData.map((header: any) => [header.field, ''])
          );

          newThenRowData.push(newThenRow);

          return {
            whenRowData: newWhenRowData,
            thenRowData: newThenRowData,
            past: [...store.past, store], // Saving the current state to past
            future: [],
          };
        }),
    }))
  )
);
