import React, { Dispatch, ReactNode, SetStateAction } from 'react';

export interface columnInterface {
  id: string;
  headerName: string;
  field: string;
  type: string;
  disableColumnMenu?: boolean;
  headerComponent: (() => JSX.Element) | any;
  headerClass: string;
  headerProps?: any;
  cellRendererFramework?: any;
  cellRendererParams?: any;
  pinned?: 'left' | 'right';
  width?: number;
}
export interface rowType {
  id?: number | string;
  name?: string | number;
  age?: number | string;
  phone?: number | string;
}
export interface IProps {
  onEdit: (params: any) => void;
  cellValue: string;
}
export interface columnHeaderProps {
  label: string;
  children?: any;
  type: string;
  id: string;
  userColumn: boolean;
  onColumnChange: (
    colId: string,
    newHeaderName: string,
    newTypeName: string
  ) => void;
  handlePin: (id: string) => void;
  setWhenColumnDefs?: Dispatch<SetStateAction<columnInterface[]>>;
  newCol?: boolean;
  handleOptions: (id: string, task: string) => void;
}
export interface defaultProps {
  id: string;
  type: string;
  column: string;
  onColumnChange: (
    colId: string,
    newHeaderName: string,
    newFieldName: string
    // id: string
  ) => void;
}
// export interface zustandStoreInterface {
//   whenRowData: rowType[];
//   whenColData: columnInterface[];
//   thenRowData: rowType[];
//   thenColData: columnInterface[];
//   addRow: (whenColData: any, thenColData: any) => void;
// }
