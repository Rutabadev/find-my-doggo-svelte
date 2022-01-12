<script lang="ts">
	import { isSidebarOpened } from '$lib/stores';
	import Icon from '$lib/utils/Icon.svelte';
	import { tick } from 'svelte';

	let closeAnimationDone = true;
	let closeSidebarButton;
	let willSetCloseAnimationDone;

	isSidebarOpened.subscribe(async (opened) => {
		if (opened) {
			clearTimeout(willSetCloseAnimationDone);
			closeAnimationDone = false;
			await tick();
			closeSidebarButton.focus();
			return;
		}

		willSetCloseAnimationDone = setTimeout(() => {
			closeAnimationDone = true;
		}, 300);
	});
</script>

<div class="isolate z-10">
	<!-- overlay -->
	<div
		class="fixed inset-0 bg-black {$isSidebarOpened
			? 'opacity-30'
			: 'opacity-0 pointer-events-none'} motion-safe:transition-opacity"
		on:click={() => {
			isSidebarOpened.set(false);
		}}
	/>
	<div
		class="fixed inset-y-0 w-2/3 max-w-xs p-8 bg-brand-600 shadow-md 
			   {$isSidebarOpened ? 'translate-x-0 visible' : '-translate-x-full'} 
			   {!$isSidebarOpened && closeAnimationDone ? 'invisible' : 'visible'}
			   motion-safe:transition-transform motion-safe:duration-300"
	>
		<button
			bind:this={closeSidebarButton}
			class="absolute top-0 left-0 p-4 hover:bg-brand-700 focus:bg-brand-700"
			on:click={() => {
				isSidebarOpened.set(false);
			}}
		>
			<Icon name="close" class="h-8 drop-shadow" />
		</button>
	</div>
</div>
