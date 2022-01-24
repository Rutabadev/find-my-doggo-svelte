import axios from 'axios';
import aspida from '@aspida/axios';
import apiConstructor from '$lib/api/$api';

const axiosConfig = { timeout: 3000, baseURL: 'https://find-my-doggo-api.herokuapp.com/' };

export const api = apiConstructor(aspida(axios, axiosConfig));
