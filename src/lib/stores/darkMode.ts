import { type Writable, writable } from 'svelte/store';

type DarkModeStore = Writable<boolean> & {
	toggle: () => void;
	reset: () => void;
};

export function createDarkMode(): DarkModeStore {
	const writableBooleanStore = writable(false);
	const { set, update } = writableBooleanStore;

	return {
		...writableBooleanStore,
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
