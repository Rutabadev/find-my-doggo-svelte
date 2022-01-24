export function scaleFrom(
	node,
	{
		from = 'left',
		duration = 150,
		start = 0,
	}: {
		from?: 'left' | 'right' | 'top' | 'bottom';
		duration?: number;
		start?: number;
	}
) {
	return {
		duration,
		css: (t: number) =>
			`
				transform-origin: ${from};
				opacity: ${t};
				transform: scale${['left', 'right'].includes(from) ? 'X' : 'Y'}(${start + (1 - start) * t})
			`,
	};
}
