<script lang="ts">
	interface Props {
		userId: number;
		size?: string;
		fallbackLetter?: string;
	}

	const { userId, size = '4rem', fallbackLetter = 'u' }: Props = $props();

	let loaded = $state(false);
</script>

<div style:--size={size} class="profile-photo">
	<!-- svelte-ignore a11y_img_redundant_alt -->
	<img
		class="image"
		class:loaded
		loading="lazy"
		src={`/profilePhoto/${userId}`}
		alt="profile photo"
		onload={() => loaded = true}
	/>
	<span class="fallback-letter">{fallbackLetter}</span>
</div>

<style lang="scss">
	.profile-photo {
		width: var(--size);
		height: var(--size);
		aspect-ratio: 1/1;
		border-radius: 50%;
		overflow: hidden;
		background: var(--background);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--foreground) 10%, transparent);
	}

	.image {
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: 0.2s;
		position: absolute;
		left: 0;
		top: 0;
		display: none;

		&.loaded {
			opacity: 1;
		}
	}

	.fallback-letter {
		color: var(--foreground-subtle);
		font-size: calc(var(--size) / 2);
		line-height: 100%;
	}
</style>
