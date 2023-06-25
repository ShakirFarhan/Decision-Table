import React, { useState } from 'react';
import { headerTypes } from '../../constants/data';
import { defaultProps } from '../../constants/interfaces';
import '../css/typesoption.css';
const TypesOptions: React.FC<defaultProps> = ({
  id,
  type,
  column,
  onColumnChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(type || 'None');
  const [columnName, setColumnName] = useState(column);
  const handleSelectedOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleColumnName = (e: any) => {
    setColumnName(e.target.value);
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onColumnChange(id, columnName, selectedOption);
  };

  return (
    <>
      <form
        onSubmit={handleOnSubmit}
        className="modal-options flex flex-col gap-y-[12px] px-[10px] py-[8px] bg-[var(--primary-bg)] w-[270px] h-[230px]"
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
          className="px-[10px] py-[4px] text-[var(--primary-color)] border-[1.7px] border-[var(--primary-border)] text-[var(--primary-color)] bg-[var(--primary-bg)]"
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
          className="px-[10px] py-[4px] text-[var(--primary-color)] border-[1.7px] border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-color)] col-other-input outline-0"
          name="description"
          type="text"
          placeholder="Description"
        />
        <input
          className="px-[10px] py-[4px] text-[var(--primary-color)] border-[1.7px] border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-color)] col-other-input outline-0"
          name="default"
          type="text"
          placeholder="Default Value"
        />
        <input
          className="px-[10px] py-[4px] text-[var(--primary-color)] border-[1.7px] border-[var(--primary-border)] bg-[var(--primary-bg)] text-[var(--primary-color)] col-other-input outline-0"
          name="expression"
          type="text"
          placeholder="Expression"
        />
        <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-[100%]">Submit</button>
      </form>
    </>
  );
};

export default TypesOptions;
