<script lang="ts">
	import { ripple } from '$lib/actions'
	import { appManager } from '$lib/AppManager'
	import { Button, Dialog } from '$lib/components'
	import ItemSprite from '$lib/components/itemSprite/ItemSprite.svelte'
	import { t } from '$lib/localization'

	let modalOpen = $state(false)
</script>

<div class="container">
	<div class="nav">
		<a href="/fishing" class="nav-card" use:ripple>
			<ItemSprite id="carp" size="4.5rem"/>
			{$t('home.fishing')}
		</a>
		<a href="/garden" class="nav-card" use:ripple>
			<ItemSprite id="carrot" size="4.5rem"/>
			{$t('home.garden')}
		</a>
		<a href="/daily" class="nav-card" use:ripple>
			<ItemSprite id="autumnLeaves" size="3rem"/>
			{$t('home.daily')}
		</a>
		<a href="/players" class="nav-card" use:ripple>
			<ItemSprite id="happy" size="3rem"/>
			{$t('home.players')}
		</a>
		<a href="https://t.me/campfire_game" class="nav-card" use:ripple>
			<ItemSprite id="onigiri" size="3rem"/>
			{$t('home.news')}
		</a>
	</div>
</div>

<style lang="scss">
	@import "/src/styles/mixins.scss";

	.container {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.nav {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: 1rem;
	}

	.nav-card {
		@include card;
		grid-column: span 2;
		aspect-ratio: 1/1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		font-family: var(--font-heading);
		font-size: 1rem;

		&:nth-child(-n+2) {
			grid-column: span 3;
			font-size: 1.25rem;
			gap: 1.5rem;
		}
	}

	pre {
		overflow-x: scroll;
		padding: 0 1rem;
		margin: 0 -1rem;
	}
</style>
