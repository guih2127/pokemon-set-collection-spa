import axios from "axios";

const pokemonCollectionAPI = axios.create({
    baseURL: "https://localhost:44357",
    headers: {
        "Content-type": "application/json"
    }
});

pokemonCollectionAPI.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.authorization = `Bearer ${token}`;

    return config;
})

pokemonCollectionAPI.interceptors.response.use(
    response => responseSuccessHandler(response),
    error => responseErrorHandler(error)
);

const responseSuccessHandler = response => {
    return response;
};

const responseErrorHandler = error => {
    if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return Promise.reject(error);
}

export default pokemonCollectionAPI;