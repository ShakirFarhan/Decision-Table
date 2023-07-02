import { Dispatch, SetStateAction } from 'react';

interface CellRendererParams {
  onEdit: () => void;
  cellValue: any;
}

type CellRendererParamsInterface = (params: any) => CellRendererParams;

export interface children {
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
  previousIndex?: any;
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
  lockPosition?: boolean;
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
}
export interface TypesOptionProps {
  id: string;
  type: string;
  column: string;
}

export interface inputFieldProps {
  editingValue: any;
  handleChange: any;
}

export type handleEditColInterface = (
  colId: string,
  newHeaderName: string,
  newTypeName: string
) => void;

export interface customCellProps {
  onEdit: (params: any) => void;
  cellValue?: any;
  id?: any;
  column?: any;
  node?: any;
  value?: any;
  data?: any;
  api?: any;
  rowIndex?: any;
}

export interface anyColCellProps {
  cellValue?: string;
  id?: any;
  data?: any;
}

export interface buttonHeaderProps {
  name: string;
}
export interface colOptionsProps {
  id: string;
}
