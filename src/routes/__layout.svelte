<script lang="ts" context="module">
	import Header from '$lib/components/Header.svelte';
	import '$lib/i18n';
	import { init, waitLocale, _ } from 'svelte-i18n';
	import '../app.css';

	export const load = async (context) => {
		init({
			fallbackLocale: 'en',
			initialLocale: context.session.lang || 'en',
		});

		await waitLocale();

		return {};
	};
</script>

<div
	class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors"
>
	<Header />

	<main class="mx-auto p-5 flex-grow max-w-3xl">
		<slot />
	</main>
</div>
