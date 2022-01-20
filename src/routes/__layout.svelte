<script lang="ts" context="module">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Signature from '$lib/components/Signature.svelte';
	import '$lib/i18n';
	import { init, locale, waitLocale, _ } from 'svelte-i18n';
	import { browser } from '$app/env';

	let langLoading = true;

	export const load = async (context) => {
		init({
			fallbackLocale: 'en',
			initialLocale: context.session.lang || 'en',
		});

		await waitLocale();

		if (browser) {
			localStorage.lang && locale.set(localStorage.lang);
			langLoading = false;
		}

		return {};
	};
</script>

<div
	class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors {langLoading &&
		'blur-sm'}"
>
	<Sidebar />

	<Header />
	<main class="mx-auto w-full max-w-4xl p-5">
		<slot />
	</main>
	<div class="flex-grow grid place-content-end">
		<Signature class="p-8 w-52" />
	</div>
</div>
