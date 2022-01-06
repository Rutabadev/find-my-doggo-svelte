<script lang="ts">
	import { darkMode } from '$lib/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import Icon from '$lib/utils/icon.svelte';

	$: if (browser) document.documentElement.classList[$darkMode ? 'add' : 'remove']('dark');

	onMount(() => {
		const startingDarkMode =
			localStorage.dark === 'true' ||
			(!('dark' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		darkMode.set(startingDarkMode);
	});
</script>

<!-- adds dark class (if needed) before body load to prevent flicker -->
<svelte:head>
	<script>
		if (document) {
			if (
				localStorage.dark === 'true' ||
				(!('dark' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
			}
		}
	</script>
</svelte:head>

<button 
	class="h-full px-4 cursor-pointer {$$props.class}"
	on:click={darkMode.toggle}
	on:contextmenu|preventDefault={() => {
		const wantToReset = confirm('Do you want to reset the theme to your system preference ?');
		if (wantToReset) {
			darkMode.reset();
		}
	}}
>
	<div
		class="w-10 h-6 ring-2 rounded-full ring-gray-300 dark:ring-gray-700 bg-gray-100 dark:bg-gray-800 shadow-inset flex items-center"
	>
		<div class="w-6 aspect-square rounded-full bg-white dark:bg-gray-600 shadow text-amber-400 grid place-content-center -rotate-180 {$darkMode && 'translate-x-4 -rotate-0'} transition-transform">
			{#if $darkMode}
				<Icon name="moon" class="h-6 w-6" />
			{:else}
				<Icon name="sun" class="h-6 w-6" />
			{/if}
		</div>
	<div/>
</button>
