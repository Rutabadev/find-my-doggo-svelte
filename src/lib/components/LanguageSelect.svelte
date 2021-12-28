<script lang="ts">
	import { locales, locale as usedLocale } from '$lib/i18n';
	import Icon from '$lib/utils/icon.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		usedLocale.set(localStorage.lang || navigator.language.substring(0, 2));
	});

	let dropdown: HTMLElement;
	let button: HTMLElement;
	let items: HTMLElement;
	let menuShown = false;
	let selectedItem: HTMLElement | undefined;

	function toggleMenuShown() {
		menuShown = !menuShown;
		if (menuShown) {
			window.addEventListener('click', clickOutsideHandler);
			window.addEventListener('keydown', keydownHandler);
		} else {
			window.removeEventListener('click', clickOutsideHandler);
			window.removeEventListener('keydown', keydownHandler);
			selectedItem = undefined;
		}
	}

	function clickOutsideHandler({ target }: MouseEvent) {
		if (!dropdown.contains(target as Node)) toggleMenuShown();
	}

	function keydownHandler({ code }) {
		switch (code) {
			case 'ArrowDown':
				!selectedItem
					? (selectedItem = items.firstElementChild as HTMLElement)
					: (selectedItem = (selectedItem.nextElementSibling as HTMLElement) || selectedItem);
				selectedItem.focus();
				break;
			case 'ArrowUp':
				!selectedItem
					? (selectedItem = items.lastElementChild as HTMLElement)
					: (selectedItem = (selectedItem.previousElementSibling as HTMLElement) || selectedItem);
				selectedItem.focus();
				break;
			case 'Space':
				selectedItem?.click();
				break;
			case 'Escape':
				toggleMenuShown();
				button.focus();
				break;
		}
	}

	function scaleY(node, { duration = 150, start = 0 }) {
		return {
			duration,
			css: (t) => `opacity: ${t}; transform: scaleY(${start + (1 - start) * t})`,
		};
	}

	function changeLang(lang) {
		usedLocale.set(lang);
		localStorage.lang = lang;
		toggleMenuShown();
	}

	function resetLang() {
		const wantToReset = confirm('Do you want to reset the language to your system preference ?');
		if (wantToReset) {
			localStorage.removeItem('lang');
			usedLocale.set(navigator.language.substring(0, 2));
		}
	}
</script>

<div class={`relative ${$$props.class}`} bind:this={dropdown}>
	<button
		bind:this={button}
		on:contextmenu|preventDefault={resetLang}
		class={` flex items-center rounded-md py-2 px-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 shadow`}
		on:click={toggleMenuShown}
	>
		<span>{$usedLocale}</span>
		<Icon name="chevron-down" class="ml-2 -mr-1 h-5 w-5" />
	</button>
	{#if menuShown}
		<ul
			bind:this={items}
			transition:scaleY={{ duration: 100, start: 0.7 }}
			class="origin-top absolute inset-x-0 rounded-md border border-gray-300 dark:border-gray-600 mt-2 py-1 bg-white dark:bg-gray-700 shadow-lg"
		>
			{#each $locales.filter((locale) => locale !== $usedLocale) as avalaibleLocale}
				<a
					href="/"
					on:click={() => changeLang(avalaibleLocale)}
					class=" block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 cursor-pointer"
					>{avalaibleLocale}</a
				>
			{/each}
		</ul>
	{/if}
</div>
