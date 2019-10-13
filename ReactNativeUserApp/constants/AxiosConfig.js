import axios from 'axios';
export const baseUrl = 'http://shoptml.ml';
export const foodRecommedApi = axios.create ({
  baseURL: baseUrl,
  timeout: 10000,
});
