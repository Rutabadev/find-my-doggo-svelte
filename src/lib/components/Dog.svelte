<script lang="ts">
	import { debounce } from 'lodash-es';
	let isHovered = false;
</script>

<svg
	id="dog"
	class="h-64 w-64 {$$props.class}"
	on:contextmenu|preventDefault={() => {
		alert(
			[
				'App version : ' + process.env.npm_package_version,
				'Started at : ' + new Date(process.env.startedAt).toLocaleString(),
			].join('\n')
		);
	}}
	viewBox="0 0 300 300"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	stroke="black"
	stroke-width="3"
>
	<g
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={debounce(() => (isHovered = false), 200)}
		class="{isHovered && '-rotate-12'} origin-center motion-safe:transition-transform"
	>
		<path
			id="head"
			d="M68.1235 82.9264L149.5 55.7012L230.877 82.9264L216.615 212.77L149.5 256.749L82.3854 212.77L68.1235 82.9264Z"
			fill="#F3D69E"
		/>
		<path
			id="left-ear"
			class="origin-top-right [transform-box:fill-box] {isHovered && '!animate-none'}"
			d="M41.4149 47L117.693 66.8757L6 131.036L41.4149 47Z"
			fill="#803B14"
			stroke="black"
		/>
		<path
			id="right-ear"
			class="origin-top-left [transform-box:fill-box] {isHovered && '!animate-none'}"
			d="M259.278 47L183 66.8757L294.693 131.036L259.278 47Z"
			fill="#803B14"
			stroke="black"
		/>
		<path
			d="M143.9 119.235C143.9 133.086 132.111 144.314 117.568 144.314C103.025 144.314 91.2354 133.086 91.2354 119.235C91.2354 105.385 103.025 94.1569 117.568 94.1569C132.111 94.1569 143.9 105.385 143.9 119.235Z"
			fill="black"
		/>
		<path
			d="M209.104 119.235C209.104 133.086 197.315 144.314 182.772 144.314C168.229 144.314 156.439 133.086 156.439 119.235C156.439 105.385 168.229 94.1569 182.772 94.1569C197.315 94.1569 209.104 105.385 209.104 119.235Z"
			fill="black"
		/>
		<path
			id="mouth"
			class={isHovered && '[clip-path:_polygon(0_0,100%_0,100%_10%,0_10%)]'}
			d="M150.016 228.028L105.5 193.988H188L150.016 228.028Z"
			fill="black"
			stroke="black"
		/>
		<path
			id="tongue"
			class="origin-top [transform-box:fill-box] {isHovered && 'hidden'}"
			d="M114.928 200.371C114.928 256.683 179.817 257.523 179.817 200.371H114.928Z"
			fill="#FFA397"
			stroke="black"
		/>
		<path d="M133 160.761L148.5 154.5L164.221 160.761L148.5 171.5L133 160.761Z" fill="black" />
		<path
			d="M82 211.5C74 138.5 217 128 217 211.5M148.5 154.5L133 160.761L148.5 171.5L164.221 160.761L148.5 154.5Z"
			stroke="black"
		/></g
	>
</svg>

<style>
	@media (prefers-reduced-motion: no-preference) {
		#dog {
			--ear-animation-speed: 1s;
			--ear-rotation: 6deg;
		}

		#left-ear {
			animation: left-ear-rotate var(--ear-animation-speed) infinite alternate ease-in-out;
		}
		@keyframes left-ear-rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(calc(var(--ear-rotation) * -1));
			}
		}

		#right-ear {
			animation: right-ear-rotate var(--ear-animation-speed) infinite alternate ease-in-out;
		}
		@keyframes right-ear-rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(var(--ear-rotation));
			}
		}

		#tongue {
			animation: breathe 0.2s infinite alternate ease-in-out;
		}
		@keyframes breathe {
			from {
				transform: scaleY(1.4);
			}
			to {
				transform: scaleY(1.7);
			}
		}
	}
</style>
