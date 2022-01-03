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
	class={$$props.class}
	on:click={darkMode.toggle}
	on:contextmenu|preventDefault={() => {
		const wantToReset = confirm('Do you want to reset the theme to your system preference ?');
		if (wantToReset) {
			darkMode.reset();
		}
	}}
>
	{#if $darkMode}
		<Icon name="moon" class="h-5 w-5" />
	{:else}
		<Icon name="sun" class="h-5 w-5" />
	{/if}
</button>
