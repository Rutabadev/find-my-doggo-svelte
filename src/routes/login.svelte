<script lang="ts">
	import FormInput from '$lib/components/Form/FormInput.svelte';
	import Form from '$lib/components/Form/index.svelte';
	import { api, user as userStore } from '$lib/stores';
	import Icon from '$lib/utils/Icon.svelte';
	import { _ } from 'svelte-i18n';

	let loginInfo = {
		email: '',
		password: '',
	};

	let isLoading = false;

	async function login() {
		isLoading = true;
		try {
			const { access_token } = await $api.auth.login.$post({ body: loginInfo });
			api.setBearerToken(access_token);
			const user = await $api.auth.me.$get();
			console.log({ user });
			userStore.set(user);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
	}
</script>

<Form title="Login" on:submit={login}>
	<FormInput name="email" label={$_('login.email')} bind:value={loginInfo.email} />
	<FormInput
		name="password"
		label={$_('login.password')}
		type="password"
		bind:value={loginInfo.password}
	/>
	<button
		aria-label="log in"
		class="btn-brand flex items-center justify-center uppercase tracking-wide dark:dark-btn-accent"
		on:click|preventDefault={login}
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
