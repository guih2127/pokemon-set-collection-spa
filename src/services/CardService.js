import PokemonTcgDevelopersAPI from "../api/PokemonTCGDevelopersAPI";
import pokemonCollectionAPI from "../api/PokemonCollectionAPI";

const getCards = async (query) => {
    return await PokemonTcgDevelopersAPI.get("/cards", {
        params: {q: query}
    });
};

const getUserCards = async () => {
    return await pokemonCollectionAPI.get("/cards");
};

const PostUserCard = async (externalId) => {
    return await pokemonCollectionAPI.post(`cards/${externalId}`);
}

const DeleteUserCard = async (externalId) => {
    return await pokemonCollectionAPI.delete(`cards/${externalId}`);
}

const CardService = {
    getCards,
    getUserCards,
    PostUserCard,
    DeleteUserCard
};

export default CardService;