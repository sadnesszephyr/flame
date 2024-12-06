<script lang="ts">
	import { page } from '$app/stores'
	import { useClientUser } from '$lib/clientUser.svelte'
	import { ProfilePhoto } from '$lib/components'
	import { House, Map } from '$lib/components/icons'

	const clientUser = useClientUser()
	
	let segments = [{
		icon: House,
		page: '/',
		label: 'Home'
	},
	{
		icon: 'profilePhoto',
		page: '/me',
		label: 'Profile'
	}]
</script>

<div class="navigation-bar">
	{#each segments as segment (segment.page)}
		<a href={segment.page} class="segment" class:active={$page.url.pathname === segment.page}>
			<div class="icon-container">
				{#if typeof segment.icon === 'string'}
					<ProfilePhoto size="1.5rem" userId={clientUser.id}/>
				{:else}
					<segment.icon/>
				{/if}
			</div>
			<span class="segment-label">{segment.label}</span>
		</a>
	{/each}
</div>

<style lang="scss">
	.navigation-bar {
		width: 100%;
		background: var(--background);
		display: flex;
		height: 5rem;
		view-transition-name: disabled;
		box-shadow:
			0 var(--border-width) 0 0 var(--border-color) inset;
		
		@media screen and (max-height: 590px) {
			height: 3rem;
		}
	}

	.segment {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		gap: 0.25rem;
		transition: 0.2s;

		&.active {
			.icon-container {
				color: var(--foreground);
				background: color-mix(in srgb, var(--accent) 15%, transparent);
				width: 4rem;

				:global(svg) {
					fill: var(--foreground);
				}
			}

			.segment-label {
				opacity: 1;
				height: 1rem;
			}
		}
	}

	.icon-container {
		width: 2rem;
		height: 2rem;
		border-radius: 1rem;
		color: var(--foreground-subtle);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.2s;

		:global(svg) {
			transition: 0.2s;
			fill: transparent;
		}
	}

	.segment-label {
		opacity: 0;
		height: 0;
		transition: 0.1s;
		font-size: 0.75rem;
		line-height: 1rem;
		letter-spacing: 0.5px;
		color: var(--foreground);

		@media screen and (max-height: 590px) {
			display: none;
		}
	}

	.profile-photo {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
	}
</style>
