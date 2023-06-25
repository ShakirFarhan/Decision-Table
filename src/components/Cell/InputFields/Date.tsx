import { DatePicker, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';

export function StartEndDate() {
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker
          format="YYYY-MM-DD"
          placeholder="Select start date"
          style={{ width: '100%' }}
        />

        <DatePicker
          format="YYYY-MM-DD"
          placeholder="Select end date"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}

export function StartEndTime() {
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <TimePicker
          format="HH:mm"
          placeholder="Select start time"
          style={{ width: '100%' }}
        />

        <TimePicker
          format="HH:mm"
          placeholder="Select end time"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}

export function MonthToMonth() {
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker.MonthPicker
          format="YYYY-MM"
          placeholder="Select start month"
          style={{ width: '100%' }}
        />

        <DatePicker.MonthPicker
          format="YYYY-MM"
          placeholder="Select end month"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}
export function YearToYear() {
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker.YearPicker
          format="YYYY"
          placeholder="Select start year"
          style={{ width: '100%' }}
        />

        <DatePicker.YearPicker
          format="YYYY"
          placeholder="Select end year"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}
export function DateTimePicker() {
  return (
    <>
      <div className="flex flex-col gap-y-3 mb-3">
        <DatePicker
          placeholder="Select start date"
          format="YYYY-MM-DD"
          style={{ width: '100%' }}
        />
        <TimePicker
          placeholder="Select start time"
          format="HH:mm"
          style={{ width: '100%' }}
        />

        <DatePicker
          placeholder="Select end date"
          format="YYYY-MM-DD"
          style={{ width: '100%' }}
        />
        <TimePicker
          placeholder="Select end time"
          format="HH:mm"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}
