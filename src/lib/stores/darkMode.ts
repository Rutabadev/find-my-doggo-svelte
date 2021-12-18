import { type Writable, writable } from 'svelte/store';

type DarkModeStore = Partial<Writable<boolean>> & {
	toggle: () => void;
	reset: () => void;
};

export function createDarkMode(): DarkModeStore {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		set,
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
