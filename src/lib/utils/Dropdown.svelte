<script lang="ts">
	import { browser } from '$app/env';
	import { _ } from 'svelte-i18n';
	import Icon from './Icon.svelte';

	export let items: { content: string; click?: () => any }[] = [
		{ content: 'item 1' },
		{ content: 'item 2' },
		{ content: 'item 3' },
	];

	let dropdownElement: HTMLElement;
	let itemsElement: HTMLElement;
	let selectedItemElement: HTMLElement | undefined;
	let menuShown = false;
	$: if (browser) {
		// Run only client side to access window
		if (menuShown) {
			window.addEventListener('click', clickOutsideHandler);
			window.addEventListener('keydown', keydownHandler);
		} else {
			window.removeEventListener('click', clickOutsideHandler);
			window.removeEventListener('keydown', keydownHandler);
			selectedItemElement = undefined;
		}
	}

	function selectElement(position: 'next' | 'previous') {
		const [firstItem, nextItem] =
			position === 'next'
				? ['firstElementChild', 'nextElementSibling']
				: ['lastElementChild', 'previousElementSibling'];
		selectedItemElement = !selectedItemElement
			? itemsElement[firstItem]
			: selectedItemElement[nextItem] || itemsElement[firstItem];

		selectedItemElement.focus();
	}

	function clickOutsideHandler({ target }: MouseEvent) {
		if (!dropdownElement.contains(target as Node)) menuShown = false;
	}

	function searchItem(key: string, startSearchAt = 0) {
		const itemsList = Array.from(itemsElement.children);
		return (itemsList
			.slice(startSearchAt, itemsList.length)
			.find(({ textContent }) => textContent.startsWith(key)) ||
			itemsList
				.slice(0, itemsList.length)
				.find(({ textContent }) => textContent.startsWith(key))) as HTMLElement;
	}

	function keydownHandler(e) {
		const { code, shiftKey, key } = e;
		switch (code) {
			case 'ArrowDown':
				selectElement('next');
				break;
			case 'ArrowUp':
				selectElement('previous');
				break;
			case 'Space':
				selectedItemElement?.click();
				break;
			case 'Escape':
				menuShown = false;
				dropdownElement.focus();
				break;
			case 'Tab':
				e.preventDefault();
				selectElement(shiftKey ? 'previous' : 'next');
				break;
			default:
				let itemFound = searchItem(
					key,
					Array.from(itemsElement.children).indexOf(selectedItemElement) + 1
				);

				if (!itemFound) {
					return;
				}

				selectedItemElement = itemFound;
				selectedItemElement.focus();
		}
	}

	function scaleY(node, { duration = 150, start = 0 }) {
		return {
			duration,
			css: (t: number) => `opacity: ${t}; transform: scaleY(${start + (1 - start) * t})`,
		};
	}
</script>

<button
	bind:this={dropdownElement}
	class="
		{$$props.class}
		relative inline-flex items-center rounded-md py-2 px-4 border border-gray-300 dark:border-gray-700
		{!$$props.class.split(' ').some((name) => name.match(/^(.+:)?bg-\w+-\d+$/)) &&
		'bg-gray-50 dark:bg-gray-800'}
		text-sm font-medium shadow
		{!$$props.class.split(' ').some((name) => name.match(/^(.+:)?text-\w+-\d+$/)) &&
		'text-gray-700 dark:text-gray-100'}
		"
	on:click={() => (menuShown = !menuShown)}
	on:contextmenu
>
	<slot>dropdown value</slot>
	<Icon name="chevron-down" class="ml-2 -mr-1 h-5 w-5" />
	{#if menuShown}
		<ul
			bind:this={itemsElement}
			transition:scaleY={{ duration: 100, start: 0.7 }}
			class="origin-top absolute top-full mt-2 inset-x-0 rounded-md border border-gray-300 dark:border-gray-600 py-1 bg-white dark:bg-gray-700 shadow-lg"
		>
			{#each items as item}
				<button
					on:click={() => {
						item.click?.();
						menuShown = false;
					}}
					class="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-600 dark:focus:bg-gray-600 cursor-pointer outline-none"
					>{item.content}
				</button>
			{/each}
		</ul>
	{/if}
</button>
