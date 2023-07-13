import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { Select, Form } from 'antd';
import '../css/customCell.css';
import { useStore } from '../../store';
import { headerTypes } from '../../constants/data';
import {
  getSpecialTypeLabels,
  checkValidity,
  getCellValue,
  inputValidation,
} from '../../utils';
import InputTypes from './InputFields/InputTypes';
import { customCellProps } from '../../constants/interfaces';

const CustomCell: React.FC<customCellProps> = (props) => {
  const { editRowDataType, rowDataType } = useStore((store) => store);
  const [clicked, setClicked] = useState(false);
  const [rowDataTypes, setRowDataType] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [cellValue, setCellValue] = useState<any>();
  // fetching row type from store
  const colDataType = props?.column?.colDef?.dataType;
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [activeSelectedOption, setActiveSelectedOption] = useState<string>('');
  const [editingValue, setEditingValue] = useState<any>('');
  const [inputError, setInputError] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  let columnId = props.column.colId;
  let rowIndex = props.node.rowIndex;
  const handleChange = (value: any) => {
    setEditingValue(value);
  };

  const handleChangeOption = (value: any) => {
    setSelectedOption(value);
  }
  const handleMouseEnter = (id: any) => {
    setHovering(true);
  };
  console.log(props.cellValue, colDataType)
  console.log(props)
  const handleMouseLeave = () => {
    setHovering(false);
  };



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (colDataType.toLowerCase() === 'string') {
      
      const isValid: boolean = inputValidation(
        selectedOption,
        editingValue.firstval
      );
      console.log(isValid);
      setInputError(!isValid);
      if (isValid) {
        props.api.startEditingCell({
          rowIndex: props.rowIndex,
          colKey: props.column.getId(),
        });
        props.api.setSuppressRowClickSelection(true);
        const cellValueNew = {
          type: selectedOption,
          value: editingValue,
        };
        editRowDataType(rowIndex, columnId, cellValueNew);
        setClicked(false);
        props.api.stopEditing({
          rowIndex: props.rowIndex,
          colKey: props.column.getId(),
        });
      } else {
        return;
      }
      setActiveSelectedOption(selectedOption);
    } else {
      setInputError(false);
      props.api.startEditingCell({
        rowIndex: props.rowIndex,
        colKey: props.column.getId(),
      });
      props.api.setSuppressRowClickSelection(true);
      const cellValueNew = {
        type: selectedOption,
        value: editingValue,
      };
      editRowDataType(rowIndex, columnId, cellValueNew);
      setClicked(false);
      props.api.stopEditing({
        rowIndex: props.rowIndex,
        colKey: props.column.getId(),
      });
      setActiveSelectedOption(selectedOption);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10);
    // if(rowDataType.length){
    let newtype = rowDataType.find(
      (value) => value.key === columnId && value.rowIndex === props.rowIndex
    );

    setRowDataType(newtype);
    setSelectedOption(newtype && newtype.value && newtype.value.type);
    setEditingValue(newtype && newtype.value && newtype.value.value);
    setCellValue(
      newtype &&
        newtype.value &&
        newtype.value.value &&
        getCellValue(colDataType, newtype.value.value)
    );
    // }
  }, [rowDataType]);
  if (props.data.button !== 'Add Rule' && props.id !== 'any-col' && !loading) {
    return (
      <>
        <div
          className={`w-[100%] h-full ${
            checkValidity(rowDataTypes, props.cellValue) === false
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
            {activeSelectedOption?.toLowerCase() === 'between' ? (
              <>
                <div className="flex items-center">
                  [
                  <span className="text-[13px] font-medium text-[var(--primary-color)]">
                    {cellValue ? cellValue[0] : ''}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--primary-color)]">
                    - {cellValue ? cellValue[1] : ''}
                  </span>
                  ]
                </div>
              </>
            ) : (
              <span className="text-[12px] font-medium text-[var(--primary-color)] tracking-wide">
                {cellValue && cellValue}
              </span>
            )}
            <Popover
              placement="bottomRight"
              overlayClassName="custom-popover"
              open={clicked}
              onOpenChange={(visible) => {
                if (!visible) {
                  setClicked(false);
                  setInputError(false);
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
                        hasError={inputError}
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
