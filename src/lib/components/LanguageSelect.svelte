<script lang="ts">
	import { locales, locale as usedLocale } from '$lib/i18n';
	import Dropdown from '$lib/utils/Dropdown.svelte';

	$: items = $locales
		.filter((locale) => locale !== $usedLocale)
		.map((availableLocale) => ({
			content: availableLocale,
			click: () => changeLang(availableLocale),
		}));

	function changeLang(lang) {
		usedLocale.set(lang);
		localStorage.lang = lang;
	}

	function resetLang(event) {
		event.preventDefault();
		const wantToReset = confirm('Do you want to reset the language to your system preference ?');
		if (wantToReset) {
			localStorage.removeItem('lang');
			usedLocale.set(navigator.language.substring(0, 2));
		}
	}
</script>

<Dropdown class={$$props.class} {items} on:contextmenu={resetLang}>
	{$usedLocale}
</Dropdown>
