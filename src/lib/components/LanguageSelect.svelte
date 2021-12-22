<script>
	import Icon from '$lib/utils/icon.svelte';
</script>

<button
	class={`
    ${$$props.class}
    flex items-center
    rounded-md py-2 px-4
    border border-gray-300 dark:border-gray-700
    bg-gray-50 dark:bg-gray-800
    text-sm font-medium text-gray-900 dark:text-gray-50`}
>
	<span>fr</span>
	<Icon name="chevron-down" class="ml-2 -mr-1 h-5 w-5" />
</button>
