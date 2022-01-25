<script lang="ts">
	import { isSidebarOpened, user, api } from '$lib/stores';
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import Icon from '$lib/utils/Icon.svelte';
	import LanguageSelect from './LanguageSelect.svelte';
	import { _ } from 'svelte-i18n';

	let openSidebarButton;
	isSidebarOpened.subscribe((opened) => {
		!opened && openSidebarButton?.focus();
	});
</script>

<header
	class="grid h-16 grid-cols-3 bg-brand-600 text-gray-50 shadow-lg shadow-brand-400 dark:shadow-brand-900"
>
	<div class="flex items-center gap-4">
		<button
			bind:this={openSidebarButton}
			class="h-full p-4 hover:bg-brand-700 focus:bg-brand-700 lg:hidden"
			on:click={() => {
				isSidebarOpened.set(true);
			}}
		>
			<Icon name="burger" class="h-8 drop-shadow" />
		</button>
		<LanguageSelect class="ml-4 max-lg:hidden" />
		<DarkModeToggle class="h-full px-4 max-lg:hidden" />
	</div>
	<div class="flex items-center justify-center">
		<a
			href="/"
			class="flex h-full items-center whitespace-nowrap px-4 text-xl hover:bg-brand-700 sm:text-3xl"
		>
			<Icon name="search" class="mr-2 hidden h-10 lg:block" />
			Find My Doggo
		</a>
	</div>
	<div class="flex justify-end">
		{#if !$user}
			<a href="/login" class="hidden items-center px-4 uppercase hover:bg-brand-700 lg:flex"
				>{$_('login.title')}</a
			>
		{:else}
			<button class="px-4 max-lg:hidden hover:bg-brand-700" on:click={() => api.logout()}
				>test</button
			>
		{/if}
	</div>
</header>
