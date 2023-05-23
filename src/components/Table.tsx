import { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CustomHeaderCell from './Header/CustomHeaderCell';
import './css/table.css';
import CustomCell from './Cell/CustomCell';
import { columnInterface } from '../constants/interfaces';
import uuid from 'react-uuid';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useStore } from '../store';
function Table() {
  const { addRow, whenRowData, thenRowData } = useStore((store) => store);
  const gridRef: React.MutableRefObject<any> = useRef(null);
  console.log('Hello');
  const [thenColumnDefs, setThenColumnDefs] = useState<any[]>([
    {
      id: '1',
      headerName: 'Id',
      field: 'id',
      type: 'number',
      sortable: true,
      headerComponent: () => (
        <CustomHeaderCell
          label="Id"
          type="number"
          id="id"
          userColumn={true}
          onColumnChange={handleEditCol}
          handlePin={handlePin}
          handleOptions={handleOptions}
        />
      ),
      headerClass: 'column-header',
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
    },
  ]);

  const [whenColumnDefs, setWhenColumnDefs] = useState<columnInterface[]>([]);

  const defaultColDef = useMemo(
    () => ({
      // resizable: true,
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
    }),
    []
  );
  const handleAddThenCol = (): void => {
    setThenColumnDefs([
      ...thenColumnDefs,
      {
        id: `default`,
        headerName: 'default',
        field: 'default',
        type: 'any',
        headerComponent: () => (
          <CustomHeaderCell
            label="Default"
            type="any"
            id="default"
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
              colKey: params.column.id,
            });
          },
          cellValue: params.value,
        }),
        headerClass: 'column-header',
      },
    ]);
  };
  const handleEditCol = (
    colId: string,
    newHeaderName: string,
    newFieldName: string
  ): void => {
    if (colId) {
      setWhenColumnDefs((data: any) => {
        const updatedColumnDefs = [...data];
        const index = updatedColumnDefs.findIndex((col) => col.id === colId);
        if (index !== -1) {
          const existingCellRendererParams =
            updatedColumnDefs[index].cellRendererParams;
          updatedColumnDefs[index] = {
            ...updatedColumnDefs[index],
            headerName: newHeaderName,
            type: newFieldName,
            headerComponent: () => (
              <CustomHeaderCell
                label={newHeaderName}
                type={newFieldName}
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

  const handleAddWhenCol = (): void => {
    setWhenColumnDefs((data: any) => {
      const newIndex = uuid();
      const updated = [
        ...data,
        {
          id: newIndex,
          headerName: '',
          field: newIndex,
          type: '',
          sortable: true,
          headerComponent: () => (
            <CustomHeaderCell
              label=""
              type=""
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
        },
      ];
      return updated;
    });
  };

  const handlePin = (id: string, pinned: boolean, setPinned: any): void => {
    setWhenColumnDefs((data: any) => {
      const updatedColumnDefs = [...data];
      const index = updatedColumnDefs.findIndex((col) => col.id === id);
      const column = updatedColumnDefs[index];
      updatedColumnDefs[index] = {
        ...column,
        pinned: column.pinned ? undefined : 'left',
      };
      setPinned('Yess');
      return updatedColumnDefs;
    });
  };
  const handleOptions = useCallback(
    (id: string, selectedOption: string): void => {
      if (selectedOption.includes('remove')) {
        console.log('Got it');
        setWhenColumnDefs((prevData) => {
          const updatedData = prevData.filter((col) => {
            console.log(col.id, id);
            return col.id !== id;
          });
          return updatedData;
        });
      } else if (selectedOption.includes('a-z')) {
        gridRef.current?.columnApi?.applyColumnState({
          state: [{ colId: id, sort: 'asc' }],
          defaultState: { sort: null },
        });
      } else if (selectedOption.includes('z-a')) {
        gridRef.current?.columnApi?.applyColumnState({
          state: [{ colId: id, sort: 'desc' }],
          defaultState: { sort: null },
        });
      } else if (selectedOption.includes('duplicate')) {
        setWhenColumnDefs((prevData) => {
          const updatedColDefs: any = [...prevData];
          console.log(updatedColDefs);
          const index = updatedColDefs.findIndex((col: any) => col.id === id);
          console.log(index, id);
          const selectedColumn = updatedColDefs[index];
          updatedColDefs.push(selectedColumn);
          return updatedColDefs;
        });
      }
    },
    []
  );

  const handleCellValueChanged = (params: any) => {
    params.api.stopEditing();
  };
  return (
    <div className="flex flex-col">
      {/* <button onClick={sortByAthleteAsc}>sort</button> */}
      <div className="scroll-wrapper w-full flex overflow-x-scroll">
        <div className="flex-1 h-[270px]">
          <div className="flex items-center gap-x-[5.5px] mb-[10px]">
            <span className="text-[15.7px] tracking-wide">When</span>
            <AiFillPlusCircle
              onClick={handleAddWhenCol}
              className="fill-[grey] hover:cursor-pointer"
            />
          </div>
          <AgGridReact
            ref={gridRef}
            rowData={whenRowData}
            columnDefs={whenColumnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
            onCellValueChanged={handleCellValueChanged}
            // onCellDoubleClicked={handleDoubleTap}
            groupHeaderHeight={100}
          />
        </div>
        <div className="flex-1 h-[270px]">
          <div className="flex items-center gap-x-[5.5px] mb-[10px]">
            <span className="text-[15.7px] tracking-wide">Then</span>
            <AiFillPlusCircle
              onClick={handleAddThenCol}
              className="fill-[grey] hover:cursor-pointer"
            />
          </div>
          <AgGridReact
            rowData={thenRowData}
            columnDefs={thenColumnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
          />
        </div>
      </div>
      <button
        className="width-[60px] w-fit font-semibold"
        onClick={() => {
          addRow(whenColumnDefs, thenColumnDefs);
        }}
      >
        Add Rule
      </button>
    </div>
  );
}

export default Table;
