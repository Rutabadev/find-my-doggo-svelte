<script lang="ts">
	import Icon from '$lib/icon.svelte';
</script>

<header
	class="shadow-lg shadow-primary-400 dark:shadow-primary-900 bg-primary-600 text-gray-50 grid grid-cols-3"
>
	<div>
		<button class="p-4 h-full hover:bg-primary-700">
			<Icon name="burger" class="h-8" />
		</button>
	</div>
	<div class="flex items-center justify-center">
		<a
			href="/"
			class="h-full px-4 text-xl md:text-3xl whitespace-nowrap hover:bg-primary-700 flex items-center"
		>
			<Icon name="search" class="hidden md:block mr-3 h-10" />
			Find My Doggo
		</a>
	</div>
</header>
