import { writable } from 'svelte/store';
import { createDarkMode } from './stores/darkMode';
export const darkMode = createDarkMode();

export const isSidebarOpened = writable(false);
