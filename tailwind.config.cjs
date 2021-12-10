const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./src/**/*.html', './src/**/*.svelte'],
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
