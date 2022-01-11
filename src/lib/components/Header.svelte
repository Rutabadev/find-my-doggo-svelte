<script lang="ts">
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import Icon from '$lib/utils/Icon.svelte';
	import LanguageSelect from './LanguageSelect.svelte';
</script>

<header
	class="h-16 shadow-lg shadow-brand-400 dark:shadow-brand-900 bg-brand-600 text-gray-50 grid grid-cols-3"
>
	<div class="flex items-center gap-4">
		<button class="p-4 h-full hover:bg-brand-700 lg:hidden">
			<Icon name="burger" class="h-8" />
		</button>
		<LanguageSelect class="ml-4 max-lg:hidden" />
		<DarkModeToggle class="max-lg:hidden" />
	</div>
	<div class="flex items-center justify-center">
		<a
			href="/"
			class="h-full px-4 text-xl md:text-3xl whitespace-nowrap hover:bg-brand-700 flex items-center"
		>
			<Icon name="search" class="hidden lg:block mr-2 h-10" />
			Find My Doggo
		</a>
	</div>
</header>
