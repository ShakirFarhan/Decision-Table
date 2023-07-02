import { Input } from "antd"
import { inputFieldProps } from "../../constants/interfaces"

const RInputField: React.FC<inputFieldProps> = ({
    editingValue,
    handleChange
}) => {
    return (
        <Input
            style={{
                backgroundColor: 'var(--primary-bg)',
                borderColor: 'var(--primary-border)',
                color: 'var(--primary-color)',
            }}
            className="px-[10px] py-[4px] border-[1.7px]"
            placeholder={editingValue || 'Enter'}
            value={editingValue}
            onChange={handleChange}
        />
    )
}

export default RInputField;