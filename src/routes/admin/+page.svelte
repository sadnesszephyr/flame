<script lang="ts">
	import { Button, Switch, TextInput } from '$lib/components'
	import { request } from '$lib/request'

	let method: string = $state('')
	let body: string = $state('')
	let result: unknown = $state('')
	let route = window.location.origin
	let testBool: boolean = $state(false)
</script>

<div class="wrapper">
	<div class="card">
		<TextInput placeholder="Method" bind:value={method}/>
		<TextInput placeholder="Body" bind:value={body}/>
		<Button onclick={async () => {
			result = await request(method, JSON.parse(body))
		}}>
			Send request to <code class="code">/{method}</code>
		</Button>
		<pre>{JSON.stringify(result, null, 2)}</pre>
	</div>
	<div class="card">
		<TextInput value={route}/>
		<Button>
			Update link
		</Button>
		<div class="row">
			<Button variant="secondary">
				Set to localtunnel
			</Button>
			<Button variant="secondary">
				Set to ngrok
			</Button>
		</div>
	</div>
	<Switch bind:enabled={testBool}/>
</div>

<style lang="scss">
	@import "/src/styles/mixins.scss";

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.code {
		background: color-mix(in srgb, black 10%, transparent);
		padding: 0 0.25rem;
		border-radius: 0.25rem;
	}
	
	.card {
		@include card;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-radius: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
