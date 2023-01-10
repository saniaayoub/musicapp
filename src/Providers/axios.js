import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://energy4living.com.au/admin/api/',
});

export default instance;
