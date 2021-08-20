import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useState, useEffect } from "react";
import CardListComponent from "../components/CardListComponent";
import CollectionStatistcsComponent from "../components/CollectionStatisticsComponent";
import SelectComponent from "../components/SelectComponent";
import CardService from "../services/CardService";
import SetService from "../services/SetService";

const CollectionPage = () => {
    const [sets, setSets] = useState([]);
    const [selectedSet, setSelectedSet] = useState(0);
    const [cards, setCards] = useState([]);
    const [obtainedCardsIds, setObtainedCardsIds] = useState([]);
    const [percentage, setPercentage] = useState(0);

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

    const getUserCards = async () => {
        await CardService.getUserCards()
            .then(response => {
                setObtainedCardsIds(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const addCardToCollection = async (externalId) => {
        await CardService.PostUserCard(externalId)
            .then(response => {
                setObtainedCardsIds(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const removeCardFromCollection = async (externalId) => {
        await CardService.DeleteUserCard(externalId)
            .then(response => {
                setObtainedCardsIds(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        retrieveCards();
        retrieveSets();
        getUserCards();
    }, []);

    useEffect(() => {
        if (selectedSet)
            retrieveCards();
    }, [selectedSet]);

    useEffect(() => {
        setPercentage(parseInt(obtainedCardsIds.length * 100 / cards.length));
    }, [obtainedCardsIds])

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
                        cards={cards.filter(card => !obtainedCardsIds.includes(card.id))}
                        type="NAO_OBTIDOS"
                        onCardClick={addCardToCollection}
                    />
                </Col>
                <Col span={8}>
                    <CardListComponent 
                        cards={cards.filter(card => obtainedCardsIds.includes(card.id))}
                        type="OBTIDOS"
                        onCardClick={removeCardFromCollection}
                    />
                </Col>
                <Col span={8}>
                    <CollectionStatistcsComponent
                        percentage={percentage}
                        cardsObtained={cards.filter(card => obtainedCardsIds.includes(card.id)).length}
                        totalCards={cards.length}
                    />
                </Col>
            </Row>
        </Content>
    );
};

export default CollectionPage;