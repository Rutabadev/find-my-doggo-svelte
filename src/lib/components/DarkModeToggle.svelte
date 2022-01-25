<script lang="ts">
	import { darkMode } from '$lib/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import Icon from '$lib/utils/Icon.svelte';

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
	class="cursor-pointer {$$props.class}"
	on:click={darkMode.toggle}
	on:contextmenu|preventDefault={() => {
		const wantToReset = confirm('Do you want to reset the theme to your system preference ?');
		if (wantToReset) {
			darkMode.reset();
		}
	}}
>
	<div
		class="shadow-inset flex h-7 w-11 items-center rounded-full border-2 border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
	>
		<!-- pusher -->
		<div class="{$darkMode && 'grow'} transition-[grow]" />
		<div
			class="grid aspect-square h-full -rotate-180 place-content-center rounded-full bg-white text-amber-400 shadow dark:bg-gray-600 {$darkMode &&
				'rotate-0'} transition-transform"
		>
			{#if $darkMode}
				<Icon name="moon" class="h-full w-full" />
			{:else}
				<Icon name="sun" class="h-full w-full" />
			{/if}
		</div>
	</div>
</button>
