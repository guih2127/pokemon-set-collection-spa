import PokemonTcgDevelopersAPI from "../api/PokemonTCGDevelopersAPI";

const getSets = async () => {
    return await PokemonTcgDevelopersAPI.get("/sets");
};

const SetService = {
    getSets
};

export default SetService;