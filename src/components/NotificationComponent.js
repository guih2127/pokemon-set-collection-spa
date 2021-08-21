import { notification } from 'antd';

const openNotification = (message, description, Icon, placement) => {
    notification.open({
        message: message,
        description: description,
        icon: <Icon />,
        placement
    });
};

export default openNotification;