<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { darkMode } from '$lib/stores';
</script>

<div class:dark={$darkMode}>
	<div
		class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50"
	>
		<Header />

		<main class="mx-auto p-6 flex-grow max-w-xl">
			<slot />
		</main>
	</div>
</div>
