import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Reemplaza esto con la URL de tu API
    headers: {
        'Authorization': 'Bearer Fuc3nRnbhPXFUROzJVAWoAupIzjCSIMr6LNNfEMAe5d95513',
    },
});

export default instance;
