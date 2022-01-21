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
	class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors"
>
	{#if langLoading}
		<div transition:fade={{ duration: 700 }} class="z-10 fixed inset-0 backdrop-blur-sm" />
	{/if}

	<Sidebar />

	<Header />
	<main class="mx-auto w-full max-w-4xl p-5">
		<slot />
	</main>
	<div class="grow grid place-content-end">
		<Signature class="p-8 w-52" />
	</div>
</div>
