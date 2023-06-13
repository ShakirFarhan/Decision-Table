import { Dispatch, SetStateAction } from 'react';

interface CellRendererParams {
  onEdit: () => void;
  cellValue: any;
}

type CellRendererParamsInterface = (params: any) => CellRendererParams;

interface children {
  id: string;
  headerName: string;
  headerClass: string;
  field: string;
  type: string;
  disableColumnMenu?: boolean;
  headerComponent: (() => JSX.Element) | any;
  headerProps?: any;
  cellRendererFramework?: any;
  cellRendererParams?: CellRendererParamsInterface;
  pinned?: 'left' | 'right';
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  lockPosition?: string;
}
export interface columnInterface {
  id: string;
  headerName: string;
  headerClass: string;
  children: [children];
  cellRendererFramework?: any;
  cellRendererParams?: CellRendererParamsInterface;
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
  dataType: string;
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

export type handleEditCol = (
  colId: string,
  newHeaderName: string,
  newTypeName: string
) => void;
