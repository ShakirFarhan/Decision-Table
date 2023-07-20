import React, { ReactNode } from 'react';
interface CellRendererParams {
  cellValue: string;
  id?: string;
}
type CellRendererParamsInterface = (params: any) => CellRendererParams;
export interface zustandStoreInterface {
  rowData: any[];
  rowDataType: Row[];
  // it tracks the patches and inversePatche of the changes made for undo redo
  history: any;
  // This helps us is undo redo to find out what state to change
  index: number;
  // contains all columns
  colDefs: columnInterface[];
  // referes to the ag grid component
  gridRef: any;
  mode: 'light' | 'dark';
  undo: () => void;
  redo: () => void;
  //  handle what operation to perform on the column like delete,duplicate...
  handleOptions: (id: string, typeOfOperation: string) => void;
  // Use to edit column data of individual column
  handleEditCol: (
    id: string,
    newHeaderName: string,
    newTypeName: string
  ) => void;
  // Performs pinning functionality to the column
  handlePin: (id: string) => void;
  // add columns in then block
  addThenColumnDefs: () => void;
  // add columns in when block
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

export interface decisionTableColumns {
  // should be unique for very column
  id: string;
  // column name
  headerName?: string;
  // class to style column
  headerClass?: string;

  field: string;
  // column data type like string,number,date...
  dataType?: string;
  // should the column be movable or not
  suppressMovable?: boolean;
  disableColumnMenu?: boolean;
  // represents how the column header should look like, we can create a custom component to style the column header
  headerComponent: () => JSX.Element;
  // Used to perform sorting functions to column
  sortable?: boolean;
  // represents how the cell should look like, we can create a custom component to style the cell
  cellRendererFramework?: React.FC<customCellProps> | React.FC<anyColCellProps>;
  // provides the props to cellRendererFramework
  cellRendererParams?: CellRendererParamsInterface;
  // tracks the previous index, this will be used to perform pinning columns
  previousIndex?: any;
  pinned?: 'left' | 'right';
  isPinned?: boolean;
  editable?: boolean;
  width?: number;
  maxWidth?: number;
  minWidth?: number;
  lockPosition?: string;
}
// this is the main interface for column
export interface columnInterface {
  id?: string;
  // headername can be when,then,annotations
  headerName?: string;
  headerClass?: string;
  suppressMovable?: boolean;
  // here we have the list of columns
  children: decisionTableColumns[];
  lockPosition?: boolean;
  minWidth?: number;
  // represents how the column header(when,then...) should look like, we can create a custom component to style the column header
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
export interface cellValue {
  type: string;
  value: {
    firstval: string;
    secondval: string;
  };
}

export interface Row {
  key: string;
  rowIndex: number;
  value: cellValue;
  // Add more properties as needed
}

export interface Column {
  id?: string;
  headerName?: string;
  dataType?: string;
  isPinned?: boolean;
  // Add more properties as needed
}

export interface rowsAndCols<Columns, Rows> {
  initialValues: {
    rows: Rows[];
    columns: Columns[];
  };
  callbackfunc?: Function;
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

interface pactches_inversePatches {
  op: string;
  path: string[];
  value: any;
}
export interface history {
  patches: pactches_inversePatches;
  inversePatches: pactches_inversePatches;
}
