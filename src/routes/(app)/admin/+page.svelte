<script lang="ts">
	import { Button, Switch, TextInput } from '$lib/components';
	import { Bell } from '$lib/components/icons';
	import { request } from '$lib/request';
	import type { methodId } from '$lib/server/api/ApiManager';

	let method: string = $state('');
	let body: string = $state('');
	let result: unknown = $state('');
	let route = $state(window.location.origin);

	async function sendNotification() {
		try {
			let permission = Notification.permission;
			if (permission === 'default') {
				permission = await Notification.requestPermission();
			}
			if (permission !== 'granted') return;
	
			navigator.serviceWorker.ready.then((registration) => {
				registration.showNotification('Test Notification', {
					icon: '/icons/icon-192x192.png',
					actions: [{
						action: 'a',
						title: 'Action A'
					}, {
						action: 'b',
						title: 'Action B'
					}]
				})
			})
		} catch (e) {
			alert(e)
		}
	}
</script>

<div class="wrapper">
	<div class="card">
		<TextInput placeholder="Method" bind:value={method} />
		<TextInput placeholder="Body" bind:value={body} />
		<Button
			onclick={async () => {
				result = await request(method as methodId, JSON.parse(body));
			}}
		>
			Send request to <code class="code">/{method}</code>
		</Button>
		<pre>{JSON.stringify(result, null, 2)}</pre>
	</div>
	<div class="card">
		<TextInput bind:value={route} />
		<Button>Update link</Button>
		<div class="row">
			<Button variant="secondary">Set to localtunnel</Button>
			<Button variant="secondary">Set to ngrok</Button>
		</div>
	</div>
	<div class="card">
		<Button prefixIcon={Bell} onclick={sendNotification}>Send Notification</Button>
	</div>
</div>

<style lang="scss">
	@import '/src/styles/mixins.scss';

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
