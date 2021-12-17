import { writable } from 'svelte/store';

export function createDarkMode() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		set: (mode) => {
			localStorage.dark = mode;
			set(mode);
		},
		toggle: () => {
			update((mode) => {
				localStorage.dark = !mode;
				return !mode;
			});
		},
		reset: () => {
			localStorage.removeItem('dark');
			set(window.matchMedia('(prefers-color-scheme: dark)').matches);
		},
	};
}
