import React, { useState } from 'react';
import { types } from '../../constants/data';
import { defaultProps } from '../../constants/interfaces';
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
    <form
      onSubmit={handleOnSubmit}
      className="modal-options flex flex-col gap-y-[12px] px-[10px] py-[8px] bg-[white]"
    >
      <input
        name="col-name"
        type="text"
        onChange={handleColumnName}
        value={columnName}
        placeholder="Column Name"
        className="px-[10px] py-[4px]"
      />
      <select
        className="px-[10px] py-[4px]"
        value={selectedOption}
        onChange={handleSelectedOptions}
      >
        {types.map((e) => {
          if (selectedOption === e.type.toLowerCase()) {
            return (
              <option
                key={e.id}
                value={e.type.toLowerCase()}
                className="w-[100px] h-[400px] text-[#2f54eb] outline-none border-none bg-[#f0f5ff] shadow-lg rounded-[-10px] px-[4px] py-[3px] text-[15px] tracking-[0.3px] mb-4px"
              >
                {e.type}
              </option>
            );
          }
          return (
            <option key={e.id} value={e.type.toLowerCase()}>
              {e.type}
            </option>
          );
        })}
      </select>
      <input
        className="px-[10px] py-[4px]"
        name="description"
        type="text"
        placeholder="Description"
      />
      <input
        className="px-[10px] py-[4px]"
        name="default"
        type="text"
        placeholder="Default Value"
      />
      <input
        className="px-[10px] py-[4px]"
        name="expression"
        type="text"
        placeholder="Expression"
      />
      <button className="px-[10px] py-[4px]" type="submit">
        Save
      </button>
    </form>
  );
};

export default TypesOptions;
