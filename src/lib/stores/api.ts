import axios from 'axios';
import aspida from '@aspida/axios';
import apiConstructor from '$lib/api/$api';
import { type Writable, writable } from 'svelte/store';
import { user } from '$lib/stores';

const axiosConfig = {
	timeout: 3000,
	baseURL: 'https://find-my-doggo-api.herokuapp.com/',
	headers: undefined,
};

const api = apiConstructor(aspida(axios, axiosConfig));

type ApiStore = Writable<typeof api> & {
	setBearerToken: (token: string) => void;
	logout: () => void;
};

export function createApi(): ApiStore {
	const writableStore = writable(api);
	const { set } = writableStore;

	return {
		...writableStore,
		setBearerToken: (token) => {
			axiosConfig.headers = { Authorization: `Bearer ${token}` };
			set(apiConstructor(aspida(axios, axiosConfig)));
		},
		logout: () => {
			axiosConfig.headers = undefined;
			set(apiConstructor(aspida(axios, axiosConfig)));
			user.set(undefined);
		},
	};
}
