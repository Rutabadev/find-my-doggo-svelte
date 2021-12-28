<script lang="ts" context="module">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { darkMode } from '$lib/stores';
	import { loadTranslations, t, loading } from '$lib/i18n';

	export const load = async ({ page }) => {
		const { path } = page;

		const locale = 'en'; // get from cookie or user session...
		await loadTranslations(locale, path);

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
		{#if $loading}
			<p>loading</p>
		{/if}
	</main>
</div>
