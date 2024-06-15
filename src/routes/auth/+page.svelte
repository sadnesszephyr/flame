<script script lang="ts">
	import { page } from '$app/stores';
	import { request } from '$lib/client/request'

	const { searchParams } = $page.url

	let res: any = null

	request('auth', {
		code: searchParams.get('code'),
		userId: parseInt(searchParams.get('user_id') || '0')
	}).then((data) => {
		localStorage.setItem('token', data.token)
		res = data
	})
</script>

<div class="nav-card-list">
	Authorizing...

	<pre>{JSON.stringify(res, null, 2)}</pre>
</div>

<style lang="scss">
	
</style>
