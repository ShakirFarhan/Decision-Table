import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker';

const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
};


const { RangePicker } = DatePicker;

const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
};
const RRangePicker: React.FC = () => (
    <Space direction="vertical" size="large">
        <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
        />
    </Space>
);

export default RRangePicker;