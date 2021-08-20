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
    config.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJyb2xlIjoiVXN1w6FyaW8iLCJuYmYiOjE2Mjk0NjUzMzQsImV4cCI6MTYyOTQ3MjUzNCwiaWF0IjoxNjI5NDY1MzM0fQ.lHqtDyW29ernVfeU6ZEF7McDN5IIPyczlnzlYSfUU50'

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