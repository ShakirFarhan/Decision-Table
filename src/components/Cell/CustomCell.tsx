import React, { FormEvent, useState } from 'react';
import { Input, Popover } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { Select, Form } from 'antd';
import '../css/customCell.css';
import { useStore } from '../../store';
import { headerTypes } from '../../constants/data';
import RDatePicker from '../reusables/datepicker';

interface IProps {
  onEdit: (params: any) => void;
  cellValue?: any;
  id?: any;
  column?: any;
  node?: any;
  value?: any;
  data?: any;
  api?: any;
  rowIndex?: any;
  handleAddRow: () => void;
}
const CustomCell: React.FC<IProps> = (props) => {
  const { editRowDataType, rowDataType } = useStore((store) => store);

  const [clicked, setClicked] = useState(false);
  const [editingValue, setEditingValue] = useState(
    props && props.cellValue && props.cellValue.mainval
  );
  const [selectedOption, setSelectedOption] = useState(
    props && props.cellValue && props.cellValue.type
  );
  const [hovering, setHovering] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
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

  // fetching row type from store
  const rowDataTypes = rowDataType.find(
    (value) =>
      value.key === props.column.colId && value.rowIndex === props.rowIndex
  );
  if (props.data.button !== 'Add Rule' && props.id !== 'any-col') {
    return (
      <>
        <div
          className="w-[100%] h-full  border-r-[1px] border-y-[1.5px] border-y-transparent border-[var(--primary-border)] bg-[var(--primary-bg)] hover:bg-[var(--secondary-bg)] hover:border-[1px] hover:border-[var(--secondary-color)] hover:cursor-pointer"
          onMouseEnter={() => handleMouseEnter(props.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-start h-[40px] select-none px-3 gap-x-3 customCell">
            {rowDataTypes &&
              rowDataTypes.value &&
              rowDataTypes.value.type &&
              rowDataTypes.value.type !== undefined && (
                <div className="rounded-0 bg-[var(--primary-border)]  tracking-[1px] h-[25px]  flex items-center cellType ">
                  <span className="text-[13px] font-medium text-[var(--primary-color)] px-2">
                    {/* here we are only showing the type. and based on this we will validate the cells */}
                    {rowDataTypes.value.type}
                  </span>
                </div>
              )}

            <span className="text-[12px] font-medium text-[var(--primary-color)] tracking-wide">
              {props && props?.cellValue && props?.cellValue}
            </span>
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
                          // rowDataTypes &&
                          // rowDataTypes.value &&
                          // rowDataTypes.value.type &&
                          // rowDataTypes.value.type !== undefined
                          rowDataTypes?.value?.type
                            ? rowDataTypes.value.type
                            : 'Default'
                        }
                        onChange={handleChangeOption}
                        options={headerTypes
                          .find(
                            (value) =>
                              value.type === props?.column?.colDef?.dataType
                          )
                          ?.options.map((data) => {
                            return {
                              label: data?.value,
                              value: data?.value,
                            };
                          })}
                      />

                      {props?.column?.colDef?.dataType !== 'Date' ? (
                        <Input
                          style={{
                            backgroundColor: 'var(--primary-bg)',
                            borderColor: 'var(--primary-border)',
                            color: 'var(--primary-color)',
                          }}
                          className="px-[10px] py-[4px] border-[1.7px]"
                          placeholder={editingValue || 'Enter'}
                          value={editingValue}
                          onChange={handleChange}
                        />
                      ) : (
                        <RDatePicker />
                      )}
                      <button type="submit">Add</button>
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
