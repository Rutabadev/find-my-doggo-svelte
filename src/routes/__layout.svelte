<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { darkMode } from '$lib/stores';
</script>

<div class:dark={$darkMode}>
	<div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
		<Header />

		<main class="flex-grow">
			<slot />
		</main>
	</div>
</div>
