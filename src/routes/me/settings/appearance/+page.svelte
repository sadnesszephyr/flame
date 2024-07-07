<script>
	import { Cell, CellGroup } from '$lib/components'
	import { Contrast } from '$lib/components/icons'
	import { goto } from '$app/navigation'

	window.Telegram.WebApp.BackButton.show()
	window.Telegram.WebApp.BackButton.onClick(() => goto('/me/settings'))
</script>

<CellGroup>
	<Cell
		type="switch"
		icon={Contrast}
		title="High contrast"
		subtitle="Add borders to some elements"
		enabled={true}
	/>
	<Cell
		type="default"
		icon={Contrast}
		title="High contrast"
		subtitle="Add borders to some elements"
	/>
	<Cell
		type="switch"
		icon={Contrast}
		title="High contrast"
		subtitle="Add borders to some elements"
		enabled={true}
	/>
</CellGroup>
