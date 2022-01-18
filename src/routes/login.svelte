<script>
	import FormInput from '$lib/components/Form/FormInput.svelte';

	import Form from '$lib/components/Form/index.svelte';
	import Icon from '$lib/utils/Icon.svelte';
	import { _ } from 'svelte-i18n';

	let isLoading = false;
</script>

<Form title="Login">
	<FormInput name="email" label={$_('login.email')} />
	<FormInput name="password" label={$_('login.password')} />
	<button
		aria-label="log in"
		class="btn-brand dark:dark-btn-accent flex justify-center items-center uppercase tracking-wide"
	>
		{#if !isLoading}
			{$_('login.login')}
		{:else}
			<Icon name="spinner" class="h-5 w-5 mr-2 animate-spin" />
			{$_('login.logging_in')}
		{/if}
	</button>
	<div slot="bottom">
		<p>
			<a href="/forgot-password" class="link-brand dark:dark-link-accent">
				{$_('login.forgot')}
			</a>
		</p>

		<p class="mt-4">
			{$_('login.no_account')}
			<a href="/create-account" class="link-brand dark:dark-link-accent">
				{$_('login.signup')}
			</a>
		</p>
	</div>
</Form>
