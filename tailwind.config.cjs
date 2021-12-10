const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.{html,svelte,svg,ts}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: colors.indigo,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
