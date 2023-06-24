import { create } from 'zustand';
import { columnInterface, rowType } from './constants/interfaces';
import { devtools } from 'zustand/middleware';

export interface zustandStoreInterface {
  whenRowData: any[];
  rowDataType: any[];
  whenColDefs: columnInterface[];
  thenRowData: any[];
  thenColData: columnInterface[];
  pinnedColumn: any;
  mode: 'light' | 'dark';
  setPinnedColumn: (colId: string) => void;
  // for storing row data
  editRowData: (core: any,rowIndex: any, colId: any, value: any) => void;
  // for storing row data type. 
  editRowDataType: (core: any,rowIndex: any, colId: any, value: any) => void;
  addRow: (whenColData: any, thenColData: any) => void;
  setWhenColDefs: (whenColData: any) => void;
  editWhenCol: (updatedDef: any) => void;
  duplicateRule: (id: number) => void;
  deleteRule: (id: number) => void;
  clearRule: (id: number) => void;
  setMode: (mode: 'light' | 'dark') => void;
}

export const useStore = create<
  zustandStoreInterface,
  [['zustand/devtools', never]]
>(
  devtools((set) => ({
    whenColDefs: [],
    rowDataType: [],
    whenRowData: [
      {
        button: 'Add Rule',
      },
    ],
    thenColData: [],
    thenRowData: [],
    pinnedColumn: null,
    mode: 'light',
    setMode: (mode) =>
      set((store) => ({
        mode: mode,
      })),
    duplicateRule: (id) =>
      set((store) => {
        const whenRowData = [...store.whenRowData];
        const duplicatedRow = {
          ...whenRowData[id - 1],
          any: store.whenRowData.length,
        };
        whenRowData.splice(whenRowData.length - 1, 0, duplicatedRow);

        return {
          ...store,
          whenRowData,
        };
      }),

    clearRule: (id) =>
      set((store) => {
        // filtering using rowindex to clear rule while clearing value
        const allrowdata = store.rowDataType.filter(value => value.rowIndex !== id - 1)
        
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
        }
      }),

    deleteRule: (id) =>
      set((store) => {
        // filtering using rowIndex to delete the rule while deleting the complete row
        const allrowdata = store.rowDataType.filter(value => value.rowIndex !== id - 1)
        return { whenRowData: store.whenRowData.filter((data) => data.any !== id), rowDataType: allrowdata }
      }),
    setWhenColDefs: (whenColData) =>
      set(
        (store) => ({
          whenColDefs: [...store.whenColDefs, whenColData],
        }),
        false,
        'Set When Col'
      ),

    editRowDataType: (core, rowIndex, colId, value) =>
      set((store) => {
        const newdata = [];
        // getting previous data types from store
        const storedata = store.rowDataType
        // finding existing indexes
        const existingindex = store.rowDataType?.findIndex((item: any) => item.key === colId && item.rowIndex === rowIndex)
        // if the index value is not more the -1 then the action will not perform here
        if(existingindex !== -1){
          // removing previous same data from existing store
          storedata.splice(existingindex , 1)
        }

        // pusing previous other datas to the state for further process
        storedata.map((item:any) => {
          newdata.push(item);
        })
        

        // pushing newly created row type to the state
        newdata.push({
          key: colId,
          value: value,
          rowIndex: rowIndex
        });


        // storing all to the state
        const updateRowData = [...newdata];

        return { rowDataType: updateRowData };
      }),

    editRowData: (core, rowIndex, colId, value) =>
      set((store) => {

        // this will only update the cell value not type
        const updatedRowData = [...store.whenRowData];
        const rowToUpdate = updatedRowData[rowIndex];
        rowToUpdate[colId] = value;
        return { whenRowData: updatedRowData };
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
          ...store,
          whenRowData: newWhenRowData,
          thenRowData: newThenRowData,
        };
      }),
    editWhenCol: (updatedDef) =>
      set(
        (store) => ({
          whenColDefs: updatedDef,
        }),
        false,
        'Edit Col'
      ),
    setPinnedColumn: (colId) =>
      set((store) => ({
        whenColDefs: store.whenColDefs.map((col) => {
          if (col.id === colId) {
            store.pinnedColumn = colId;
            return {
              ...col,
              pinned: 'left',
            };
          }
          return col;
        }),
      })),
  }))
);
