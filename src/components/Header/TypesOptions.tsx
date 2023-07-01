import React, { useState } from 'react';
import { headerTypes } from '../../constants/data';
import { defaultProps } from '../../constants/interfaces';
import '../css/typesoption.css';
import { Button } from 'antd';
import { useStore } from '../../store';
const TypesOptions: React.FC<defaultProps> = ({ id, type, column }) => {
  const [selectedOption, setSelectedOption] = useState(type || 'None');
  const [columnName, setColumnName] = useState(column);
  const { handleEditCol } = useStore((store) => store);
  const handleSelectedOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleColumnName = (e: any) => {
    setColumnName(e.target.value);
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    handleEditCol(id, columnName, selectedOption);
  };

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="modal-options flex flex-col gap-y-[12px] px-[10px] py-[8px] bg-[var(--primary-bg)] w-[270px] h-[280px] border-r-2"
      >
        <input
          name="col-name"
          type="text"
          onChange={handleColumnName}
          value={columnName}
          placeholder="Column Name"
          className="px-[10px] py-[4px] border-[1.7px] border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-color)] col-input outline-0"
        />
        <select
          className="px-[10px] py-[4px] border-[1.7px] border-[var(--primary-border)] text-[var(--primary-color)] bg-[var(--primary-bg)]"
          value={selectedOption}
          onChange={handleSelectedOptions}
        >
          {headerTypes.map((e, index) => {
            if (selectedOption === e.type) {
              return (
                <option
                  key={index}
                  value={e.type}
                  className="w-[100px] h-[400px] text-[var(--secondary-color)] outline-0 border-none bg-[var(--hover-bg)] shadow-lg rounded-[-10px] px-[4px] py-[3px] text-[15px] tracking-[0.3px] mb-4px"
                >
                  {e.type}
                </option>
              );
            }
            return (
              <option key={index} value={e.type}>
                {e.type}
              </option>
            );
          })}
        </select>
        <input
          className="px-[10px] py-[4px]  border-[1.7px] border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-color)] col-other-input outline-0"
          name="description"
          type="text"
          placeholder="Description"
        />
        <input
          className="px-[10px] py-[4px] border-[1.7px] border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-color)] col-other-input outline-0"
          name="default"
          type="text"
          placeholder="Default Value"
        />
        <input
          className="px-[10px] py-[4px]  border-[1.7px] border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-color)] col-other-input outline-0"
          name="expression"
          type="text"
          placeholder="Expression"
        />
        <Button className="w-full bg-blue-400" type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default TypesOptions;
