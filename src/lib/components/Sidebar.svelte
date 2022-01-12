<script lang="ts">
	import { isSidebarOpened } from '$lib/stores';
	import Icon from '$lib/utils/Icon.svelte';

	let closeAnimationDone = true;

	isSidebarOpened.subscribe((opened) => {
		if (opened) {
			closeAnimationDone = false;
			return;
		}

		setTimeout(() => {
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
		class="fixed inset-y-0 w-2/3 max-w-xs p-8 bg-brand-600 shadow-md {$isSidebarOpened
			? 'translate-x-0 visible'
			: '-translate-x-full'} {!$isSidebarOpened &&
			closeAnimationDone &&
			'invisible'} motion-safe:transition-transform motion-safe:duration-300"
	>
		<button
			class="absolute top-0 left-0 p-4 hover:bg-brand-700"
			on:click={() => {
				isSidebarOpened.set(false);
			}}
		>
			<Icon name="close" class="h-8 drop-shadow" />
		</button>
	</div>
</div>
