<script lang="ts" context="module">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { loadTranslations, t } from '$lib/i18n';
	import { browser } from '$app/env';

	export const load = async (context) => {
		const locale = (browser && (localStorage.lang || navigator.language.substring(0, 2))) || 'en';

		await loadTranslations(locale, context?.page?.path);

		return {};
	};
</script>

<div
	class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
>
	<Header />

	<main class="mx-auto p-6 flex-grow max-w-xl">
		<slot />
		<p>{$t('index.frik')}</p>
	</main>
</div>
