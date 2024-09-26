<script lang="ts">
	import type { Snippet } from 'svelte'
	import { fade, scale, type TransitionConfig } from 'svelte/transition'
	import { Dialog } from 'bits-ui'

	interface DialogProps {
		children: Snippet,
		open?: boolean
	}

	let {
		children,
		open = $bindable(false)
	}: DialogProps = $props()

	function fadeAndScale(node: Element, { delay = 0, duration = 400 }): TransitionConfig {
		return {
			delay,
			duration,
			css: (t) => `opacity: ${t}; scale: ${0.95 + t * 0.05}`
		}
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay
			class="backdrop"
			transition={fade}
			transitionConfig={{ duration: 100 }}
		/>
		<Dialog.Content
			class="dialog"
			transition={fadeAndScale}
			transitionConfig={{ duration: 100 }}
		>
			<div class="content">
				{@render children()}
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

<style lang="scss">
	:global(.backdrop) {
		position: fixed;
		z-index: 10;
		inset: 0;
		background: rgba(0, 0, 0, 0.81);
		height: 100vh;
	}

	:global(.dialog) {
		position: fixed;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		z-index: 11;
		border: none;
		width: 22.25rem;
		background: var(--background);
		border-radius: 0.625rem;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
	}

	.content {
		line-height: 1.171875rem;
		padding: 0.75rem;
	}
</style>
