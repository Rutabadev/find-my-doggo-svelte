<script lang="ts">
	import { locales, locale as usedLocale, getLocaleFromNavigator } from 'svelte-i18n';
	import Dropdown from '$lib/utils/Dropdown.svelte';

	$: items = $locales
		.filter((locale) => locale !== $usedLocale)
		.map((availableLocale) => ({
			content: availableLocale,
			click: () => changeLang(availableLocale),
		}));

	function changeLang(lang) {
		usedLocale.set(lang);
		document.cookie = `lang=${lang}; expires=Thu, 01 Jan 2037 00:00:00 UTC;`;
	}

	function resetLang(event) {
		event.preventDefault();
		const wantToReset = confirm('Do you want to reset the language to your system preference ?');
		if (wantToReset) {
			document.cookie = 'lang=deleted; expires=Thu, 01 Jan 1937 00:00:00 UTC;';
			localStorage.removeItem('lang');
			usedLocale.set(getLocaleFromNavigator().substring(0, 2));
		}
	}
</script>

<Dropdown class={$$props.class} {items} on:contextmenu={resetLang}>
	{$usedLocale}
</Dropdown>
