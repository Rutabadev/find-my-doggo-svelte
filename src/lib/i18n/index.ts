import { register } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('fr', () => import('./fr.json'));
register('djeun', () => import('./djeun.json'));
