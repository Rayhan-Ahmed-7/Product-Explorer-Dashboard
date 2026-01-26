import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptors can be added here if needed
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here
        return Promise.reject(error)
    }
)
