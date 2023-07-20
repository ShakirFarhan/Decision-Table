import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  Row,
  children,
  columnInterface,
  cellValue,
} from './constants/interfaces';
import {
  produceWithPatches,
  applyPatches,
  produce,
  enablePatches,
} from 'immer';
import { devtools } from 'zustand/middleware';
import CustomCell from './components/Cell/CustomCell';
import CustomHeaderCell from './components/Header/CustomHeaderCell';
import AnyColCell from './components/Cell/AnyColCell';
import ButtonHeader from './components/Header/ButtonHeader';
import uuid from 'react-uuid';
import { deepClone } from './utils';
let whenID = uuid();
let thenID = uuid();
enablePatches();
export interface zustandStoreInterface {
  whenRowData: any[];
  rowDataType: Row[];
  past: zustandStoreInterface[];
  future: zustandStoreInterface[];
  history: any;
  index: number;
  colDefs: columnInterface[];
  gridRef: any;
  mode: 'light' | 'dark';
  undo: () => void;
  redo: () => void;
  handleOptions: (id: string, typeOfOperation: string) => void;
  handleEditCol: (
    id: string,
    newHeaderName: string,
    newTypeName: string
  ) => void;
  handlePin: (id: string) => void;
  addThenColumnDefs: () => void;
  addWhenColumnDefs: () => void;
  editRowData: (rowIndex: number, colId: string, value: cellValue) => void;
  editRowDataType: (rowIndex: number, colId: string, value: cellValue) => void;
  addRow: (
    whenColData: columnInterface[],
    thenColData: columnInterface[]
  ) => void;
  duplicateRule: (id: number) => void;
  deleteRule: (id: number) => void;
  clearRule: (id: number) => void;
  clearColumn: (id: string) => void;
  setMode: (mode: 'light' | 'dark') => void;
  addRowsByProps: (columns: any[], rows: any[]) => void;
  setGridRef: (ref: any) => void;
  addCsvImportColumns: (columnHeaders: any[], columnRows: any[]) => void;
}


export const useStore = create<zustandStoreInterface>()(
  devtools(
    immer((set, get, api) => ({
      past: [],
      future: [],
      history: [],
      index: -1,
      undo: () => {
        set((state) => {
          const { history, index } = state;
          if (index >= 0) {
            const updatedHistory = [...history];
            const previousState = updatedHistory[index];
            const { inversePatches } = previousState;
            const prevState = produce(state, (draft) => {
              applyPatches(draft, inversePatches);
            });
            return {
              ...prevState,
              history: updatedHistory,
              index: index - 1,
            };
          }
          return state;
        });
      },

      redo: () => {
        set((state) => {
          const { history, index } = state;
          if (index < history.length - 1) {
            const updatedHistory = [...history];
            const previousState = updatedHistory[index + 1];
            const { patches } = previousState;
            if (previousState) {
              const nextState = produce(state, (draft) => {
                applyPatches(draft, patches);
              });
              return {
                ...nextState,
                history: updatedHistory,
                index: index + 1,
              };
            }
          }
          return state;
        });
      },
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
                  column={'any'}
                />
              ),
              headerClass: 'column-header', // every column header has this class
              cellRendererFramework: AnyColCell, // It indicates that there is a customised component called "CustomCell" that functions as a cell. This component allows us to customise the cell's appearance.
              cellRendererParams: (params: any) => ({
                id: 'any-col',
                cellValue: params.node.rowIndex + 1,
                button: params.data.button,
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
              headerComponent: () => (
                <CustomHeaderCell
                  label=""
                  dataType=""
                  id={whenID}
                  column="when"
                />
              ),
              cellRendererFramework: CustomCell,
              cellRendererParams: (params: any) => ({
                cellValue: params.value,
                columnId: params.column.colId,
                colDataType: params?.column?.colDef?.dataType,
                rowIndex: params.rowIndex,
                button: params.data.button,
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
              headerComponent: () => (
                <CustomHeaderCell
                  label=""
                  dataType=""
                  id={thenID}
                  column="then"
                />
              ),
              cellRendererFramework: CustomCell,
              cellRendererParams: (params: any) => ({
                cellValue: params.value,
                columnId: params.column.colId,
                colDataType: params?.column?.colDef?.dataType,
                rowIndex: params.rowIndex,
                button: params.data.button,
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
                  column="annotations"
                />
              ),
              cellRendererFramework: CustomCell,
              cellRendererParams: (params: any) => ({
                cellValue: params.value,
                columnId: params.column.colId,
                colDataType: params?.column?.colDef?.dataType,
                rowIndex: params.rowIndex,
                button: params.data.button,
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

      // pinnedColumn: null,
      mode: 'light',
      setGridRef: (ref) =>
        set((store) => ({
          gridRef: ref,
        })),
      clearColumn: (columnId: any) =>
        set((store) => {
          const newrowData = store.rowDataType.filter(
            (value) => value.key !== columnId
          );
          return {
            rowDataType: newrowData,
            // past: [...store.past, store],
            // future: [],
          };
        }),
      addRowsByProps: (columns, rows) =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              draft.colDefs = [];
            }
          );
          const newColDefs: any = deepClone(store.colDefs);
          newColDefs[1].children = [];
          columns.map((header) => {
            const id = uuid();
            const updated = {
              id: id,
              headerName: header,
              field: id,
              dataType: 'None',
              sortable: true,
              isPinned: false,
              headerComponent: () => (
                <CustomHeaderCell
                  label={header}
                  dataType="None"
                  id={id}
                  column="when"
                />
              ),
              cellRendererFramework: CustomCell,
              cellRendererParams: (params: any) => ({
                cellValue: params.value,
              }),
              headerClass: 'column-header',
            };

            newColDefs[1].children.push(updated);
            return null;
          });
          const newWhenRowData = [...store.whenRowData];

          for (let i = 0; i < rows.length; i++) {
            const newRowData = Object.fromEntries(
              newColDefs.map((header: any, index: number) => {
                if (header.id === 'hit') {
                  return ['any', store.whenRowData.length];
                }
                return [header.field, ''];
              })
            );

            // Inserting the new row at the second-to-last position
            newWhenRowData.splice(newWhenRowData.length - 1, 0, newRowData);
          }

          return {
            whenRowData: newWhenRowData,
            colDefs: newColDefs,
          };
        }),
      addWhenColumnDefs: () =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              const newIndex = uuid();
              const newColDefs: any[] = deepClone(draft.colDefs); // Creating a deep copy of store.colDefs
              const updated = {
                id: newIndex,
                headerName: '',
                field: newIndex,
                dataType: '',
                isPinned: false,
                headerComponent: () => (
                  <CustomHeaderCell
                    label=""
                    dataType=""
                    id={newIndex}
                    column="when"
                  />
                ),
                cellRendererFramework: CustomCell,
                cellRendererParams: (params: any) => ({
                  cellValue: params.value,
                  columnId: params.column.colId,
                  colDataType: params?.column?.colDef?.dataType,
                  rowIndex: params.rowIndex,
                  button: params.data.button,
                }),
                headerClass: 'column-header',
              };
              newColDefs[1].children.push(updated);
              draft.colDefs = newColDefs;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
            // currentState: newState,
          }; // Return the new state instead of creating a shallow copy
        }),
      // addWhenColumnDefs: () =>
      //   set((store) => {
      //     const newIndex = uuid();
      //     const newColDefs: any[] = deepClone(store.colDefs); // Creating a deep copy of store.colDefs

      //     const updated = {
      //       id: newIndex,
      //       headerName: '',
      //       field: newIndex,
      //       dataType: '',

      //       isPinned: false,
      //       headerComponent: () => (
      //         <CustomHeaderCell
      //           label=""
      //           dataType=""
      //           id={newIndex}
      //           column="when"
      //         />
      //       ),
      //       cellRendererFramework: CustomCell,
      //       cellRendererParams: (params: any) => ({
      //         cellValue: params.value,
      //         columnId: params.column.colId,
      //         colDataType: params?.column?.colDef?.dataType,
      //         rowIndex: params.rowIndex,
      //         button: params.data.button,
      //       }),
      //       headerClass: 'column-header',
      //     };
      //     newColDefs[1].children.push(updated);
      //     const [newState, patches, inversePatches] = produceWithPatches(
      //       store,
      //       (draft) => {
      //         console.log('Patches:');
      //         console.log(patches);
      //         console.log('Inverse Patches:');
      //         console.log(inversePatches);
      //       }
      //     );
      //     return {
      //       // ...store,
      //       past: [...store.past, deepClone(store)], // Saving the previous state to past
      //       future: [],
      //       colDefs: newColDefs,
      //     };
      //   }),
      // Function used to add columns in then block
      // In this function, the first thing we do is add a new column with an unique id common for id and field, and rest of the properties as empty.
      // After that, the handleEditCol function will be activated when the user clicks on that column once more to edit the column header information.
      addThenColumnDefs: () =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              const newIndex = uuid();
              const newColDefs: any = deepClone(store.colDefs);
              const updated = {
                id: newIndex,
                headerName: '',
                field: newIndex,
                dataType: '',

                isPinned: false,
                headerComponent: () => (
                  <CustomHeaderCell
                    label=""
                    dataType=""
                    id={newIndex}
                    column="then"
                  />
                ),
                cellRendererFramework: CustomCell,
                cellRendererParams: (params: any) => ({
                  cellValue: params.value,
                  columnId: params.column.colId,
                  colDataType: params?.column?.colDef?.dataType,
                  rowIndex: params.rowIndex,
                  button: params.data.button,
                }),
                headerClass: 'column-header',
              };

              newColDefs[2].children.push(updated);
              draft.colDefs = newColDefs;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
          };
        }),

      // Function used when we want to edit the details of column header
      handleEditCol: (colId, newHeaderName, newTypeName) =>
        set((store) => {
          if (colId) {
            const [newState, patches, inversePatches] = produceWithPatches(
              store,
              (draft) => {
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
                        column="when"
                      />
                    ),
                    cellRendererParams: (params: any) => ({
                      ...existingCellRendererParams(params),
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
                        column="then"
                      />
                    ),
                    cellRendererParams: (params: any) => ({
                      ...existingCellRendererParams(params),
                    }),
                  };
                  thenCol[thenColIndex] = updatedThenCol;
                }
                draft.colDefs = updatedColumnDefs;
                return draft;
              }
            );
            const newHistory = store.history.slice(0, store.index + 1);
            newHistory.push({ patches, inversePatches });
            return {
              ...newState,
              history: newHistory,
              index: store.index + 1,
            };
          } else {
            return {
              ...store,
            };
          }
        }),
      addCsvImportColumns: (columnHeaders, columnRows) =>
        set((store) => {
          const newColDefs: any = deepClone(store.colDefs);
          columnHeaders.map((data) => {
            const updated = {
              id: data.id,
              headerName: data.headerName,
              field: data.id,
              dataType: data.dataType,
              sortable: true,
              isPinned: data.isPinned,
              headerComponent: () => (
                <CustomHeaderCell
                  label={data.headerName}
                  dataType={data.dataType}
                  id={data.id}
                  column="when"
                />
              ),
              cellRendererFramework: CustomCell,
              cellRendererParams: (params: any) => ({
                cellValue: params.value,
              }),
              headerClass: 'column-header',
            };

            newColDefs[1].children.push(updated);
            return null;
          });
          // const newWhenRowData = [...store.whenRowData];

          // for (let i = 0; i < columnRows.length; i++) {
          //   const newRowData = Object.fromEntries(
          //     newColDefs.map((header: any, index: number) => {
          //       if (header.id === 'hit') {
          //         return ['any', store.whenRowData.length];
          //       }
          //       return [header.field, ''];
          //     })
          //   );

          //   // Inserting the new row at the second-to-last position
          //   newWhenRowData.splice(newWhenRowData.length - 1, 0, newRowData);
          // }

          return {
            // whenRowData: newWhenRowData,
            colDefs: newColDefs,
          };
        }),

      handleOptions: (id, typeOfOperation) =>
        set((store) => {
          if (typeOfOperation.includes('remove')) {
            const [newState, patches, inversePatches] = produceWithPatches(
              store,
              (draft) => {
                const updatedCols: any = deepClone(store.colDefs);
                let whenCol = updatedCols[1].children;
                let thenCol = updatedCols[2].children;
                const whenColIndex = whenCol.findIndex(
                  (col: any) => col.id === id
                );
                const thenColIndex = thenCol.findIndex(
                  (col: any) => col.id === id
                );

                if (whenColIndex !== -1) {
                  if (whenColIndex !== 0) {
                    whenCol = whenCol.filter((col: any) => col.id !== id);
                  } else {
                    if (whenCol.length > 1) {
                      whenCol = whenCol.filter((col: any) => col.id !== id);
                    }
                  }
                }

                if (thenColIndex !== -1) {
                  if (thenColIndex !== 0) {
                    thenCol = thenCol.filter((col: any) => col.id !== id);
                  } else {
                    if (thenCol.length > 1) {
                      thenCol = thenCol.filter((col: any) => col.id !== id);
                    }
                  }
                }

                updatedCols[1].children = whenCol;
                updatedCols[2].children = thenCol;
                draft.colDefs = updatedCols;
                return draft;
              }
            );
            const newHistory = store.history.slice(0, store.index + 1);
            newHistory.push({ patches, inversePatches });
            return {
              ...newState,
              history: newHistory,
              index: store.index + 1,
            };
          } else if (typeOfOperation.includes('a-z')) {
            const columnState =
              store.gridRef.current?.columnApi?.getColumnState();

            const sortedColumns = columnState?.map((column: any) => {
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
            const [newState, patches, inversePatches] = produceWithPatches(
              store,
              (draft) => {
                // const updatedColDefs: any = [...prevData];
                const updatedColDefs = deepClone(store.colDefs);
                const whenCol = updatedColDefs[1].children;
                const thenCol = updatedColDefs[2].children;
                const whenColIndex = whenCol.findIndex(
                  (col: any) => col.id === id
                );
                const thenColIndex = thenCol.findIndex(
                  (col: any) => col.id === id
                );

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
                draft.colDefs = updatedColDefs;
                return draft;
              }
            );
            const newHistory = store.history.slice(0, store.index + 1);
            newHistory.push({ patches, inversePatches });
            return {
              ...newState,
              history: newHistory,
              index: store.index + 1,
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
            // past: [...store.past, deepClone(store)], // Save current state to past
            // future: [],
          };
        }),
      setMode: (mode) =>
        set((store) => ({
          mode: mode,
        })),
      duplicateRule: (id) =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              const whenRowData = deepClone(store.whenRowData);

              const duplicatedRow = {
                ...whenRowData[id - 1],
                any: store.whenRowData.length,
              };
              whenRowData.splice(whenRowData.length - 1, 0, duplicatedRow);

              const datatypesNew = store.rowDataType
                .filter((value) => value.rowIndex === id - 1)
                .map((item) => {
                  return {
                    key: item.key,
                    rowIndex: store.whenRowData.length - 1,
                    value: item.value,
                  };
                });
              draft.whenRowData = whenRowData;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
          };
        }),

      clearRule: (id) =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              const allrowdata = store.rowDataType.filter(
                (value) => value.rowIndex !== id - 1
              );
              draft.whenRowData = store.whenRowData.map((data) => {
                if (data.any === id) {
                  return {
                    any: data.any,
                    [data]: '',
                  };
                }
                return data;
              });
              draft.rowDataType = allrowdata;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
          };
        }),

      deleteRule: (id) =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              const allrowdata = store.rowDataType.filter(
                (value) => value.rowIndex !== id - 1
              );
              draft.whenRowData = store.whenRowData.filter(
                (data) => data.any !== id
              );
              draft.rowDataType = allrowdata;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
          };
        }),

      editRowDataType: (rowIndex, colId, value) =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
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
              draft.rowDataType = updateRowData;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
          };
        }),

      editRowData: (rowIndex, colId, value) =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              const updatedRowData = [...store.whenRowData];
              const rowToUpdate = updatedRowData[rowIndex];
              rowToUpdate[colId] = value;
              draft.whenRowData = updatedRowData;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
          };
        }),

      addRow: (whenColDeta) =>
        set((store) => {
          const [newState, patches, inversePatches] = produceWithPatches(
            store,
            (draft) => {
              const newWhenRowData = [...store.whenRowData];
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
              draft.whenRowData = newWhenRowData;
              return draft;
            }
          );
          const newHistory = store.history.slice(0, store.index + 1);
          newHistory.push({ patches, inversePatches });
          return {
            ...newState,
            history: newHistory,
            index: store.index + 1,
          };
        }),
    }))
  )
);
