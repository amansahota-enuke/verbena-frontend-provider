import axios from "axios";
import { TokenService } from "./index";

axios.defaults.baseURL =process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
    const innerConfig = config;
    const token = TokenService.getToken();
    if (token) {
        innerConfig.headers.Authorization = `Bearer ${token}`;
    }
    return innerConfig;
});
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            TokenService.deleteToken();
            if (!error.response.config.url.includes("auth")) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

const ApiService = {
    get: async (url, payload) => await axios.get(url, { params: payload }),
    post: async (url, body) => await axios.post(url, body),
    put: async (url, body) => await axios.put(url, body),
    delete: async (url, body) => await axios.delete(url),
};

export default ApiService;
