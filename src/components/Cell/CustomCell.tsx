import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Popover } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { Select, Form } from 'antd';
import '../css/customCell.scss';
import { useStore } from '../../store';
import { headerTypes } from '../../constants/data';
import {
  getSpecialTypeLabels,
  checkValidity,
  inputValidation,
  formatDate,
} from '../../utils';
import InputTypes from './InputFields/InputTypes';
import { Rule, customCellProps } from '../../constants/interfaces';

type editingValue = {
  firstval: string;
  secondval: string;
};
let defaultEditingValue: editingValue = {
  firstval: '',
  secondval: '',
};
const CustomCell: React.FC<customCellProps> = ({
  colDataType, // this is the datatype of the column like string,number,date...
  columnId, // the unique id of the column
  rowIndex, // rowIndex of this particular cell
  collCellValue,
  button,
  api, // provided by the ag grid library itself
  id,
}) => {
  const { editRowDataType, rowDataType } = useStore((store) => store);
  // if clicked is true it will display a popup where we can input the values to the cells
  const [clicked, setClicked] = useState<boolean>(false);
  // This contains the individual cell data
  const [cellData, setCellData] = useState<Rule>();
  const [loading, setLoading] = useState<boolean>(false);
  // this contains the selectedOption of a cell eg: if cell value has [equals 20]. here the selectedOption is equals. In short selected options can be any value from cellDatatype which is selected
  const [activeSelectedOption, setActiveSelectedOption] = useState<string>('');
  // Stores the handlechange function values of the cell input popup
  const [editingValue, setEditingValue] =
    useState<editingValue>(defaultEditingValue);
  // checks if the input value doesn't suit the cell datatype. eg: for string type columm, we have a cell value of [capital test]. here the cell value(test) doesn't suit the cell type(capital) because cell value is of small letter. it will set error to true
  const [inputError, setInputError] = useState<boolean>(false);
  // if this is true then pen icon will get displayed in cell. to edit the cell data
  const [hovering, setHovering] = useState<boolean>(false);
  const handleChange = (value: editingValue) => {
    setEditingValue(value);
  };
  const handleChangeOption = (value: string) => {
    setActiveSelectedOption(value);
  };
  const handleMouseEnter = () => {
    setHovering(true);
  };
  const handleMouseLeave = () => {
    setHovering(false);
  };
  // cell data has cell type(between,equals,...) and cell values, and cell values has first value and second value
  let cellDataFirstValue: string | undefined = cellData?.value?.value?.firstval;
  let cellDataSecondValue: string | undefined =
    cellData?.value?.value?.secondval;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (colDataType.toLowerCase() === 'string') {
      // checks if the input value satisfies cellDataType
      const isValid: boolean = inputValidation(
        activeSelectedOption,
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
          type: activeSelectedOption,
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
      setActiveSelectedOption(activeSelectedOption);
    } else {
      setInputError(false);
      api.startEditingCell({
        rowIndex: rowIndex,
        colKey: columnId,
      });
      api.setSuppressRowClickSelection(true);
      const cellValueNew = {
        type: activeSelectedOption,
        value: editingValue,
      };
      // sets the new cellData
      editRowDataType(rowIndex, columnId, cellValueNew);
      setClicked(false);
      api.stopEditing({
        rowIndex: rowIndex,
        colKey: columnId,
      });
      setActiveSelectedOption(activeSelectedOption);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10);
    let newtype: Rule | undefined = rowDataType.find(
      (value) => value.key === columnId && value.rowIndex === rowIndex
    );
    if (newtype) setCellData(newtype);
    setActiveSelectedOption(newtype?.value?.type ? newtype.value.type : '');
    setEditingValue(
      newtype?.value?.value ? newtype.value.value : defaultEditingValue
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
          }  bg-[var(--primary-bg)] hover:bg-[var(--secondary-bg)] hover:border-[1px] hover:border-[var(--secondary-color)] hover:cursor-pointer cell-container`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-start h-[40px] select-none px-3 gap-x-3 customCell">
            {cellData?.value?.type && (
              <div className="rounded-0 bg-[var(--primary-border)]  tracking-[1px] h-[25px]  flex items-center cellType ">
                <span className="text-[13px] font-medium text-[var(--primary-color)] px-2">
                  {/* Here we are only showing the type. and based on this we will validate the cells */}
                  {getSpecialTypeLabels(cellData.value.type)}
                </span>
              </div>
            )}

            {activeSelectedOption?.toLowerCase() === 'between' ? (
              <>
                <div className="flex items-center">
                  [
                  <span className="text-[13px] font-medium text-[var(--primary-color)]">
                    {typeof cellDataFirstValue == 'string'
                      ? cellDataFirstValue
                      : cellDataFirstValue !== undefined &&
                        formatDate(new Date(cellDataFirstValue))}
                  </span>
                  <span className="text-[13px] font-medium text-[var(--primary-color)] ms-1">
                    -{' '}
                    {typeof cellDataSecondValue == 'string'
                      ? cellDataSecondValue
                      : cellDataSecondValue !== undefined &&
                        formatDate(new Date(cellDataSecondValue))}
                  </span>
                  ]
                </div>
              </>
            ) : (
              <span className="text-[12px] font-medium text-[var(--primary-color)] tracking-wide">
                {typeof cellDataFirstValue == 'string'
                  ? cellDataFirstValue
                  : cellDataFirstValue !== undefined &&
                    formatDate(new Date(cellDataFirstValue))}
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
                        selectedOption={activeSelectedOption}
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
                  <div className="edit-icon">
                    <AiOutlineEdit color="var(--secondary-color)" />
                  </div>
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
