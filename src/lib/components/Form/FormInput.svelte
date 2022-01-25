<script lang="ts">
	import { onMount } from 'svelte';

	export let label = 'default label';
	export let name = 'default-name';
	export let placeholder = 'default placeholder';
	export let type = 'text';
	export let autocomplete = '';
	export let value = '';
	export let required = false;

	let input: HTMLInputElement;

	onMount(() => {
		input.type = type;
	});
</script>

<div class="relative">
	<input
		bind:this={input}
		id={name}
		class="peer block w-full rounded border-2 border-gray-300 p-2 placeholder-transparent shadow-inner focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:border-gray-800 dark:bg-gray-600 dark:focus:border-accent-700 dark:focus:ring-accent-400"
		{placeholder}
		{autocomplete}
		bind:value
	/>
	<label
		for={name}
		class="pointer-events-none absolute inset-0 origin-left -translate-y-7 scale-90 truncate text-gray-400 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:p-2.5 peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:p-0"
		>{label}
		{#if required}
			<span class="text-red-500 dark:text-red-400">*</span>
		{/if}
	</label>
</div>
