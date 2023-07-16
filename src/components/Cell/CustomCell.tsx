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
  inputValidation,
  getCellValue,
} from '../../utils';
import InputTypes from './InputFields/InputTypes';
import { Row, customCellProps } from '../../constants/interfaces';
type editingValue = {
  firstval: string;
  secondval: string;
};
let defaultEditingValue: editingValue = {
  firstval: '',
  secondval: '',
};
const CustomCell: React.FC<customCellProps> = ({
  colDataType,
  columnId,
  rowIndex,
  collCellValue,
  button,
  api,
  id,
}) => {
  // check celldata.json file in root folder, to know what is getting stored in the following states
  const { editRowDataType, rowDataType } = useStore((store) => store);
  const [clicked, setClicked] = useState<boolean>(false);
  const [cellData, setCellData] = useState<Row>({}); // this contains the individual cell data
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [activeSelectedOption, setActiveSelectedOption] = useState<string>('');
  const [editingValue, setEditingValue] =
    useState<editingValue>(defaultEditingValue); // try looking into this state too.
  const [inputError, setInputError] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);
  const [cellValue, setCellValue] = useState<any>(); // we dont need this state
  const handleChange = (value: editingValue) => {
    setEditingValue(value);
  };
  const handleChangeOption = (value: string) => {
    setSelectedOption(value);
  };
  const handleMouseEnter = () => {
    setHovering(true);
  };
  const handleMouseLeave = () => {
    setHovering(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (colDataType.toLowerCase() === 'string') {
      const isValid: boolean = inputValidation(
        selectedOption,
        editingValue.firstval
      );

      setInputError(!isValid);
      if (isValid) {
        api.startEditingCell({
          rowIndex: rowIndex,
          colKey: columnId,
        });
        api.setSuppressRowClickSelection(true);
        const cellValueNew = {
          type: selectedOption,
          value: editingValue,
        };
        editRowDataType(rowIndex, columnId, cellValueNew);
        setClicked(false);
        api.stopEditing({
          rowIndex: rowIndex,
          colKey: columnId,
        });
      } else {
        return;
      }
      setActiveSelectedOption(selectedOption);
    } else {
      setInputError(false);
      api.startEditingCell({
        rowIndex: rowIndex,
        colKey: columnId,
      });
      api.setSuppressRowClickSelection(true);
      const cellValueNew = {
        type: selectedOption,
        value: editingValue,
      };
      editRowDataType(rowIndex, columnId, cellValueNew);
      setClicked(false);
      api.stopEditing({
        rowIndex: rowIndex,
        colKey: columnId,
      });
      setActiveSelectedOption(selectedOption);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10);
    let newtype: Row = rowDataType.find(
      (value) => value.key === columnId && value.rowIndex === rowIndex
    );

    setCellData(newtype);
    setSelectedOption(newtype?.value?.type ? newtype.value.type : '');
    setEditingValue(
      newtype?.value?.value ? newtype.value.value : defaultEditingValue
    );

    setCellValue(
      newtype &&
        newtype.value &&
        newtype.value.value &&
        getCellValue(colDataType, newtype.value.value)
    );
  }, [rowDataType]);

  if (button !== 'Add Rule' && id !== 'any-col' && !loading) {
    return (
      <>
        <div
          className={`w-[100%] h-full ${
            checkValidity(cellData, collCellValue) === false
              ? 'border-x-[1px] border-red-500 border-y-[1px]'
              : 'border-r-[1px] border-y-[1.5px] border-y-transparent border-[var(--primary-border)]'
          }  bg-[var(--primary-bg)] hover:bg-[var(--secondary-bg)] hover:border-[1px] hover:border-[var(--secondary-color)] hover:cursor-pointer `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-start h-[40px] select-none px-3 gap-x-3 customCell">
            {cellData?.value?.type && (
              <div className="rounded-0 bg-[var(--primary-border)]  tracking-[1px] h-[25px]  flex items-center cellType ">
                <span className="text-[13px] font-medium text-[var(--primary-color)] px-2">
                  {/* here we are only showing the type. and based on this we will validate the cells */}
                  {getSpecialTypeLabels(cellData.value.type)}
                </span>
              </div>
            )}
            {activeSelectedOption?.toLowerCase() === 'between' ? (
              <>
                <div className="flex items-center">
                  [
                  <span className="text-[13px] font-medium text-[var(--primary-color)]">
                    {/* below line in working fine except if the coldatatype is date, In line 114 [setCellData(newType)] its not setting date values properly */}
                    {/* {cellData?.value?.value?.firstval} */}
                    {cellValue && cellValue[0]}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--primary-color)]">
                    {/* below line in working fine except if the coldatatype is date */}
                    {/* - {cellData?.value?.value?.secondval} */}-{' '}
                    {cellValue && cellValue[1]}
                  </span>
                  ]
                </div>
              </>
            ) : (
              <span className="text-[12px] font-medium text-[var(--primary-color)] tracking-wide">
                {/* below line in working fine except if the coldatatype is date */}
                {/* {cellData?.value?.value?.firstval} */}
                {cellValue && cellValue[0]}
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
                          cellData?.value?.type && cellData !== undefined
                            ? cellData.value.type
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
