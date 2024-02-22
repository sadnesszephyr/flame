<script lang="ts">
	import { page } from '$app/stores'
	import { userData } from '$lib/client/store'
	import { House, Medal, Tent } from '$lib/client/components/icons'
	import ProfilePhoto from '$lib/client/components/ProfilePhoto.svelte'
	
	let segments = [{
		icon: House,
		page: '/',
		label: 'Home'
	}, {
		icon: Medal,
		page: '/top',
		label: 'Top'
	}, {
		icon: Tent,
		page: '/camp',
		label: 'Camp'
	}, {
		icon: 'avatar',
		page: '/settings',
		label: 'Profile'
	}]
	console.log(window.location.pathname)
</script>

<div class="navigation-bar">
	{#each segments as segment (segment.page)}
		<a href={segment.page} class="segment" class:active={$page.url.pathname === segment.page}>
			<div class="icon-container">
				{#if typeof segment.icon === 'string'}
					<ProfilePhoto user={$userData} size="1.5rem"/>
				{:else}
					<svelte:component this={segment.icon}/>
				{/if}
			</div>
			<span class="segment-label">{segment.label}</span>
		</a>
	{/each}
</div>

<style lang="scss">
	.navigation-bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: var(--background);
		display: flex;
		height: 5rem;
		
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
		transition: 0.1s;
		border-radius: 1rem;
		color: var(--text);
		display: flex;
		align-items: center;
		justify-content: center;
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
</style>
