/*
 * @Author: Kamruzzaman
 * @Date: 2022-11-02 00:19:45
 * @Last Modified by:   Kamruzzaman
 * @Last Modified time: 2022-11-02 00:19:45
 */
// plugins/axios.js
import axios from 'axios';
const BASE_URL = 'https://api.kzaman.me/api';
//set default value on axios
const httpRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

httpRequest.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : false;
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

httpRequest.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return Promise.resolve(response);
        }
        return Promise.reject(response);
    },
    error => {
        const errorCode = {
            400: 'Bad Request',
            401: 'Unauthorized',
            403: 'Access Forbidden',
            404: 'URL Not Found',
            405: 'Method Not Allowed',
            500: 'Internal Server Error',
            502: 'Bad Gateway',
        };
        alert(errorCode[error?.response?.status]);
        return Promise.reject(error.response);
    },
);

export default httpRequest;
