<script lang="ts">
	const icons = [
		{
			name: 'burger',
			type: 'outline',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`,
		},
		{
			name: 'search',
			type: 'outline',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>`,
		},
		{
			name: 'chevron-down',
			type: 'solid',
			svg: `<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />`,
		},
	] as const;
	type IconName = typeof icons[number]['name'];
	export let name: IconName;
	const icon = icons.find((icon) => icon.name === name);
</script>

<svg
	class={$$props.class}
	fill={icon.type === 'solid' ? 'currentColor' : 'none'}
	stroke={icon.type === 'outline' && 'currentColor'}
	viewBox={`0 0 ${icon.type === 'solid' ? '20 20' : '24 24'}`}
	xmlns="http://www.w3.org/2000/svg"
>
	{@html icon.svg}
</svg>
