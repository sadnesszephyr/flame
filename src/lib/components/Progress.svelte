<script lang="ts">
	interface Props {
		value: number,
		max?: number,
		variant?: 'default' | 'glass'
	}

	const {
		value,
		max = 100,
		variant = 'default'
	}: Props = $props()
</script>

<div class="progress variant-{variant}">
	<span class="indicator" style:width={value / max * 100 + '%'}></span>
	<span class="track"></span>
	<div class="stop-indicator"></div>
</div>

<style lang="scss">
	.progress {
		position: relative;
		height: 0.25rem;
		display: flex;
		width: 100%;
		gap: 0.25rem;
	}

	.indicator {
		background: var(--indicator-color);
		border-radius: 0.125rem;
		min-width: 0.25rem;
	}

	.track {
		background: var(--track-color);
		border-radius: 0.125rem;
		flex: 1;
	}

	.stop-indicator {
		height: 0.25rem;
		width: 0.25rem;
		background: var(--indicator-color);
		border-radius: 50%;
		position: absolute;
		right: 0;
	}

	.variant-default {
		--indicator-color: var(--accent);
		--track-color: color-mix(in srgb, var(--accent) 33%, transparent);
	}

	.variant-glass {
		--indicator-color: white;
		--track-color: rgba(255, 255, 255, 0.2);
	}
</style>
