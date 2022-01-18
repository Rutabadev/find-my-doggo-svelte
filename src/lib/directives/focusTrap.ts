export function focusTrap(node: HTMLElement, isActive: boolean) {
	trapFocus(node, isActive);

	return {
		update(newIsActive: boolean) {
			trapFocus(node, newIsActive);
		},
	};
}

function trapFocus(node: HTMLElement, isActive: boolean) {
	const focusableChidlren: HTMLElement[] = Array.from(
		node.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
	);

	const firstFocusableChild = focusableChidlren[0];
	const lastFocusableChild = focusableChidlren.at(-1);

	const focusFirst = (e: KeyboardEvent) => {
		const { code, shiftKey } = e;
		if (code === 'Tab' && !shiftKey) {
			e.preventDefault();
			firstFocusableChild.focus();
		}
	};

	const focusLast = (e: KeyboardEvent) => {
		const { code, shiftKey } = e;
		if (code === 'Tab' && shiftKey) {
			e.preventDefault();
			lastFocusableChild.focus();
		}
	};

	lastFocusableChild[isActive ? 'addEventListener' : 'removeEventListener']('keydown', focusFirst);
	firstFocusableChild[isActive ? 'addEventListener' : 'removeEventListener']('keydown', focusLast);
}
