<script lang="ts" context="module">
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Signature from '$lib/components/Signature.svelte';
	import '$lib/i18n';
	import Dropdown from '$lib/utils/Dropdown.svelte';
	import { onMount } from 'svelte';
	import { init, locale, waitLocale } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
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

<script lang="ts">
	let langLoading = true;

	onMount(() => {
		localStorage.lang && locale.set(localStorage.lang);
		langLoading = false;
	});
</script>

<div
	class="flex min-h-screen flex-col bg-gray-100 text-gray-900 transition-colors dark:bg-gray-800 dark:text-gray-300"
>
	{#if langLoading}
		<div transition:fade={{ duration: 700 }} class="fixed inset-0 z-10 backdrop-blur-sm" />
	{/if}

	<Sidebar />

	<Header />
	<main class="mx-auto w-full max-w-4xl p-5">
		<slot />
	</main>
	<div class="grid grow place-content-end">
		<Signature class="w-52 p-8" />
	</div>
</div>
