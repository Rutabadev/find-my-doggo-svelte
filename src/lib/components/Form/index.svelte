<script lang="ts">
	export let title = 'Default title';
</script>

<div
	class=" max-w-sm mt-10 mx-auto rounded-lg bg-white dark:bg-gray-700 shadow-md p-5 flex flex-col gap-5 "
>
	<h1 class="text-2xl text-center">{title}</h1>
	<!-- <FormErrors :errors="errors" /> -->
	<!-- <form class="mt-4 grid gap-8" @submit.prevent="$emit('submit')"> -->
	<form class="mt-4 grid gap-8">
		<slot />
	</form>
	<div class="ml-auto text-right">
		<slot name="bottom" />
	</div>
</div>
