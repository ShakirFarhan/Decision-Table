import { create } from 'zustand';
import { columnInterface, rowType } from './constants/interfaces';
export interface zustandStoreInterface {
  whenRowData: rowType[];
  whenColData: columnInterface[];
  thenRowData: rowType[];
  thenColData: columnInterface[];
  addRow: (whenColData: any, thenColData: any) => void;
  setWhenRowData: (colId: any) => void;
}
export const useStore = create<zustandStoreInterface>((set) => ({
  whenColData: [],
  whenRowData: [],
  thenColData: [],
  thenRowData: [],

  setWhenRowData: (colId) =>
    set((store) => ({
      // whenRowData:[...store.whenRowData]
    })),
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
}));
