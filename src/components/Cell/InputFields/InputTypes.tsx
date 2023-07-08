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
  const [firstval, setFirstVal] = useState(
    editingValue && editingValue.firstval
  );
  const [secondval, setSecondVal] = useState(
    editingValue && editingValue.secondval
  );

  // console.log({editingValue})
  useEffect(() => {
    const value = {
      firstval: firstval,
      secondval: secondval,
    };

    handleChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstval, secondval]);
  console.log('has error ' + hasError);
  if (getTypeOfInput(dataType, selectedOption) === 'single-input') {
    console.log('single');
    return (
      <Input
        style={{
          backgroundColor: 'var(--primary-bg)',
          borderColor: hasError ? '#FF0000' : 'var(--primary-border)',
          color: 'var(--primary-color)',
          marginBottom: '12px',
        }}
        type={dataType.toLowerCase() === 'number' ? 'number' : 'text'}
        className={`px-[10px] py-[4px] border-[1.7px]`}
        placeholder={firstval || 'Enter'}
        value={firstval}
        onChange={(event) => {
          setFirstVal(event.target.value);
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
          placeholder={firstval || 'Enter'}
          value={firstval}
          onChange={(event) => setFirstVal(event.target.value)}
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
          placeholder={secondval || 'Enter'}
          value={secondval}
          onChange={(event) => setSecondVal(event.target.value)}
        />
      </>
    );
  } else if (getTypeOfInput(dataType, selectedOption) === 'date-inputs') {
    return (
      <StartEndDate
        firstval={firstval}
        setFirstVal={setFirstVal}
        secondval={secondval}
        setSecondVal={setSecondVal}
      />
    );
  } else if (
    getTypeOfInput(dataType, selectedOption) === 'time-inputs' ||
    getTypeOfInput(dataType, selectedOption) === 'day-time-inputs'
  ) {
    return (
      <StartEndTime
        firstval={firstval}
        setFirstVal={setFirstVal}
        secondval={secondval}
        setSecondVal={setSecondVal}
      />
    );
  } else if (
    getTypeOfInput(dataType, selectedOption) === 'month-month-inputs'
  ) {
    return <MonthToMonth />;
  } else if (getTypeOfInput(dataType, selectedOption) === 'year-year-inputs') {
    return (
      <YearToYear
        firstval={firstval}
        setFirstVal={setFirstVal}
        secondval={secondval}
        setSecondVal={setSecondVal}
      />
    );
  } else if (getTypeOfInput(dataType, selectedOption) === 'date-time-inputs') {
    return <DateTimePicker />;
  } else {
    return <></>;
  }
}

export default InputTypes;
