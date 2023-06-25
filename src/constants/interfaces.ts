import { Dispatch, SetStateAction } from 'react';

interface CellRendererParams {
  onEdit: () => void;
  cellValue: any;
}

type CellRendererParamsInterface = (params: any) => CellRendererParams;

interface children {
  id: string;
  headerName?: string;
  headerClass?: string;
  field: string;
  dataType?: string;
  suppressMovable?: any;
  disableColumnMenu?: boolean;
  headerComponent: (() => JSX.Element) | any;
  sortable?: boolean;
  headerProps?: any;
  cellRendererFramework?: any;
  cellRendererParams?: CellRendererParamsInterface;
  pinned?: 'left' | 'right';
  isPinned?: boolean;
  editable?: boolean;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  lockPosition?: string;
}
export interface columnInterface {
  id?: string;
  headerName?: string;
  headerClass?: string;
  suppressMovable?: any;
  children: children[];
  cellRendererFramework?: any;
  minWidth?: number;
  cellRendererParams?: CellRendererParamsInterface;
  headerGroupComponent?: () => any;
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


export interface inputFieldProps {
  editingValue: any,
  handleChange: any
}

export type handleEditCol = (
  colId: string,
  newHeaderName: string,
  newTypeName: string
) => void;
