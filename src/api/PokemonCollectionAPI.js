import axios from "axios";

const pokemonCollectionAPI = axios.create({
    baseURL: "https://localhost:44357",
    headers: {
        "Content-type": "application/json"
    }
});

pokemonCollectionAPI.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    // config.headers.authorization = `Bearer ${token}`;
    config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJyb2xlIjoiVXN1w6FyaW8iLCJuYmYiOjE2Mjk0MzM3MDQsImV4cCI6MTYyOTQ0MDkwNCwiaWF0IjoxNjI5NDMzNzA0fQ.sB59VbdtkrckVugIhwuiEQIt71gIWraTIX2I3nTRjys'

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