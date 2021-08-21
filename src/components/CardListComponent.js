import { List, Space } from 'antd';
import React, { useState } from 'react';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Spinner from './SpinnerComponent';

const CardListComponent = ({ cards, onCardClick, type, loading }) => {
    const [numberOfCardsByPage, setnumberOfCardsByPage] = useState(5);

    const IconText = ({ icon, text, card }) => (
        <Space
            style={{ cursor: 'pointer' }}
            onClick={() => onCardClick(card.id)}
        >
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

    if (!loading) {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSizeOptions: [5, 10, 15, 20, 25, 50],
                    pageSize: numberOfCardsByPage,
                    onShowSizeChange: (page, pageSize) => setnumberOfCardsByPage(pageSize)
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
                            <IconText
                                icon={ListIcon()}
                                text={IconMessage()}
                                card={card}
                                key="list-vertical-star-o"
                            />
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
                            description={card.rarity}
                        />
                    </List.Item>
                )}
            />
        );
    }

    return <Spinner />
};

export default CardListComponent;