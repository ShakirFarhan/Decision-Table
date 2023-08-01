import React, { ReactNode } from 'react';
interface CellRendererParams {
  cellValue: string;
  id?: string;
}
type CellRendererParamsInterface = (params: any) => CellRendererParams;
export interface zustandStoreInterface {
  rowData: any[];
  rowDataType: Rule[];
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
  editRowData: (rowIndex: number, colId: string, value: Condition) => void;
  editRowDataType: (rowIndex: number, colId: string, value: Condition) => void;

  addRow: (
    whenColData: columnInterface[],
    thenColData: columnInterface[]
  ) => void;
  duplicateRule: (id: number) => void;
  deleteRule: (id: number) => void;
  clearRule: (id: number) => void;
  clearColumn: (id: string) => void;
  setMode: (mode: 'light' | 'dark') => void;
  addRowsByProps: (columns: Column[], rows: Rule[]) => void;
  setGridRef: (ref: any) => void;
  addCsvImportColumns: (columnHeaders: Column[], columnRows: Rule[]) => void;
  //  handle what operation to perform on the column like delete,duplicate...
  deleteColumn: (id: string) => void;
  duplicateColumn: (id: string) => void;
  sortAToZ: (id: string) => void;
  sortZToA: (id: string) => void;
  setColDefs: (colDefs: columnInterface[]) => void;
  // duplicateColumn:(id:string)=>void
}


// Decision Table data types for column and rules
export interface DecisionTableDataType<Rule, Column> {
    rows: Rule[];
    columns: Column[];
}

// this is for Table component props
export interface DataTableProps {
  initialValues?: DecisionTableDataType<Rule, Column>,
  onChange?: Function;
  mode?: 'light' | 'dark';

}

export interface Column {
  name: string;
  key: string;
  isPinned?: boolean;
  // type means the datatype of the column it can be number,string,date ...
  type?: string;
  description?: string;
  defaultValue?: string;
  expression?: string;
  // parent means to which column group it belongs to eg: when or then
  parent?: string;
}
// Row or Rule
export interface Rule {
  key: string;
  rowIndex: number;
  value: Condition;
  columnName?: string;
}
export interface Condition {
  // cell datatype eg: between,isEven...
  type: string;
  value?: ConditionValue[];
}

// this interface is declared for the condition
export interface ConditionValue{
  type: string | number | boolean,
  defaultValue?: string | number | boolean,
  description?: string
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

// -------------------------

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
//

// Cell Related Interfaces
export interface customCellProps {
  parentColumn?: string;
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

// --------------------------
export interface rowType {
  id?: number | string;
  name?: string | number;
  age?: number | string;
  phone?: number | string;
}
export interface IProps {
  cellValue: string;
}
