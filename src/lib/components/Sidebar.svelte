<script lang="ts">
	import { browser } from '$app/env';
	import { isSidebarOpened } from '$lib/stores';
	import Icon from '$lib/utils/Icon.svelte';
	import { tick } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { backIn, linear } from 'svelte/easing';
	import { spring, Spring, tweened, Tweened } from 'svelte/motion';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import LanguageSelect from './LanguageSelect.svelte';
	import { focusTrap } from '$lib/directives/focusTrap';

	let user = { name: 'jean', roles: ['admin'] };
	const closeSidebarAnimationDuration = 370;
	let closeAnimationDone = true;
	let closeSidebarButton: HTMLButtonElement;
	let willSetCloseAnimationDone: NodeJS.Timeout;
	let unsubscribeSidebarPositionTweened;
	let sidebarPosition: Spring<number> | Tweened<number>;
	const links = [
		{
			route: '/',
			name: 'index.title',
			always: true,
		},
		{
			route: '/login',
			name: 'login.title',
			user: false,
		},
		{
			route: '/',
			name: 'admin.title',
			user: true,
			roles: ['admin'],
		},
	];

	$: toggleSidebar($isSidebarOpened);

	const createSpringSidebarPosition = (prefersReduceMotion: boolean) => {
		const currentPosition = -100;
		const sidebarPositionTweened = tweened(currentPosition, {
			duration: prefersReduceMotion ? 0 : 200,
			easing: linear,
		});
		const sidebarPosition = spring(currentPosition, {
			damping: prefersReduceMotion ? 1 : 0.2,
			stiffness: prefersReduceMotion ? 1 : 0.2,
		});
		unsubscribeSidebarPositionTweened = sidebarPositionTweened.subscribe((value) => {
			sidebarPosition.set(value);
		});

		sidebarPositionTweened.set(0);

		return sidebarPosition;
	};

	const createTweenedSidebarPosition = (prefersReduceMotion: boolean) => {
		unsubscribeSidebarPositionTweened?.();
		let currentPosition = 0;
		const sidebarPosition = tweened(currentPosition, {
			duration: prefersReduceMotion ? 0 : closeSidebarAnimationDuration,
			easing: backIn,
		});

		sidebarPosition.set(-100);

		return sidebarPosition;
	};

	const handleEscape = ({ code }) => code === 'Escape' && isSidebarOpened.set(false);

	const toggleSidebar = async (opened: boolean) => {
		const prefersReduceMotion =
			browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (opened) {
			sidebarPosition = createSpringSidebarPosition(prefersReduceMotion);
			clearTimeout(willSetCloseAnimationDone);
			closeAnimationDone = false;
			await tick();
			closeSidebarButton.focus();
			browser && window.addEventListener('keydown', handleEscape);
		} else {
			browser && window.removeEventListener('keydown', handleEscape);
			sidebarPosition = createTweenedSidebarPosition(prefersReduceMotion);
			willSetCloseAnimationDone = setTimeout(() => {
				closeAnimationDone = true;
			}, closeSidebarAnimationDuration);
		}
	};
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
		<div
			use:focusTrap={$isSidebarOpened}
			class="absolute inset-0 bg-brand-600 flex flex-col text-center text-gray-50"
		>
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
			{#each links as link}
				{#if (link.user && (!link.roles ? true : user?.roles.some( (role) => link.roles.includes(role) ))) || (!user && !link.user) || link.always}
					<a class="py-4 text-lg uppercase hover:bg-brand-700" href={link.route}>{$_(link.name)}</a>
				{/if}
			{/each}
			{#if user}
				<button class="py-4 text-lg uppercase hover:bg-brand-700">{$_('logout')}</button>
			{/if}
			<div class="py-4">
				<LanguageSelect class="inline-block" />
			</div>
		</div>
	</div>
</div>
