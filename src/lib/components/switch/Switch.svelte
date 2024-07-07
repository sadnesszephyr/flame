<script lang="ts">
	interface SwitchProps {
		enabled: boolean,
		id?: string
	}
	
	let {
		enabled = $bindable(),
		id
	}: SwitchProps = $props()
</script>

<span class="switch" class:enabled>
	<div class="thumb"></div>
	<div class="back"></div>
	<input class="checkbox" type="checkbox" bind:checked={enabled} {id}>
</span>

<style lang="scss">
	.switch {
		position: relative;
		height: 1.25rem;
		width: 2.25rem;
		display: flex;
		align-items: center;
		justify-content: center;

		&.enabled {
			.thumb {
				border-color: var(--accent);
				left: calc(100% - 1.25rem);
			}

			.back {
				background: var(--accent);
			}
		}
	}

	.thumb {
		left: 0;
		top: 0;
		width: 1.25rem;
		height: 1.25rem;
		position: absolute;
		border-radius: 50%;
		background: var(--background);
		border: 0.125rem solid var(--text);
		transition: 0.2s;
	}

	.back {
		height: 1rem;
		width: calc(2rem - 0.125rem);
		background: var(--text);
		border-radius: 0.5rem;
		transition: 0.2s;
	}

	.checkbox {
		margin: 0;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}
</style>
