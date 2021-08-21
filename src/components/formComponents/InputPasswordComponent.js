import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const InputPasswordComponent = ({ label, setValue, value }) => {
    return (
        <Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    );
};

export default InputPasswordComponent;