import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd'

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const RDatePicker: React.FC = () => (
  <Space direction="vertical" size="large">
    <DatePicker onChange={onChange} />
  </Space>
);

export default RDatePicker;