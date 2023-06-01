import { create } from 'zustand';
import { columnInterface, rowType } from './constants/interfaces';
import { devtools } from 'zustand/middleware';

export interface zustandStoreInterface {
  whenRowData: any[];
  whenColDefs: columnInterface[];
  thenRowData: any[];
  thenColData: columnInterface[];
  pinnedColumn: any;
  setPinnedColumn: (colId: string) => void;
  editRowData: (rowIndex: any, colId: any, value: any) => void;
  addRow: (whenColData: any, thenColData: any) => void;
  setWhenColDefs: (whenColData: any) => void;
  editWhenCol: (updatedDef: any) => void;
  duplicateRule: (id: number) => void;
  deleteRule: (id: number) => void;
  clearRule: (id: number) => void;
}

export const useStore = create<
  zustandStoreInterface,
  [['zustand/devtools', never]]
>(
  devtools((set) => ({
    whenColDefs: [],
    whenRowData: [],
    thenColData: [],
    thenRowData: [],
    pinnedColumn: null,

    duplicateRule: (id) =>
      set((store) => ({
        whenRowData: [
          ...store.whenRowData,
          { ...store.whenRowData[id - 1], any: store.whenRowData.length + 1 },
        ],
      })),
    clearRule: (id) =>
      set((store) => ({
        whenRowData: store.whenRowData.map((data) => {
          if (data.any === id) {
            return {
              any: data.any,
              [data]: '',
            };
          }
          return data;
        }),
      })),

    deleteRule: (id) =>
      set((store) => ({
        whenRowData: store.whenRowData.filter((data) => data.any !== id),
      })),
    setWhenColDefs: (whenColData) =>
      set(
        (store) => ({
          whenColDefs: [...store.whenColDefs, whenColData],
        }),
        false,
        'Set When Col'
      ),

    editRowData: (rowIndex, colId, value) =>
      set((store) => {
        console.log(value);
        const updatedRowData = [...store.whenRowData];
        const rowToUpdate = updatedRowData[rowIndex];
        rowToUpdate[colId] = value;
        return { whenRowData: updatedRowData };
      }),
    addRow: (whenColDeta, thenColData) =>
      set((store) => ({
        whenRowData: [
          ...store.whenRowData,
          Object.fromEntries(
            whenColDeta.map((header: any, index: number) => {
              if (header.id === 'hit') {
                return ['any', store.whenRowData.length + 1];
              }
              return [header.field, ''];
            })
          ),
        ],
        thenRowData: [
          ...store.thenRowData,
          Object.fromEntries(
            thenColData.map((header: any) => [header.field, ''])
          ),
        ],
      })),
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
