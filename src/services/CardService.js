import PokemonTcgDevelopersAPI from "../api/PokemonTCGDevelopersAPI";

const getCards = async (query) => {
    return await PokemonTcgDevelopersAPI.get("/cards", {
        params: {q: query}
    });
};

const CardService = {
    getCards
};

export default CardService;