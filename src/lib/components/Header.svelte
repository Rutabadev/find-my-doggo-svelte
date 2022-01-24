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
	class="h-16 shadow-lg shadow-brand-400 dark:shadow-brand-900 bg-brand-600 text-gray-50 grid grid-cols-3"
>
	<div class="flex items-center gap-4">
		<button
			bind:this={openSidebarButton}
			class="lg:hidden p-4 h-full hover:bg-brand-700 focus:bg-brand-700"
			on:click={() => {
				isSidebarOpened.set(true);
			}}
		>
			<Icon name="burger" class="h-8 drop-shadow" />
		</button>
		<LanguageSelect class="ml-4 max-lg:hidden" />
		<DarkModeToggle class="max-lg:hidden h-full px-4" />
	</div>
	<div class="flex items-center justify-center">
		<a
			href="/"
			class="h-full px-4 text-xl sm:text-3xl whitespace-nowrap hover:bg-brand-700 flex items-center"
		>
			<Icon name="search" class="hidden lg:block mr-2 h-10" />
			Find My Doggo
		</a>
	</div>
	<div class="flex justify-end">
		{#if !$user}
			<a href="/login" class="hidden lg:flex px-4 hover:bg-brand-700 items-center uppercase"
				>{$_('login.title')}</a
			>
		{:else}
			<button class="px-4 max-lg:hidden hover:bg-brand-700" on:click={() => api.logout()}
				>test</button
			>
		{/if}
	</div>
</header>
