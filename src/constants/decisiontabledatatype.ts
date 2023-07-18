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