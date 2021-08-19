import { useState, useEffect } from "react";
import SelectComponent from "../components/SelectComponent";
import SetService from "../services/SetService";

const CollectionPage = () => {
    const [sets, setSets] = useState([]);
    const [selectedSet, setSelectedSet] = useState(null);

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

    useEffect(() => {
        retrieveSets();
    }, []);

    useEffect(() => {
        console.log(selectedSet);
    }, [selectedSet]);
    
    return (
        <SelectComponent
            setSelectedOption={setSelectedSet}
            selectedOption={selectedSet}
            options={sets}
            label={"Selecione uma coleção"}
        />
    );
};

export default CollectionPage;