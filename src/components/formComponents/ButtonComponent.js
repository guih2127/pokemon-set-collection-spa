import { Button } from 'antd';

const ButtonComponent = ({ type, label, onClick }) => {
    return (
        <Button type={type} onClick={onClick}>
            {label}
        </Button>
    );
};

export default ButtonComponent;