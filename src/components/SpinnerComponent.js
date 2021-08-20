import { Space, Spin } from "antd";

const Spinner = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    );
};

export default Spinner;