<script lang="ts">
	import Animation from '$lib/client/components/Animation.svelte'
	import tentAnimation from '$lib/client/animations/tent.json'
</script>

<div class="wrapper">
	<Animation
		src={tentAnimation}
	/>
	<h1 class="heading">Лагеря пока в разработке</h1>
	<p>Ты сможешь объединяться с другими игроками в лагеря, развиваться, помогать друг другу и соперничать с другими лагерями.</p>
</div>

<style lang="scss">
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	text-align: center;
}

.heading {
	font-size: 1.5rem;
}
</style>
