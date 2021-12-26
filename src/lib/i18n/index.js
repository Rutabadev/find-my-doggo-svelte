import i18n from 'sveltekit-i18n';

export const config = {
	loaders: [
		{
			locale: 'en',
			key: 'index',
			loader: async () => (await import('./en/index.json')).default,
		},
		{
			locale: 'en',
			key: 'login',
			routes: ['/login'],
			loader: async () => (await import('./en/login.json')).default,
		},
		{
			locale: 'fr',
			key: 'index',
			loader: async () => (await import('./fr/index.json')).default,
		},
		{
			locale: 'fr',
			key: 'login',
			routes: ['/login'],
			loader: async () => (await import('./fr/login.json')).default,
		},
	],
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(config);
