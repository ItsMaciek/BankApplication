import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.23:5000/api',
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default instance;
