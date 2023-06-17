import React, { FormEvent, useState } from 'react';
import { Input, Popover } from 'antd';
import editIcon from '../../assets/Edit.svg';
import { Select, Form } from 'antd';
import '../css/customCell.css';
import { useStore } from '../../store';
import { cellOptions, containsSpecialValue, headerTypes } from '../../constants/data';

interface IProps {
  onEdit: (params: any) => void;
  cellValue?: any;
  id?: any;
  column?: any;
  node?: any;
  value?: any;
  data?: any;
  handleAddRow: () => void;
}
const CustomCell: React.FC<IProps> = (props) => {

  console.log({props: props?.column?.colDef?.dataType})

  const { editRowData } = useStore((store) => store);
  const [clicked, setClicked] = useState(false);
  const [editingValue, setEditingValue] = useState(
    // cell code
    // props && props.cellValue?.actualValue && props.cellValue.actualValue.value
    props && props.cellValue && props.cellValue.value
  );
  const [selectedOption, setSelectedOption] = useState(
    // cell code
    // props && props.cellValue?.actualValue && props.cellValue.actualValue.type
    props && props.cellValue && props.cellValue.type
  );
  const [hovering, setHovering] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.target.value);
  };

  const handleChangeOption = (value: any) => {
    setSelectedOption(value);
  };
  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const cellValueNew = {
      type: selectedOption,
      value: editingValue,
    };
    editRowData(props.node.rowIndex, props.column.colId, cellValueNew);
  };
  if (props.data.button !== 'Add Rule' && props.id !== 'any-col') {
    return (
      <>
        <div
          className="w-full h-full border-l-[1.5px] border-r-[1.5px] border-r-transparent border-y-[1.5px] border-y-transparent border-[#e7e7e7] bg-[#fafafa] hover:bg-[#fff] hover:border-[1.5px] hover:border-[#597EF7] hover:cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-start h-[40px] select-none px-3 gap-x-3 customCell">
            {/* cell code  */}
            {/* {props &&
              props.cellValue?.actualValue &&
              props.cellValue?.actualValue.type && ( */}
            {props && props.cellValue && props.cellValue.type && (
              <div className="rounded-0 bg-[#f5f5f5]  tracking-[1px] h-[25px]  flex items-center cellType ">
                {containsSpecialValue(props.cellValue.actualValue.type) ? (
                  <span className="flex items-center font-medium text-[#595959] w-[26px] pl-2 py-0">
                    {props.cellValue.type}
                  </span>
                ) : (
                  <span className="text-[13px] font-medium text-[#595959] px-2">
                    {props.cellValue.type}
                  </span>
                )}
              </div>
            )}

            <span className="text-[12px] font-medium text-[#595959] tracking-wide">
              {/* cell code  */}
              {/* {props &&
                props.cellValue?.actualValue &&
                props.cellValue?.actualValue?.value} */}
              {props && props.cellValue && props.cellValue.value}
            </span>
            <Popover
              placement="bottomRight"
              overlayClassName="custom-popover"
              onOpenChange={(visible) => {
                if (!visible) {
                  setClicked(false);
                }
              }}
              content={
                <>
                  <div className="w-[240px] p-3 -rounded-[20px]">
                    <Form onFinish={handleSubmit}>
                      <Select
                        className="w-full rounded-0 mb-3 select"
                        defaultValue={selectedOption || 'Default'}
                        onChange={handleChangeOption}
                        options={headerTypes.find(value => value.type.toLowerCase() === props?.column?.colDef?.dataType)?.options.map((data) => ({
                          label: data?.value,
                          value: data?.value,
                        }))}
                      />
                      <Input
                        placeholder={editingValue || 'Enter'}
                        value={editingValue}
                        onChange={handleChange}
                      />
                      <button type="submit"></button>
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
                  <img src={editIcon} className="w-[18px] h-[18px]" alt="" />
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
