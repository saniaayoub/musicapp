import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://designprosusa.com/energy_healer/api/',
});

export default instance;
