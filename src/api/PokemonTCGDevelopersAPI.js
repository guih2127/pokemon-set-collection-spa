import axios from "axios";

export default axios.create({
    baseURL: "https://api.pokemontcg.io/v2",
    headers: {
        "Content-type": "application/json"
    }
});