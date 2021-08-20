import { List, Space } from 'antd';
import React, { useState } from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

const CardListComponent = ({ cards, onCardClick, type }) => {
    const [numberOfCardsByPage, setnumberOfCardsByPage] = useState(5);

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const ListMessage = () => {
        if (type === 'NAO_OBTIDOS') {
            return 'Pokémons não capturados'
        }

        return 'Pokémons capturados';
    }

    const ListIcon = () => {
        if (type === 'NAO_OBTIDOS') {
            return PlusCircleOutlined;
        }

        return DeleteOutlined;
    }

    const IconMessage = () => {
        if (type === 'NAO_OBTIDOS') {
            return 'Adicionar à coleção';
        }

        return 'Remover da coleção';
    }

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onShowSizeChange: (current, pageSize) => setnumberOfCardsByPage(pageSize),
                pageSize: numberOfCardsByPage,
                pageSizeOptions: [5, 10, 15, 20, 25, 50]
            }}
            dataSource={cards}
            footer={
                <div>
                    <b>{cards.length}</b> {ListMessage()}
                </div>
            }
            renderItem={card => (
                <List.Item
                    key={card.id}
                    actions={[
                        <IconText icon={ListIcon()} text={IconMessage()} key="list-vertical-star-o" />
                    ]}
                    extra={
                        <img
                            width={100}
                            alt="logo"
                            src={card.images.small}
                        />
                    }
                >
                    <List.Item.Meta
                        title={<a href={card.id}>{card.name}</a>}
                        description={card.name}
                    />
                    {card.name}
                </List.Item>
            )}
        />
    );
};

export default CardListComponent;