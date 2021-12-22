const colors = require('tailwindcss/colors');
const { screens } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,svelte,svg,ts}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: colors.indigo,
			},
			screens: {
				'max-lg': { max: screens.lg }
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
