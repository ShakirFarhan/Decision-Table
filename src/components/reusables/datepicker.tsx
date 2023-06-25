import React, { Component } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

const RDatePicker: React.FC = () => (
  <Space direction="vertical">
    <DatePicker className="w-full" />
  </Space>
);

export default RDatePicker;
