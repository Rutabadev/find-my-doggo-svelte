<script lang="ts">
	export let title = 'Default title';
</script>

<div
	class="mx-auto mt-10 flex min-w-min max-w-sm flex-col gap-5 rounded-lg bg-white p-5 shadow-md dark:bg-gray-700"
>
	<h1 class="text-center text-2xl">{title}</h1>
	<!-- <FormErrors :errors="errors" /> -->
	<!-- <form class="mt-4 grid gap-8" @submit.prevent="$emit('submit')"> -->
	<form class="mt-4 grid gap-8">
		<slot />
	</form>
	<div class="ml-auto text-right">
		<slot name="bottom" />
	</div>
</div>
