import { Space, Spin } from "antd";

const Spinner = ({ style }) => {
    return (
        <div style={style}>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    );
};

export default Spinner;