const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const { screens } = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,svelte,svg,ts}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				brand: colors.indigo,
				accent: colors.yellow,
			},
			screens: {
				'max-lg': { max: screens.lg }
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		plugin(function ({ matchComponents, theme }) {
			matchComponents(
				{
					'btn': (value) => ({
						'@apply rounded px-6 py-1 text-gray-100 font-medium tracking-wide': '',
						backgroundColor: theme(`colors.${value}.600`),
						'&:hover': {
							backgroundColor: theme(`colors.${value}.800`),
						},
						'&:focus': {
							'@apply outline-none ring-2': '',
							backgroundColor: theme(`colors.${value}.800`),
							'--tw-ring-color': theme(`ringColor.${value}.500`),
						},
						'.dark &': {
							'@apply text-white focus:bg-brand-500': '',
							'--tw-ring-color': theme(`ringColor.${value}.400`),
							'&:hover': {
								backgroundColor: theme(`colors.${value}.500`),
							},
							'&:focus': {
								backgroundColor: theme(`colors.${value}.500`),
							},
						}
					}),
					'link': (value) => ({
						'@apply rounded hover:underline': '',
						color: theme(`colors.${value}.600`),
						'&:focus-visible': {
							'@apply outline-none ring-2': '',
							'--tw-ring-color': theme(`ringColor.${value}.400`),
						},
						'.dark &': {
							color: theme(`colors.${value}.500`),
							'&:focus': {
								'--tw-ring-color': theme(`ringColor.${value}.600`),
							}
						}
					})
				},
				{ values: Object.keys(theme('colors')).reduce((acc, key) => ({ ...acc, [key]: key }), {}) }
			)
		})
	],
};
