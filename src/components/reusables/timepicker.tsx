import React, { Component } from 'react'
import dayjs from 'dayjs';
import { TimePicker } from 'antd';
const format = 'HH:mm';

const RTimePicker: React.FC = () => {
    return (
        <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
    )
};

export default RTimePicker;