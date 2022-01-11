<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('index.title')}</title>
</svelte:head>

<div class="text-center">
	<p class="text-xl">{$_('index.welcome')} <span class="italic">{$_('index.spoiler')}</span></p>
	<p class="h-48">Place doggo here</p>
	<button class="btn-accent">{$_('index.find')}</button>
	<a href="/" class="link-brand dark:link-accent">Hello i am Link</a>
</div>
