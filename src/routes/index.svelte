<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Dog from '$lib/components/Dog.svelte';
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('index.title')}</title>
</svelte:head>

<div class="text-center">
	<p class="text-xl">{$_('index.welcome')} <span class="italic">{$_('index.spoiler')}</span></p>
	<Dog class="mt-8 mx-auto" />
	<button class="btn-accent">{$_('index.find')}</button>
</div>
