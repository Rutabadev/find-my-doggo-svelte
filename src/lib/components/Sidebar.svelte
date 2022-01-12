<script lang="ts">
	import { browser } from '$app/env';
	import { isSidebarOpened } from '$lib/stores';
	import Icon from '$lib/utils/Icon.svelte';
	import { tick } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { backInOut } from 'svelte/easing';

	const sidebarAnimationDuration = 700;

	let closeAnimationDone = true;
	let closeSidebarButton;
	let willSetCloseAnimationDone;

	let sidebarPosition;

	isSidebarOpened.subscribe(async (opened) => {
		let prefersReduceMotion =
			browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		sidebarPosition = tweened(opened ? -100 : 0, {
			duration: prefersReduceMotion ? 0 : sidebarAnimationDuration,
			easing: backInOut,
		});
		sidebarPosition.set(opened ? 0 : -100);
		if (opened) {
			clearTimeout(willSetCloseAnimationDone);
			closeAnimationDone = false;
			await tick();
			closeSidebarButton.focus();
		} else {
			willSetCloseAnimationDone = setTimeout(() => {
				closeAnimationDone = true;
			}, sidebarAnimationDuration);
		}
	});
</script>

<div class="isolate z-10">
	<!-- overlay -->
	<div
		class="fixed inset-0 bg-black {$isSidebarOpened
			? 'opacity-30'
			: 'opacity-0 pointer-events-none'} motion-safe:transition-opacity motion-safe:duration-700"
		on:click={() => {
			isSidebarOpened.set(false);
		}}
	/>
	<div
		class="
			fixed inset-y-0 w-2/3 max-w-xs p-8
			{!$isSidebarOpened && closeAnimationDone ? 'invisible' : 'visible'}
		"
		style="transform: translateX({$sidebarPosition}%)"
	>
		<!-- add sidebar space to the left to prevent hole during animation -->
		<div class="absolute inset-y-0 right-full translate-x-px w-32 bg-brand-600" />
		<!-- border shadow to the right only -->
		<div class="absolute inset-y-0 right-0 w-10 shadow-lg shadow-black" />
		<div class="absolute inset-0 bg-brand-600 flex flex-col gap-8">
			<button
				bind:this={closeSidebarButton}
				class="self-start p-4 hover:bg-brand-700 focus:bg-brand-700"
				on:click={() => {
					isSidebarOpened.set(false);
				}}
			>
				<Icon name="close" class="h-8 drop-shadow" />
			</button>
		</div>
	</div>
</div>
