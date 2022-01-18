<script lang="ts">
	export let name = 'default-name';
	export let label = 'default label';
	export let placeholder = 'default placeholder';
</script>

<div class="relative">
	<input
		id={name}
		class="peer block border-2 border-gray-300 w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-600 rounded p-2 dark:bg-gray-600 dark:focus:ring-accent-400 dark:border-gray-800 dark:focus:border-accent-700 placeholder-transparent"
		{placeholder}
	/>
	<label
		for={name}
		class="absolute inset-0 text-gray-400 pointer-events-none -translate-y-7 scale-90 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:p-2.5 peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:p-0 transition-all duration-200"
		>{label}
		<!-- <span class="text-red-500 dark:text-red-400">*</span> -->
	</label>
</div>
