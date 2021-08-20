import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useState, useEffect } from "react";
import CardListComponent from "../components/CardListComponent";
import SelectComponent from "../components/SelectComponent";
import CardService from "../services/CardService";
import SetService from "../services/SetService";

const CollectionPage = () => {
    const [sets, setSets] = useState([]);
    const [selectedSet, setSelectedSet] = useState(null);

    const [cards, setCards] = useState([]);

    const retrieveSets = async () => {
        await SetService.getSets()
            .then(response => {
                setSets(response.data.data);
                setSelectedSet(response.data.data[0]);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const retrieveCards = async () => {
        await CardService.getCards(createQuery())
            .then(response => {
                setCards(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const createQuery = () => {
        return `(set.id:${selectedSet.id})`
    };

    useEffect(() => {
        retrieveSets();
    }, []);

    useEffect(() => {
        if (selectedSet)
            retrieveCards();
    }, [selectedSet]);

    return (
        <Content style={{ padding: '2vh' }}>
            <Row style={{margin: '1vh'}}>
                <SelectComponent
                    setSelectedOption={setSelectedSet}
                    selectedOption={selectedSet}
                    options={sets}
                    label={"Selecione uma coleção"}
                />
            </Row>
            <Row style={{margin: '1vh'}}>
                <Col span={8}>
                    <CardListComponent 
                        cards={cards}
                        type="NAO_OBTIDOS" 
                    />
                </Col>
                <Col span={8}>
                    <CardListComponent 
                        cards={cards}
                        type="OBTIDOS" 
                    />
                </Col>
                <Col span={8}>COLUNA 3</Col>
            </Row>
        </Content>
    );
};

export default CollectionPage;