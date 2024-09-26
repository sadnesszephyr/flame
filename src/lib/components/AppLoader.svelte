<script>
	import { fade } from 'svelte/transition'
</script>

<div class="loader" out:fade|global>
	<svg width="8rem" height="8rem" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M232 162.4C232 200.8 216 256 128 256C40 256 24 200.8 24 162.4C24 128 43.1334 118.4 44 87.2C44.4887
			69.6068 40 64 40 60.8C40 57.6 41.6 56 44.8 56C58.4 56 78.4 76.8 84.8 87.2C116.8 47.2 112 16 112 4.8C112 3.2
			112 0 115.2 0C134.4 0 181.6 55.2 188.8 101.6C199.2 95.2 206.4 80 211.2 80C219.63 80 232 124 232 162.4Z"
			fill="currentColor"
		/>
	</svg>
</div>

<style lang="scss">
	.loader {
		position: fixed;
		inset: 0;
		background: var(--background);
		color: var(--background-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}
</style>
