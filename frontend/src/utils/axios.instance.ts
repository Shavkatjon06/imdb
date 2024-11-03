import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import BASE_URL from './constant.ts'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('imdb_token')
        if (token) {
            const decodedToken = jwtDecode(token)
            const expirationTime = decodedToken.exp * 1000
            if (Date.now() > expirationTime) {
                localStorage.removeItem('imdb_token')
            } else {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
);

export default axiosInstance;
