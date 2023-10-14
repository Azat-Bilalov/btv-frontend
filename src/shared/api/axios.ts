import axios from 'axios';

export const BASE_URL = 'https://btv-api.cry1s.ru';

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});
