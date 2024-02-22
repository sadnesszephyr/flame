<script lang="ts">
	import { LottiePlayer } from '@lottiefiles/svelte-lottie-player'
</script>

<div class="wrapper">
	<LottiePlayer src="/animations/tent.json" autoplay width={192} />
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
