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
		{
			name: 'moon',
			type: 'solid',
			svg: `<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />`,
		},
		{
			name: 'sun',
			type: 'solid',
			svg: `<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />`,
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
	viewBox="0 0 {icon.type === 'solid' ? '20 20' : '24 24'}"
	xmlns="http://www.w3.org/2000/svg"
>
	{@html icon.svg}
</svg>
