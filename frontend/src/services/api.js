import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const uploadData = (data) => api.post('/upload', data);
export const getEwasteData = () => api.get('/data');
export const getMapData = () => api.get('/map-data');
export const predictEwaste = (data) => api.post('/predict', data);
export const getPredictions = () => api.get('/predictions');

export default api;
