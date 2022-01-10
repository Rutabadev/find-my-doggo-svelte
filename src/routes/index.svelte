<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('index.title')}</title>
</svelte:head>

<p class="text-xl">{$_('index.welcome')} <span class="italic">{$_('index.spoiler')}</span></p>
