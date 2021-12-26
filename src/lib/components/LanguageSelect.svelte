<script>
	import { locales, locale } from '$lib/i18n';
	import Icon from '$lib/utils/icon.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		locale.set(localStorage.lang || navigator.language.substring(0, 2));
	});

	let menuShown = false;

	function scaleY(node, { duration = 150, start = 0 }) {
		return {
			duration,
			css: (t) => `opacity: ${t}; transform: scaleY(${start + (1 - start) * t})`,
		};
	}

	function changeLang(lang) {
		locale.set(lang);
		menuShown = false;
		localStorage.lang = lang;
	}

	function resetLang() {
		const wantToReset = confirm('Do you want to reset the language to your system preference ?');
		if (wantToReset) {
			localStorage.removeItem('lang');
			locale.set(navigator.language.substring(0, 2));
		}
	}
</script>

<div class={`relative ${$$props.class}`}>
	<button
		on:contextmenu|preventDefault={resetLang}
		class={` flex items-center rounded-md py-2 px-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 shadow`}
		on:click={() => (menuShown = !menuShown)}
	>
		<span>{$locale}</span>
		<Icon name="chevron-down" class="ml-2 -mr-1 h-5 w-5" />
	</button>
	{#if menuShown}
		<ul
			transition:scaleY={{ duration: 100, start: 0.7 }}
			class="origin-top absolute inset-x-0 rounded-md border border-gray-300 dark:border-gray-700 mt-2 py-1 bg-white dark:bg-gray-800 shadow-lg "
		>
			{#each $locales as currentLocale}
				<a
					href="/"
					on:click={() => changeLang(currentLocale)}
					class=" block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 cursor-pointer"
					>{currentLocale}</a
				>
			{/each}
		</ul>
	{/if}
</div>
