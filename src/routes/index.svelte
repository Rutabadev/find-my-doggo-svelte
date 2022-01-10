<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Find My Doggo Svelte</title>
</svelte:head>

<p>{$_('index.welcome')}</p>
