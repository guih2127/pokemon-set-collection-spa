import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useState, useEffect } from "react";
import CardListComponent from "../components/CardListComponent";
import CollectionStatistcsComponent from "../components/CollectionStatisticsComponent";
import SelectComponent from "../components/formComponents/SelectComponent";
import CardService from "../services/CardService";
import SetService from "../services/SetService";
import exportFromJSON from 'export-from-json'  

const CollectionPage = () => {
    const [sets, setSets] = useState([]);
    const [selectedSet, setSelectedSet] = useState(null);
    const [cards, setCards] = useState([]);
    const [obtainedCardsIds, setObtainedCardsIds] = useState([]);
    const [percentage, setPercentage] = useState(0);

    const [loadingListCards, setloadingListCards] = useState(true);
    const [loadingListCardsObtained, setloadingListCardsObtained] = useState(true);
    const [loadingStatistcs, setloadingStatistcs] = useState(true);
    const [loadingCollectionSelect, setloadingCollectionSelect] = useState(true);

    const fileName = 'Lista de cartas'  
    const exportType = 'xls'

    const retrieveSets = async () => {
        setloadingCollectionSelect(true);

        await SetService.getSets()
            .then(response => {
                setSets(response.data.data);
                setSelectedSet(response.data.data[0]);
                setloadingCollectionSelect(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const retrieveCards = async () => {
        setloadingListCards(true);
        setloadingListCardsObtained(true);
        setloadingStatistcs(true);

        await CardService.getCards(createQuery())
            .then(response => {
                setCards(response.data.data);

                setloadingListCards(false);
                setloadingListCardsObtained(false);
                setloadingStatistcs(false);
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
                setPercentage(calculatePercentage());
            })
            .catch(error => {
                console.log(error);
            });
    }

    const removeCardFromCollection = async (externalId) => {
        await CardService.DeleteUserCard(externalId)
            .then(response => {
                setObtainedCardsIds(response.data);
                setPercentage(calculatePercentage());
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getUserCardsFromCollection = () => {
        return cards.filter(card => obtainedCardsIds.includes(card.id));
    }

    const calculatePercentage = () => {
        return parseInt(getUserCardsFromCollection().length * 100 / cards.length);
    }

    const ExportToExcel = (cards) => {
        const data = cards.map(card => ({
            Number: card.number,
            Name: card.name,
            Rarity: card.rarity
        }));

        exportFromJSON({ data, fileName, exportType });
    }

    useEffect(() => {
        retrieveSets();
        getUserCards();
    }, []);

    useEffect(() => {
        if (selectedSet) {
            retrieveCards();
        }
    }, [selectedSet]);

    useEffect(() => {
        setPercentage(calculatePercentage());
    }, [cards]);

    return (
        <Content style={{ padding: '2vh' }}>
            <Row style={{ margin: '1vh' }}>
                <SelectComponent
                    setSelectedOption={setSelectedSet}
                    selectedOption={selectedSet}
                    options={sets}
                    label={"Selecione uma coleção"}
                    loading={loadingCollectionSelect}
                />
            </Row>
            <Row style={{margin: '1vh'}}>
                <Col span={8}>
                    <CardListComponent 
                        cards={cards.filter(card => !obtainedCardsIds.includes(card.id))}
                        type="NAO_OBTIDOS"
                        onCardClick={addCardToCollection}
                        loading={loadingListCards}
                        exportToXls={ExportToExcel}
                    />
                </Col>
                <Col span={8}>
                    <CardListComponent 
                        cards={cards.filter(card => obtainedCardsIds.includes(card.id))}
                        type="OBTIDOS"
                        onCardClick={removeCardFromCollection}
                        loading={loadingListCardsObtained}
                    />
                </Col>
                <Col span={8}>
                    <CollectionStatistcsComponent
                        percentage={percentage}
                        cardsObtained={cards.filter(card => obtainedCardsIds.includes(card.id)).length}
                        totalCards={cards.length}
                        loading={loadingStatistcs}
                    />
                </Col>
            </Row>
        </Content>
    );
};

export default CollectionPage;