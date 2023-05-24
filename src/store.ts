import { create } from 'zustand';
import { columnInterface, rowType } from './constants/interfaces';
import { devtools } from 'zustand/middleware';

export interface zustandStoreInterface {
  whenRowData: rowType[];
  whenColDefs: columnInterface[];
  thenRowData: rowType[];
  thenColData: columnInterface[];
  pinnedColumn: any;
  setPinnedColumn: (colId: string) => void;
  addRow: (whenColData: any, thenColData: any) => void;
  setWhenColDefs: (whenColData: any) => void;
  editWhenCol: (updatedDef: any) => void;
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

    setWhenColDefs: (whenColData) =>
      set(
        (store) => ({
          whenColDefs: [...store.whenColDefs, whenColData],
        }),
        false,
        'Set When Col'
      ),
    addRow: (whenColDeta, thenColData) =>
      set((store) => ({
        whenRowData: [
          ...store.whenRowData,
          Object.fromEntries(
            whenColDeta.map((header: any) => [header.field, ''])
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
            console.log('yayy');
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
