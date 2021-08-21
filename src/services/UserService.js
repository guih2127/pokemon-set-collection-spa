import pokemonCollectionAPI from "../api/PokemonCollectionAPI";

const Login = async (body) => {
    return await pokemonCollectionAPI.post(`login`, body);
}

const UserService = {
    Login
};

export default UserService;