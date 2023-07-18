import React, { ReactNode } from 'react';
interface CellRendererParams {
  cellValue: string;
  id?: string;
}

type CellRendererParamsInterface = (params: any) => CellRendererParams;

export interface children {
  id: string;
  headerName?: string;
  headerClass?: string;
  field: string;
  dataType?: string;
  suppressMovable?: boolean;
  disableColumnMenu?: boolean;
  headerComponent: () => JSX.Element;
  sortable?: boolean;
  cellRendererFramework?: React.FC<customCellProps> | React.FC<anyColCellProps>;
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
  suppressMovable?: boolean;
  children: children[];
  lockPosition?: boolean;
  minWidth?: number;
  headerGroupComponent?: () => JSX.Element;
}
export interface rowType {
  id?: number | string;
  name?: string | number;
  age?: number | string;
  phone?: number | string;
}
export interface IProps {
  cellValue: string;
}
export interface columnHeaderProps {
  label: string;
  children?: ReactNode;
  dataType: string;
  id: string;
  column: string;
}
export interface TypesOptionProps {
  id: string;
  type: string;
  column: string;
}

export interface customCellProps {
  collCellValue: string;
  columnId: string;
  colDataType: string;
  rowIndex: number;
  button?: string;
  api: any;
  id?: string;
}

export interface anyColCellProps {
  cellValue: string;
  id: string;
  button: string;
}

export interface buttonHeaderProps {
  name: string;
}
export interface colOptionsProps {
  id: string;
}
