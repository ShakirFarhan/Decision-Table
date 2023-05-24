import './css/table.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CustomHeaderCell from './Header/CustomHeaderCell';
import CustomCell from './Cell/CustomCell';
import { columnInterface } from '../constants/interfaces';
import uuid from 'react-uuid';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useStore } from '../store';
const Table = () => {
  const {
    addRow,
    whenRowData,
    thenRowData,
    // setWhenColDefs,
    whenColDefs,
    // editWhenCol,
  } = useStore((store) => store);
  const gridRef: React.MutableRefObject<any> = useRef(null);
  const [thenColumnDefs, setThenColumnDefs] = useState<columnInterface[]>([
    {
      id: '1',
      headerName: 'Id',
      field: 'id',
      type: 'number',
      headerComponent: () => (
        // Customized Column Header
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
      headerClass: 'column-header', // every column header has this class
      cellRendererFramework: CustomCell, // It indicates that there is a customised component called "CustomCell" that functions as a cell. This component allows us to customise the cell's appearance.
      cellRendererParams: (params: any) => ({
        // to control its behavior and appearance.
        onEdit: () => {
          // User defined function
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
    },
  ]);
  // store when block column data
  const [whenColumnDefs, setWhenColumnDefs] = useState<columnInterface[]>([
    {
      id: '1',
      headerName: 'Id',
      field: 'id',
      type: 'number',
      headerComponent: () => (
        // Customized Column Header
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
      headerClass: 'column-header', // every column header has this class
      cellRendererFramework: CustomCell, // It indicates that there is a customised component called "CustomCell" that functions as a cell. This component allows us to customise the cell's appearance.
      cellRendererParams: (params: any) => ({
        // to control its behavior and appearance.
        onEdit: () => {
          // User defined function
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
    },
    
  ]);
  //default options for each column, For the column, it has some predefined properties related to their behaviour.
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
    }),
    []
  );

  // Function used to add columns in then block
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

  // Function used to add columns in then block
  // In this function, the first thing we do is add a new column with an unique id common for id and field, and rest of the properties as empty.
  // After that, the handleEditCol function will be activated when the user clicks on that column once more to edit the column header information.
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
    // Zustand State code to add Column
    // const newIndex = uuid();
    // setWhenColDefs({
    //   id: newIndex,
    //   headerName: '',
    //   field: newIndex,
    //   type: '',
    //   sortable: true,
    //   headerComponent: () => (
    //     <CustomHeaderCell
    //       label=""
    //       type=""
    //       id={newIndex}
    //       userColumn={true}
    //       onColumnChange={handleEditCol}
    //       handlePin={handlePin}
    //       handleOptions={handleOptions}
    //     />
    //   ),
    //   cellRendererFramework: CustomCell,
    //   cellRendererParams: (params: any) => ({
    //     onEdit: () => {
    //       params.api.startEditingCell({
    //         rowIndex: params.node.rowIndex,
    //         colKey: params.column.colId,
    //       });
    //     },
    //     cellValue: params.value,
    //   }),
    //   headerClass: 'column-header',
    // });
  };

  useEffect(() => {
    if (whenColumnDefs.length < 2){
      console.log(whenColumnDefs.length)
      handleAddWhenCol()
    }
  }, [])


  // Function used when we want to edit the details of column header
  const handleEditCol = (
    colId: string, // id of the selected column
    newHeaderName: string, // new header name provided by the user
    newTypeName: string // new type ex: string,number...
  ) => {
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
            type: newTypeName,
            headerComponent: () => (
              <CustomHeaderCell
                label={newHeaderName}
                type={newTypeName}
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

      // Zustand state Code
      //   const updatedColumnDefs = [...whenColDefs];
      //   console.log(updatedColumnDefs);
      //   const index = updatedColumnDefs.findIndex((col) => col.id === colId);
      //   console.log(index);
      //   if (index !== -1) {
      //     console.log('Here');
      //     const existingCellRendererParams =
      //       updatedColumnDefs[index].cellRendererParams;
      //     updatedColumnDefs[index] = {
      //       ...updatedColumnDefs[index],
      //       headerName: newHeaderName,
      //       type: newFieldName,
      //       headerComponent: () => (
      //         <CustomHeaderCell
      //           label={newHeaderName}
      //           type={newFieldName}
      //           id={colId}
      //           userColumn={true}
      //           onColumnChange={handleEditCol}
      //           handlePin={handlePin}
      //           handleOptions={handleOptions}
      //         />
      //       ),
      //       cellRendererParams: (params: any) => ({
      //         ...existingCellRendererParams(params),
      //         onEdit: () => {
      //           params.api.startEditingCell({
      //             rowIndex: params.node.rowIndex,
      //             colKey: params.column.colId,
      //           });
      //         },
      //       }),
      //     };
      //     // console.log(updatedColumnDefs);
      //     editWhenCol(updatedColumnDefs);
      //   }
    }
  };
  // function used to pin a column
  const handlePin = (id: string): void => {
    setWhenColumnDefs((data: any) => {
      const updatedColumnDefs = [...data];
      const index = updatedColumnDefs.findIndex((col) => col.id === id);
      const column = updatedColumnDefs[index];
      updatedColumnDefs[index] = {
        ...column,
        pinned: 'left', // Set pinned property to 'left' unconditionally
      };

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
          // Api provided to perform sorting on the column data
          state: [{ colId: id, sort: 'asc' }], // here colId - represents which column need to be sorted and sort - whether it is ascending or descending
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


  useEffect(() => {
    console.log(whenColDefs);
  }, [whenColDefs]);


  useEffect(() => {
    window.addEventListener('error', (e) => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
        console.log('catch');
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        );
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    });
  }, []);



  return (
    <div className="flex flex-col">
      <div className="scroll-wrapper w-full flex ">
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
            // columnDefs={whenColDefs} //zustand state column array
            columnDefs={whenColumnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
            onCellValueChanged={handleCellValueChanged} //onCellValueChanged - property is used to specify a callback function that will be triggered when the value of a cell in the data grid or table is changed.
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
        className="width-[60px] m-12  w-fit font-semibold"
        onClick={() => {
          addRow(whenColumnDefs, thenColumnDefs);
        }}
      >
        Add Rule
      </button>
    </div>
  );
};
export default Table;
