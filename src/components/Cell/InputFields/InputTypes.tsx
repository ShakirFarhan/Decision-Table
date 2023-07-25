import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
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
  hasError,
}: any) {
  // if the selected option of cell data is "between", then there will be 2 inputs. else only 1 input
  const [inputValues, setInputValues] = useState<Array<string>>(
    editingValue && editingValue.firstval
      ? [editingValue.firstval, editingValue.secondval]
      : ['', '']
  );

  // const [secondval, setSecondVal] = useState<string>(
  //   editingValue && editingValue.secondval
  // );
  useEffect(() => {
    console.log(inputValues);

    // If you want to construct an object with firstval and secondval
    const value = {
      firstval: inputValues[0],
      secondval: inputValues[1],
    };

    handleChange(value);
  }, [inputValues]);



  if (getTypeOfInput(dataType, selectedOption) === 'single-input') {
    return (
      <Input
        style={{
          backgroundColor: 'var(--primary-bg)',
          borderColor: 'var(--primary-border)',
          color: 'var(--primary-color)',
          marginBottom: '12px',
        }}
        type={dataType.toLowerCase() === 'number' ? 'number' : 'text'}
        className="px-[10px] py-[4px] border-[1.7px]"
        placeholder={inputValues[0] || 'Enter'}
        value={inputValues[0]}
        onChange={(event) => {
          setInputValues([event.target.value, inputValues[1]]);
        }}
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
          type={dataType.toLowerCase() === 'number' ? 'number' : 'text'}
          className="px-[10px] py-[4px] border-[1.7px]"
          placeholder={inputValues[0] || 'Enter'}
          value={inputValues[0]}
          onChange={(event) => {
            setInputValues([event.target.value, inputValues[1]]);
          }}
        />
        <Input
          style={{
            backgroundColor: 'var(--primary-bg)',
            borderColor: 'var(--primary-border)',
            color: 'var(--primary-color)',
            marginBottom: '12px',
          }}
          type={dataType.toLowerCase() === 'number' ? 'number' : 'text'}
          className="px-[10px] py-[4px] border-[1.7px]"
          placeholder={inputValues[1] || 'Enter'}
          value={inputValues[1]}
          onChange={(event) => {
            setInputValues([inputValues[0], event.target.value]);
          }}
        />
      </>
    );
  } else if (getTypeOfInput(dataType, selectedOption) === 'date-inputs') {
    return (
      <StartEndDate
        firstval={inputValues[0]}
        secondval={inputValues[1]}
        setInputValues={setInputValues}
      />
    );
  } else if (
    getTypeOfInput(dataType, selectedOption) === 'time-inputs' ||
    getTypeOfInput(dataType, selectedOption) === 'day-time-inputs'
  ) {
    return (
      <StartEndTime
        firstval={inputValues[0]}
        secondval={inputValues[1]}
        setInputValues={setInputValues}
      />
    );
  } else if (
    getTypeOfInput(dataType, selectedOption) === 'month-month-inputs'
  ) {
    return <MonthToMonth />;
  } else if (getTypeOfInput(dataType, selectedOption) === 'year-year-inputs') {
    return (
      <YearToYear
        firstval={inputValues[0]}
        secondval={inputValues[1]}
        setInputValues={setInputValues}
      />
    );
  } else if (getTypeOfInput(dataType, selectedOption) === 'date-time-inputs') {
    return <DateTimePicker />;
  } else {
    return <></>;
  }
}

export default InputTypes;
