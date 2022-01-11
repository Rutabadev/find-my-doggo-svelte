<script lang="ts">
	import { browser } from '$app/env';
	import Icon from './Icon.svelte';

	export let items: { content: string; click?: () => any }[] = [
		{ content: 'item 1' },
		{ content: 'item 2' },
		{ content: 'item 3' },
	];

	let dropdownElement: HTMLElement;
	let buttonElement: HTMLElement;
	let itemsElement: HTMLElement;
	let selectedItemElement: HTMLElement | undefined;
	let menuShown = false;
	$: if (browser) {
		// run only client side to access window
		if (menuShown) {
			window.addEventListener('click', clickOutsideHandler);
			window.addEventListener('keydown', keydownHandler);
		} else {
			window.removeEventListener('click', clickOutsideHandler);
			window.removeEventListener('keydown', keydownHandler);
			selectedItemElement = undefined;
		}
	}

	function clickOutsideHandler({ target }: MouseEvent) {
		if (!dropdownElement.contains(target as Node)) menuShown = false;
	}

	function keydownHandler({ code }) {
		switch (code) {
			case 'ArrowDown':
				!selectedItemElement
					? (selectedItemElement = itemsElement.firstElementChild as HTMLElement)
					: (selectedItemElement =
							(selectedItemElement.nextElementSibling as HTMLElement) || selectedItemElement);
				selectedItemElement.focus();
				break;
			case 'ArrowUp':
				!selectedItemElement
					? (selectedItemElement = itemsElement.lastElementChild as HTMLElement)
					: (selectedItemElement =
							(selectedItemElement.previousElementSibling as HTMLElement) || selectedItemElement);
				selectedItemElement.focus();
				break;
			case 'Space':
				selectedItemElement?.click();
				break;
			case 'Escape':
				menuShown = false;
				buttonElement.focus();
				break;
		}
	}

	function scaleY(node, { duration = 150, start = 0 }) {
		return {
			duration,
			css: (t: number) => `opacity: ${t}; transform: scaleY(${start + (1 - start) * t})`,
		};
	}
</script>

<div class="relative {$$props.class}" bind:this={dropdownElement} on:contextmenu>
	<button
		bind:this={buttonElement}
		class="flex items-center rounded-md py-2 px-4 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-100 shadow"
		on:click={() => (menuShown = !menuShown)}
	>
		<slot>dropdown value</slot>
		<Icon name="chevron-down" class="ml-2 -mr-1 h-5 w-5" />
	</button>
	{#if menuShown}
		<ul
			bind:this={itemsElement}
			transition:scaleY={{ duration: 100, start: 0.7 }}
			class="origin-top absolute inset-x-0 rounded-md border border-gray-300 dark:border-gray-600 mt-2 py-1 bg-white dark:bg-gray-700 shadow-lg"
		>
			{#each items as item}
				<a
					href="/"
					on:click={() => {
						item.click?.();
						menuShown = false;
					}}
					class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 cursor-pointer"
					>{item.content}</a
				>
			{/each}
		</ul>
	{/if}
</div>
