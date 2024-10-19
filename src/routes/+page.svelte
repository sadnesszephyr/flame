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
			<span class="nav-card-label">{$t('home.fishing')}</span>
		</a>
		<a href="/garden" class="nav-card" use:ripple>
			<ItemSprite id="carrot" size="4.5rem"/>
			<span class="nav-card-label">{$t('home.garden')}</span>
		</a>
		<a href="/daily" class="nav-card" use:ripple>
			<ItemSprite id="autumnLeaves" size="3rem"/>
			<span class="nav-card-label">{$t('home.daily')}</span>
		</a>
		<a href="/players" class="nav-card" use:ripple>
			<ItemSprite id="happy" size="3rem"/>
			<span class="nav-card-label">{$t('home.players')}</span>
		</a>
		<a href="https://t.me/campfire_game" class="nav-card" use:ripple>
			<ItemSprite id="onigiri" size="3rem"/>
			<span class="nav-card-label">{$t('home.news')}</span>
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
		text-align: center;

		&:nth-child(-n+2) {
			grid-column: span 3;
			font-size: 1.25rem;
			gap: 1.5rem;
		}
	}

	.nav-card-label {
		text-wrap: nowrap;
	}

	pre {
		overflow-x: scroll;
		padding: 0 1rem;
		margin: 0 -1rem;
	}
</style>
