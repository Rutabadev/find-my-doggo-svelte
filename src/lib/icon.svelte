<script lang="ts">
	const icons = [
		{
			name: 'burger',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`,
		},
		{
			name: 'search',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`,
		},
	] as const;
	type IconNames = typeof icons[number]['name'];
	export let name: IconNames;
</script>

<svg
	class={$$props.class}
	fill="none"
	stroke="currentColor"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
>
	{@html icons.find((icon) => icon.name === name).svg}
</svg>
