import { writable } from 'svelte/store';
import type { User } from './api/@types';
import { createDarkMode } from './stores/darkMode';
import { createApi } from './stores/api';

export const darkMode = createDarkMode();

export const api = createApi();

export const isSidebarOpened = writable(false);

export const user = writable<User>();
