<script lang="ts">
	import { browser } from '$app/env';
	import { isSidebarOpened } from '$lib/stores';
	import Icon from '$lib/utils/Icon.svelte';
	import { tick } from 'svelte';
	import { tweened, spring } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	import DarkModeToggle from './DarkModeToggle.svelte';

	const sidebarAnimationDuration = 200;

	let closeAnimationDone = true;
	let closeSidebarButton;
	let willSetCloseAnimationDone;

	let sidebarPosition;

	isSidebarOpened.subscribe(async (opened) => {
		const currentPosition = opened ? -100 : 0;
		const prefersReduceMotion =
			browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const sidebarPositionTweened = tweened(currentPosition, {
			duration: prefersReduceMotion ? 0 : sidebarAnimationDuration,
			easing: linear,
		});
		sidebarPosition = spring(currentPosition, {
			damping: prefersReduceMotion ? 1 : 0.2,
			stiffness: prefersReduceMotion ? 1 : 0.2,
		});
		sidebarPositionTweened.subscribe((value) => {
			sidebarPosition.set(value);
		});
		sidebarPositionTweened.set(opened ? 0 : -100);
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
			<div class="flex justify-between">
				<button
					bind:this={closeSidebarButton}
					class="p-4 hover:bg-brand-700 focus:bg-brand-700"
					on:click={() => {
						isSidebarOpened.set(false);
					}}
				>
					<Icon name="close" class="h-8 drop-shadow" />
				</button>
				<DarkModeToggle class="px-4" />
			</div>
		</div>
	</div>
</div>
