<script lang="ts">
	import { darkMode } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		const startingDarkMode =
			localStorage.dark === 'true' ||
			(!('dark' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
		darkMode.set(startingDarkMode);
	});
</script>

<button
	class={$$props.class}
	on:click={darkMode.toggle}
	on:contextmenu|preventDefault={() => {
		const wantToReset = confirm('Do you want to reset the theme to your system preference ?');
		if (wantToReset) {
			darkMode.reset();
		}
	}}>dark theme toggle</button
>
