<script lang="ts">
	import { ripple } from '$lib/actions'
	import type { IconComponent } from '$lib/components/icons'
	import { Switch, ProfilePhoto } from '$lib/components'

	type CellVariant = 'default' | 'danger'

	interface BaseCellProps {
		variant?: CellVariant,
		type?: string,
		title: string,
		subtitle?: string,
		icon?: IconComponent,
		imageUrl?: string,
		profilehotoUserId?: number,
		href?: never,
		enabled?: never,
		onclick?: () => void
	}

	interface DefaultCellProps extends BaseCellProps {
		type: 'default'
	}

	interface LinkCellProps extends Omit<BaseCellProps, 'href'> {
		type: 'link',
		href: string
	}

	interface SwitchCellProps extends Omit<BaseCellProps, 'enabled'> {
		type: 'switch',
		enabled: boolean
	}

	type CellProps = DefaultCellProps | LinkCellProps | SwitchCellProps

	let {
		variant = 'default',
		title,
		subtitle,
		icon: Icon,
		imageUrl,
		profilehotoUserId,
		type = 'default',
		href,
		onclick,
		enabled = $bindable(false)
	}: CellProps = $props()

	let className = $derived(['cell', 'variant-' + variant].join(' '))
</script>

{#if type === 'default'}
	<button
		{onclick}
		class={className}
		class:has-profile-photo={profilehotoUserId}
		use:ripple
	>
		<hr class="divider"/>
		{#if Icon}
			<Icon/>
		{/if}
		{#if imageUrl}
			<img src={imageUrl} class="image" alt=""/>
		{/if}
		{#if profilehotoUserId}
			<ProfilePhoto userId={profilehotoUserId} size="3rem"/>
		{/if}
		<div class="info">
			<span class="title">{title}</span>
			{#if subtitle}
				<span class="subtitle">{subtitle}</span>
			{/if}
		</div>
	</button>
{/if}

{#if type === 'link'}
	<a
		{onclick}
		onkeyup={onclick}
		{href}
		class={className}
		class:has-profile-photo={profilehotoUserId}
		use:ripple
		draggable="false"
	>
		<hr class="divider"/>
		{#if Icon}
			<Icon/>
		{/if}
		{#if imageUrl}
			<img src={imageUrl} class="image" alt=""/>
		{/if}
		{#if profilehotoUserId}
			<ProfilePhoto userId={profilehotoUserId} size="3rem"/>
		{/if}
		<div class="info">
			<span class="title">{title}</span>
			{#if subtitle}
				<span class="subtitle">{subtitle}</span>
			{/if}
		</div>
	</a>
{/if}

{#if type === 'switch'}
	<div
		{onclick}
		onkeyup={onclick}
		role="switch"
		aria-checked={enabled}
		tabindex="0"
		class={className}
		class:has-profile-photo={profilehotoUserId}
		use:ripple
		draggable="false"
	>
		<hr class="divider"/>
		{#if Icon}
			<Icon/>
		{/if}
		{#if imageUrl}
			<img src={imageUrl} class="image" alt=""/>
		{/if}
		{#if profilehotoUserId}
			<ProfilePhoto userId={profilehotoUserId} size="3rem"/>
		{/if}
		<div class="info">
			<span class="title">{title}</span>
			{#if subtitle}
				<span class="subtitle">{subtitle}</span>
			{/if}
		</div>
		<Switch enabled={enabled}/>
		<input type="checkbox" class="checkbox" bind:checked={enabled}>
	</div>
{/if}

<style lang="scss">
	@import "/src/styles/mixins";
		
	.cell {
		position: relative;
		padding: 0.75rem 1.25rem;
		display: flex;
		align-items: center;
		min-height: 3rem;
		color: var(--foreground-subtle);
		gap: 1.25rem;
		border: none;
		background: none;
		width: 100%;
		text-align: left;
		text-decoration: none;
		user-select: none;

		&:first-of-type .divider {
			display: none;
		}

		&.has-profile-photo {
			padding: 0.5rem 1.25rem;
		}
	}

	.divider {
		all: unset;
		position: absolute;
		left: 1.25rem;
		right: 0;
		top: 0;
		margin: 0;
		border-top: 1px solid var(--separator);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		flex: 1;
	}

	.title {
		font-size: 0.9375rem;
		color: var(--foreground);
	}

	.subtitle {
		color: var(--foreground-subtle);
		font-size: 0.75rem;
		line-height: 0.875rem;
	}


	.variant-danger {
		color: var(--danger);

		.title, .description {
			color: var(--danger);
		}
	}

	.checkbox {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		opacity: 0;
		cursor: pointer;
	}
</style>
