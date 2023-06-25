import { Input } from 'antd';
import React from 'react';
import { getTypeOfInput } from '../../../utils';
import {
  DateTimePicker,
  MonthToMonth,
  StartEndDate,
  StartEndTime,
  YearToYear,
} from './Date';

function InputTypes({
  editingValue,
  handleChange,

  dataType,
  selectedOption,
}: any) {
  if (getTypeOfInput(dataType, selectedOption) === 'single-input') {
    return (
      <Input
        style={{
          backgroundColor: 'var(--primary-bg)',
          borderColor: 'var(--primary-border)',
          color: 'var(--primary-color)',
          marginBottom: '12px',
        }}
        className="px-[10px] py-[4px] border-[1.7px]"
        placeholder={editingValue || 'Enter'}
        value={editingValue}
        onChange={handleChange}
      />
    );
  } else if (getTypeOfInput(dataType, selectedOption) === 'two-input') {
    return (
      <>
        <Input
          style={{
            backgroundColor: 'var(--primary-bg)',
            borderColor: 'var(--primary-border)',
            color: 'var(--primary-color)',
            marginBottom: '12px',
          }}
          className="px-[10px] py-[4px] border-[1.7px]"
          placeholder={editingValue || 'Enter'}
          value={editingValue}
          onChange={handleChange}
        />
        <Input
          style={{
            backgroundColor: 'var(--primary-bg)',
            borderColor: 'var(--primary-border)',
            color: 'var(--primary-color)',
            marginBottom: '12px',
          }}
          className="px-[10px] py-[4px] border-[1.7px]"
          placeholder={editingValue || 'Enter'}
          value={editingValue}
          onChange={handleChange}
        />
      </>
    );
  } else if (getTypeOfInput(dataType, selectedOption) === 'date-inputs') {
    return <StartEndDate />;
  } else if (
    getTypeOfInput(dataType, selectedOption) === 'time-inputs' ||
    getTypeOfInput(dataType, selectedOption) === 'day-time-inputs'
  ) {
    return <StartEndTime />;
  } else if (
    getTypeOfInput(dataType, selectedOption) === 'month-month-inputs'
  ) {
    return <MonthToMonth />;
  } else if (getTypeOfInput(dataType, selectedOption) === 'year-year-inputs') {
    return <YearToYear />;
  } else if (getTypeOfInput(dataType, selectedOption) === 'date-time-inputs') {
    return <DateTimePicker />;
  } else {
    return <></>;
  }
}

export default InputTypes;
