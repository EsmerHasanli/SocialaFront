import axios from 'axios'

export const API_BASE_URL = 'https://localhost:7023/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api