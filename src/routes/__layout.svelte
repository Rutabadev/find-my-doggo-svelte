<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	let darkMode = true;
</script>

<div class={darkMode && 'dark'}>
	<div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
		<Header />

		<main class="flex-grow">
			<button class="dark:text-white" on:click={() => (darkMode = !darkMode)}
				>Toggle dark mode</button
			>
			<p>dark mode : {darkMode}</p>
			<slot />
		</main>
	</div>
</div>
