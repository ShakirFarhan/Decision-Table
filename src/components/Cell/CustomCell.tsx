import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { Select, Form } from 'antd';
import '../css/customCell.css';
import { useStore } from '../../store';
import { headerTypes } from '../../constants/data';
import { getSpecialTypeLabels, checkValidity, getCellValue } from '../../utils';
import InputTypes from './InputFields/InputTypes';
import { customCellProps } from '../../constants/interfaces';


const CustomCell: React.FC<customCellProps> = (props) => {
  const { editRowDataType, rowDataType } = useStore((store) => store);
  const [clicked, setClicked] = useState(false);
  const [rowDataTypes, setRowDataType] = useState<any>({}) 


  useEffect(() => {
    console.log("it's triggered")
    // console.log(rowDataType)
    // if(rowDataType.length){
      let newtype = rowDataType.find(
        (value) =>
          value.key === props.column.colId && value.rowIndex === props.rowIndex
      );
      console.log({newtype})
      setRowDataType(newtype);
      setSelectedOption(newtype && newtype.value && newtype.value.type)
      setEditingValue(newtype && newtype.value && newtype.value.value)
    // }
    
  }, [rowDataType, clicked])

  // fetching row type from store
  
  const colDataType = props?.column?.colDef?.dataType;
  const [selectedOption, setSelectedOption] = useState();

  const [editingValue, setEditingValue] = useState();

  console.log({selectedOption})
  console.log({editingValue})

  const [hovering, setHovering] = useState(false);

  const handleChange = (value: any) => {
    setEditingValue(value);
  };

  const handleChangeOption = (value: any) => {
    setSelectedOption(value);
  };
  const handleMouseEnter = (id: any) => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  // console.log(props)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    props.api.startEditingCell({
      rowIndex: props.rowIndex,
      colKey: props.column.getId(),
    });
    props.api.setSuppressRowClickSelection(true);
    const cellValueNew = {
      type: selectedOption,
      value: editingValue,
    };
    editRowDataType(
      props,
      props.node.rowIndex,
      props.column.colId,
      cellValueNew
    );
    setClicked(false);
    props.api.stopEditing({
      rowIndex: props.rowIndex,
      colKey: props.column.getId(),
    });
  };

  const cellValue = getCellValue(colDataType, rowDataTypes?.value?.value);


  if (props.data.button !== 'Add Rule' && props.id !== 'any-col') {
    return (
      <>
        <div
          className={`w-[100%] h-full ${checkValidity(rowDataTypes, props.cellValue) === false
              ? 'border-x-[1px] border-red-500 border-y-[1px]'
              : 'border-r-[1px] border-y-[1.5px] border-y-transparent border-[var(--primary-border)]'
            }  bg-[var(--primary-bg)] hover:bg-[var(--secondary-bg)] hover:border-[1px] hover:border-[var(--secondary-color)] hover:cursor-pointer `}
          onMouseEnter={() => handleMouseEnter(props.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-start h-[40px] select-none px-3 gap-x-3 customCell">
            {rowDataTypes?.value?.type && (
              <div className="rounded-0 bg-[var(--primary-border)]  tracking-[1px] h-[25px]  flex items-center cellType ">
                <span className="text-[13px] font-medium text-[var(--primary-color)] px-2">
                  {/* here we are only showing the type. and based on this we will validate the cells */}
                  {getSpecialTypeLabels(rowDataTypes.value.type)}
                </span>
              </div>
            )}
            {cellValue ? (
              typeof cellValue === 'string' ? (
                <span className="text-[12px] font-medium text-[var(--primary-color)] tracking-wide">
                  {cellValue}
                </span>
              ) : (
                <>
                  <div className="flex items-center">
                    [
                    <span className="text-[13px] font-medium text-[var(--primary-color)]">
                      {cellValue ? cellValue[0] : ''}
                    </span>
                    -
                    <span className="text-[13px] font-medium text-[var(--primary-color)]">
                      {cellValue ? cellValue[1] : ''}
                    </span>
                    ]
                  </div>
                </>
              )
            ) : (
              ''
            )}
            {/* </span> */}
            <Popover
              placement="bottomRight"
              overlayClassName="custom-popover"
              open={clicked}
              onOpenChange={(visible) => {
                if (!visible) {
                  setClicked(false);
                }
              }}
              content={
                <>
                  <div className="w-[240px] p-3 bg-[var(--primary-bg)] -rounded-[20px]">
                    <Form className="flex flex-col" onFinish={handleSubmit}>
                      <Select
                        style={{
                          backgroundColor: 'var(--primary-bg)',
                          borderColor: 'var(--primary-border)',
                          color: 'var(--primary-color)',
                        }}
                        className="w-full rounded-0 mb-3 select "
                        defaultValue={
                          rowDataTypes?.value?.type &&
                            rowDataTypes !== undefined
                            ? rowDataTypes.value.type
                            : 'Default'
                        }
                        onChange={handleChangeOption}
                        options={headerTypes
                          .find((value) => value.type === colDataType)
                          ?.options.map((data) => {
                            return {
                              label: data?.value,
                              value: data?.value,
                            };
                          })}
                      />

                      <InputTypes
                        dataType={colDataType}
                        selectedOption={selectedOption}
                        editingValue={editingValue}
                        handleChange={handleChange}
                        className="px-[10px] py-[4px] border-[1.7px]"
                      />
                      <Button
                        className="w-full bg-blue-400"
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                </>
              }
              trigger="click"
            >
              <button
                onClick={() => setClicked(true)}
                className="absolute right-4 w-[18px] h-[18px]"
              >
                {hovering || clicked ? (
                  <AiOutlineEdit color="var(--secondary-color)" />
                ) : (
                  ''
                )}
              </button>
            </Popover>
          </div>
        </div>
      </>
    );
  }
  return <></>;
};

export default CustomCell;
