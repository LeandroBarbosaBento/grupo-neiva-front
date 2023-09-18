import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
  headers: {
      Accept: 'application/json',
    },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (config.headers === undefined) {
    config.headers = { Authorization: `Bearer ${token}` };
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


 api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response.status === 401) {
      router.push('/login');
    } else {
      console.log(error.reponse);
    }

    return Promise.reject(error);
  }
);

export default api;
