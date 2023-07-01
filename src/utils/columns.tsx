import uuid from 'react-uuid';
import CustomHeaderCell from '../components/Header/CustomHeaderCell';
import CustomCell from '../components/Cell/CustomCell';
import { handleEditColInterface } from '../constants/interfaces';
import { useStore } from '../store';

export const handleAddThenCol = (): void => {
  setColumnDefs((data: any) => {
    const newIndex = uuid();
    const newColDefs = [...data];
    const updated = {
      id: newIndex,
      headerName: '',
      field: newIndex,
      dataType: '',
      sortable: true,
      isPinned: false,
      // rowDrag: true,
      headerComponent: () => (
        <CustomHeaderCell
          label=""
          dataType=""
          id={newIndex}
          userColumn={true}
          onColumnChange={handleEditCol}
          handlePin={handlePin}
          handleOptions={handleOptions}
        />
      ),
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => ({
        onEdit: () => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
      headerClass: 'column-header',
    };
    newColDefs[2].children.push(updated);

    return newColDefs;
  });
};

// Function used to add columns in then block
// In this function, the first thing we do is add a new column with an unique id common for id and field, and rest of the properties as empty.
// After that, the handleEditCol function will be activated when the user clicks on that column once more to edit the column header information.
export const handleAddWhenCol = (): void => {
  setColumnDefs((data: any) => {
    const newIndex = uuid();
    const newColDefs = [...data];
    const updated = {
      id: newIndex,
      headerName: '',
      field: newIndex,
      dataType: '',
      sortable: true,
      isPinned: false,

      // rowDrag: true,
      headerComponent: () => (
        <CustomHeaderCell
          label=""
          dataType=""
          id={newIndex}
          userColumn={true}
          onColumnChange={handleEditCol}
          handlePin={handlePin}
          handleOptions={handleOptions}
        />
      ),
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any, columnDefs: any) => ({
        onEdit: () => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
        id: columnDefs.length === 1 ? 'first-col' : '',
        handleAddRow: columnDefs.length === 1 ? handleAddRow : '',
      }),
      headerClass: 'column-header',
    };
    newColDefs[1].children.push(updated);
    return newColDefs;
  });
};

export const handleAddRow = (addRow: any, colDefs: any) => {
  addRow(colDefs, colDefs);
};
// Function used when we want to edit the details of column header
export const handleEditCol: handleEditColInterface = (
  colId, // id of the selected column
  newHeaderName, // new header name provided by the user
  newTypeName // new type ex: string,number...
) => {
  if (colId) {
    setColumnDefs((data: any) => {
      const updatedColumnDefs = [...data];
      const whenCol = updatedColumnDefs[1].children;
      const thenCol = updatedColumnDefs[2].children;

      const whenColIndex = whenCol.findIndex((col: any) => col.id === colId);
      const thenColIndex = thenCol.findIndex((col: any) => col.id === colId);

      if (whenColIndex !== -1) {
        const existingCellRendererParams =
          whenCol[whenColIndex].cellRendererParams;

        whenCol[whenColIndex] = {
          ...whenCol[whenColIndex],
          headerName: newHeaderName,
          dataType: newTypeName,
          headerComponent: () => (
            <CustomHeaderCell
              label={newHeaderName}
              dataType={newTypeName}
              id={colId}
              userColumn={true}
              onColumnChange={handleEditCol}
              handlePin={handlePin}
              handleOptions={handleOptions}
            />
          ),
          cellRendererParams: (params: any) => ({
            ...existingCellRendererParams(params),
            onEdit: () => {
              params.api.startEditingCell({
                rowIndex: params.node.rowIndex,
                colKey: params.column.colId,
              });
            },
          }),
        };
      }

      if (thenColIndex !== -1) {
        const existingCellRendererParams =
          thenCol[thenColIndex].cellRendererParams;

        thenCol[thenColIndex] = {
          ...thenCol[thenColIndex],
          headerName: newHeaderName,
          dataType: newTypeName,
          headerComponent: () => (
            <CustomHeaderCell
              label={newHeaderName}
              dataType={newTypeName}
              id={colId}
              userColumn={true}
              onColumnChange={handleEditCol}
              handlePin={handlePin}
              handleOptions={handleOptions}
            />
          ),
          cellRendererParams: (params: any) => ({
            ...existingCellRendererParams(params),
            onEdit: () => {
              params.api.startEditingCell({
                rowIndex: params.node.rowIndex,
                colKey: params.column.colId,
              });
            },
          }),
        };
      }
      return updatedColumnDefs;
    });
  }
};

export const handlePin = (id: string): void => {
  setColumnDefs((data: any) => {
    const updatedColumnDefs = [...data];
    const whenCol = updatedColumnDefs[1].children;
    const thenCol = updatedColumnDefs[2].children;

    const whenColIndex = whenCol.findIndex((col: any) => col.id === id);
    const thenColIndex = thenCol.findIndex((col: any) => col.id === id);
    if (whenColIndex !== -1) {
      const selectedColumn = whenCol[whenColIndex];
      if (selectedColumn.isPinned) {
        // Column is currently pinned, so unpin it and move to previous position
        selectedColumn.isPinned = false;
        whenCol.splice(whenColIndex, 1);
        whenCol.splice(selectedColumn.previousIndex, 0, selectedColumn);
      } else {
        // Column is currently not pinned, so pin it and move to the first index
        selectedColumn.isPinned = true;
        selectedColumn.previousIndex = whenColIndex; // Store the previous index
        whenCol.splice(whenColIndex, 1);
        whenCol.splice(0, 0, selectedColumn);
      }
    }
    if (thenCol !== -1) {
      const selectedColumn = thenCol[thenColIndex];
      if (selectedColumn) {
        if (selectedColumn.isPinned) {
          // Column is currently pinned, so unpin it and move to previous position
          selectedColumn.isPinned = false;
          thenCol.splice(thenColIndex, 1);
          thenCol.splice(selectedColumn.previousIndex, 0, selectedColumn);
        } else {
          // Column is currently not pinned, so pin it and move to the first index
          selectedColumn.isPinned = true;
          selectedColumn.previousIndex = thenColIndex; // Store the previous index
          thenCol.splice(thenColIndex, 1);
          thenCol.splice(0, 0, selectedColumn);
        }
      }
    }

    return updatedColumnDefs;
  });
};

export const handleOptions = (id: string, selectedOption: string): void => {
  let gridRef: any = '';
  if (selectedOption.includes('remove')) {
    setColumnDefs((prevData) => {
      const updatedCols = [...prevData];
      let whenCol = updatedCols[1].children;
      let thenCol = updatedCols[2].children;
      const whenColIndex = whenCol.findIndex((col: any) => col.id === id);
      const thenColIndex = thenCol.findIndex((col: any) => col.id === id);

      if (whenColIndex !== -1) {
        if (whenColIndex !== 0) {
          whenCol = whenCol.filter((col: any) => col.id !== id);
        }
      }

      if (thenColIndex !== -1) {
        if (thenColIndex !== 0) {
          thenCol = thenCol.filter((col: any) => col.id !== id);
        }
      }

      updatedCols[1].children = whenCol;
      updatedCols[2].children = thenCol;

      return updatedCols;
    });
  } else if (selectedOption.includes('a-z')) {
    const columnState = gridRef.current?.columnApi?.getColumnState();
    const sortedColumns = columnState.map((column: any) => {
      if (column.colId === id) {
        return { ...column, sort: 'asc' }; // Apply ascending sorting to the specified column
      } else {
        return { ...column, sort: null }; // Remove sorting from other columns
      }
    });

    gridRef.current?.columnApi?.applyColumnState({ state: sortedColumns });
  } else if (selectedOption.includes('z-a')) {
    gridRef.current?.columnApi?.applyColumnState({
      state: [{ colId: id, sort: 'desc' }],
      defaultState: { sort: null },
    });
  } else if (selectedOption.includes('duplicate')) {
    setColumnDefs((prevData) => {
      // const updatedColDefs: any = [...prevData];
      const updatedColDefs = [...prevData];
      const whenCol = updatedColDefs[1].children;
      const thenCol = updatedColDefs[2].children;
      const whenColIndex = whenCol.findIndex((col: any) => col.id === id);
      const thenColIndex = thenCol.findIndex((col: any) => col.id === id);

      if (whenColIndex !== -1) {
        const newid = uuid();
        const existingHeaderComponent = whenCol[whenColIndex].headerComponent;

        const selectedColumn = {
          ...whenCol[whenColIndex],
          id: newid,
          field: newid,
          headerComponent: (props: any) => (
            <CustomHeaderCell
              {...existingHeaderComponent().props} // Pass the previous props
              id={newid}
            />
          ),
        };
        updatedColDefs[1].children.push(selectedColumn);
      }
      if (thenColIndex !== -1) {
        const newid = uuid();
        const existingHeaderComponent = thenCol[thenColIndex].headerComponent;

        const selectedColumn = {
          ...thenCol[thenColIndex],
          id: newid,
          field: newid,
          headerComponent: (props: any) => (
            <CustomHeaderCell
              {...existingHeaderComponent().props} // Pass the previous props
              id={newid}
            />
          ),
        };
        updatedColDefs[2].children.push(selectedColumn);
      }
      return updatedColDefs;
    });
  }
};

function setColumnDefs(arg0: (data: any) => any[]) {
  throw new Error('Function not implemented.');
}

function addRow(columnDefs: any, columnDefs1: any) {
  throw new Error('Function not implemented.');
}
