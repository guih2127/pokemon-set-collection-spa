import { Input } from 'antd';

const InputComponent = ({ label, setValue, value, Icon }) => {
    return (
        <Input
            placeholder={label} 
            suffix={<Icon className="site-form-item-icon" />}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    );
};

export default InputComponent;