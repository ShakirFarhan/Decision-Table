import { DatePicker, TimePicker } from 'antd';
import { useState } from 'react';

interface IProps {
  firstval?: any;
  secondval?: any;
  setInputValues: (value: any) => void;
}

export const StartEndDate: React.FC<IProps> = (props) => {
  const [startDate, setStartDate] = useState(props.firstval);
  const [endDate, setEndDate] = useState(props.secondval);
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
    props.setInputValues([date, props.secondval]);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    props.setInputValues([props.firstval, date]);
  };
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker
          onChange={handleStartDateChange}
          format="YYYY-MM-DD"
          value={startDate}
          placeholder="Select start date"
          style={{ width: '100%' }}
        />

        <DatePicker
          onChange={handleEndDateChange}
          value={endDate}
          format="YYYY-MM-DD"
          placeholder="Select end date"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
};

export const StartEndTime: React.FC<IProps> = (props) => {
  const [startTime, setStartTime] = useState(props.firstval);
  const [endTime, setEndTime] = useState(props.secondval);

  const handleStartTimeChange = (time: any) => {
    setStartTime(time);
    props.setInputValues([time, props.secondval]);
    // props.setFirstVal(time);
  };

  const handleEndTimeChange = (time: any) => {
    setEndTime(time);
    props.setInputValues([props.firstval, time]);
  };
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <TimePicker
          onChange={handleStartTimeChange}
          value={startTime}
          format="HH:mm"
          placeholder="Select start time"
          style={{ width: '100%' }}
        />

        <TimePicker
          onChange={handleEndTimeChange}
          value={endTime}
          format="HH:mm"
          placeholder="Select end time"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
};

export function MonthToMonth() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker.MonthPicker
          onChange={handleStartDateChange}
          value={startDate}
          format="YYYY-MM"
          placeholder="Select start month"
          style={{ width: '100%' }}
        />

        <DatePicker.MonthPicker
          value={endDate}
          onChange={handleEndDateChange}
          format="YYYY-MM"
          placeholder="Select end month"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}

export const YearToYear: React.FC<IProps> = (props) => {
  const [startYear, setStartYear] = useState(props.firstval);
  const [endYear, setEndYear] = useState(props.secondval);

  const handleStartYearChange = (date: any) => {
    setStartYear(date);
    props.setInputValues([date, props.secondval]);
    // props.setFirstVal(date);
  };

  const handleEndYearChange = (date: any) => {
    setEndYear(date);
    props.setInputValues([props.firstval, date]);
    // props.setSecondVal(date);
  };
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker.YearPicker
          value={startYear}
          onChange={handleStartYearChange}
          format="YYYY"
          placeholder="Select start year"
          style={{ width: '100%' }}
        />

        <DatePicker.YearPicker
          value={endYear}
          onChange={handleEndYearChange}
          format="YYYY"
          placeholder="Select end year"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
};
export function DateTimePicker() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };
  const handleStartTimeChange = (date: any) => {
    setStartTime(date);
  };

  const handleEndTimeChange = (date: any) => {
    setEndTime(date);
  };
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker
          placeholder="Select start date"
          format="YYYY-MM-DD"
          style={{ width: '100%' }}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <TimePicker
          placeholder="Select start time"
          format="HH:mm"
          style={{ width: '100%' }}
          value={startTime}
          onChange={handleStartTimeChange}
        />

        <DatePicker
          placeholder="Select end date"
          format="YYYY-MM-DD"
          style={{ width: '100%' }}
          value={endDate}
          onChange={handleEndDateChange}
        />
        <TimePicker
          placeholder="Select end time"
          format="HH:mm"
          style={{ width: '100%' }}
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </div>
    </>
  );
}
