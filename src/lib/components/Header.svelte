<script lang="ts">
	import DarkThemeToggle from '$lib/components/DarkThemeToggle.svelte';
	import Dropdown from '$lib/utils/Dropdown.svelte';
	import Icon from '$lib/utils/icon.svelte';
	import LanguageSelect from './LanguageSelect.svelte';
</script>

<header
	class="h-16 shadow-lg shadow-primary-400 dark:shadow-primary-900 bg-primary-600 text-gray-50 grid grid-cols-3"
>
	<div class="flex items-center gap-4">
		<button class="p-4 h-full hover:bg-primary-700 lg:hidden">
			<Icon name="burger" class="h-8" />
		</button>
		<LanguageSelect class="ml-4 max-lg:hidden" />
		<DarkThemeToggle class="max-lg:hidden" />
	</div>
	<div class="flex items-center justify-center">
		<a
			href="/"
			class="h-full px-4 text-xl md:text-3xl whitespace-nowrap hover:bg-primary-700 flex items-center"
		>
			<Icon name="search" class="hidden lg:block mr-2 h-10" />
			Find My Doggo
		</a>
	</div>
</header>
