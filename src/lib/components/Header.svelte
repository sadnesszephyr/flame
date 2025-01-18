<script>
	import { ripple } from '$lib/actions'
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import { getExpForNextLevel } from '$lib/leveling'
	import { useClientUser } from '$lib/clientUser.svelte'

	const clientUser = useClientUser()

	const xpProgress = tweened(clientUser.exp, {
		duration: 200,
		easing: cubicOut
	})

	const coinsDisplayValue = tweened(clientUser.coins, {
		duration: 500,
		easing: cubicOut
	})

	const rubiesDisplayValue = tweened(clientUser.rubies, {
		duration: 500,
		easing: cubicOut
	})
</script>

<header class="header">
	<button use:ripple class="level">
		<span>{clientUser.level}</span>
		<div class="level-progress">
			<div
				class="level-progress-value"
				style:width={($xpProgress / getExpForNextLevel(clientUser.level)) * 100 + '%'}
			></div>
		</div>
	</button>
	<div class="wallet">
		<a href="/wallet" class="currency" use:ripple class:negative={$coinsDisplayValue < 0}>
			{Math.round($coinsDisplayValue)}
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M12.8852 19.3774C8.24889 21.2978 2.9817 18.596 0.969693 13.7386C-1.04232 8.88118 0.771688 3.24626 5.40798 1.32584L7.10576 0.622601C11.7421 -1.29782 17.0092 1.40398 19.0213 6.2614C21.0333 11.1188 19.2193 16.7537 14.583 18.6742L12.8852 19.3774Z" fill="#51200C"/>
				<path d="M2.12397 13.2605C3.92469 17.6078 8.52858 19.8297 12.4071 18.2231L14.1048 17.5199C17.9833 15.9134 19.6677 11.0868 17.867 6.73953C16.0663 2.39222 11.4624 0.170375 7.58388 1.77689L5.8861 2.48014C2.00762 4.08666 0.323258 8.91319 2.12397 13.2605Z" fill="#DF7919"/>
				<path d="M17.867 6.73953C19.6677 11.0868 17.9833 15.9134 14.1048 17.5199C10.2264 19.1264 5.62246 16.9046 3.82175 12.5573C2.02103 8.20995 3.7054 3.38341 7.58388 1.77689C11.4624 0.170375 16.0663 2.39222 17.867 6.73953Z" fill="#FFFE93"/>
				<path d="M14.1048 17.5199C17.9833 15.9134 19.6677 11.0868 17.867 6.73952C17.537 5.94287 17.1129 5.2176 16.6163 4.57419C11.188 5.67213 6.82299 9.70262 5.2462 14.9409C7.47321 17.6526 11.0187 18.7982 14.1048 17.5199Z" fill="#FCD95A"/>
				<path d="M15.0116 7.92224C16.1768 10.7352 15.2556 13.7884 12.9541 14.7417C10.6526 15.695 7.84226 14.1875 6.67709 11.3745C5.51192 8.56155 6.43312 5.50837 8.73463 4.55505C11.0361 3.60173 13.8465 5.10927 15.0116 7.92224Z" fill="#E0852D"/>
				<path d="M15.0116 7.92224C16.1768 10.7352 15.2556 13.7884 12.9541 14.7417C10.6526 15.695 7.84226 14.1875 6.67709 11.3745C5.51192 8.56155 6.43312 5.50837 8.73463 4.55505C11.0361 3.60173 13.8465 5.10927 15.0116 7.92224Z" fill="#E0852D"/>
				<path d="M14.0856 8.30584C12.9996 5.68417 10.4847 4.19641 8.28448 4.77795C6.31748 5.92253 5.59116 8.75286 6.67709 11.3745C7.76303 13.9962 10.278 15.484 12.4782 14.9024C14.4452 13.7578 15.1715 10.9275 14.0856 8.30584Z" fill="#F9B43E"/>
			</svg>
		</a>
		<a href="/wallet" class="currency" use:ripple class:negative={$rubiesDisplayValue < 0}>
			{Math.round($rubiesDisplayValue)}
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M10.4604 17.2196L19.2071 7.84117C19.4264 7.60601 19.4315 7.24281 19.2188 7.00159L16.4756 3.88975C16.4032 3.80759 16.3104 3.74591 16.2066 3.71088L13.1796 2.68908C13.1152 2.66734 13.0477 2.65625 12.9797 2.65625H7.02027C6.9523 2.65625 6.88478 2.66734 6.82038 2.68908L3.79335 3.71088C3.68958 3.74591 3.59683 3.80759 3.52441 3.88975L0.781164 7.00159C0.56852 7.24281 0.573611 7.60601 0.792932 7.84117L9.53963 17.2196C9.55669 17.2382 9.5748 17.2557 9.59386 17.2719C9.63046 17.3032 9.67052 17.3301 9.71319 17.3522C9.78169 17.3876 9.85692 17.4104 9.93538 17.4185C9.9567 17.4207 9.97827 17.4219 10 17.4219C10.0145 17.4219 10.029 17.4214 10.0433 17.4204C10.1157 17.4154 10.1857 17.3979 10.2505 17.3695C10.3013 17.3472 10.349 17.3183 10.3923 17.2835C10.4164 17.264 10.4392 17.2426 10.4604 17.2196Z" fill="#CC0001" stroke="#400000" stroke-width="1.25" stroke-linejoin="round"/>
				<path d="M6.81226 5.96067C6.87907 5.98425 6.9494 5.9963 7.02025 5.9963H12.9797C13.0506 5.9963 13.1209 5.98425 13.1877 5.96067L16.2147 4.89243C16.4661 4.80371 16.6336 4.56533 16.6317 4.29877C16.6299 4.0322 16.4592 3.79613 16.2066 3.71088L13.1796 2.68908C13.1152 2.66734 13.0477 2.65625 12.9797 2.65625H7.02025C6.95228 2.65625 6.88476 2.66734 6.82036 2.68908L3.79333 3.71088C3.54076 3.79613 3.37007 4.0322 3.36824 4.29877C3.36641 4.56533 3.53386 4.80371 3.78523 4.89243L6.81226 5.96067Z" fill="#FE9494" stroke="#400000" stroke-width="1.25" stroke-linejoin="round"/>
				<path d="M7.02026 3.28125L12.9797 5.3713L16.0067 4.30305L12.9797 3.28125H7.02026Z" fill="#FFC6C6"/>
				<path d="M1.25 7.41488L5.88513 8.94758L7.02027 5.37129L3.99324 4.30304L1.25 7.41488Z" fill="#FB191D"/>
				<path d="M1.25 7.41492L10 16.7969L5.88513 8.94762L1.25 7.41492Z" fill="#FF6D6E"/>
				<path d="M14.1149 8.94758L18.75 7.41488L16.0068 4.30304L12.9797 5.37129L14.1149 8.94758Z" fill="#CC0001"/>
				<path d="M5.88513 8.94757L10 16.7969L14.1149 8.94757H5.88513Z" fill="#CC0001"/>
				<path d="M10 16.7969L18.75 7.41492L14.1149 8.94762L10 16.7969Z" fill="#7C0000"/>
				<path d="M7.02027 5.37128L5.88513 8.94758H14.1149L12.9797 5.37128H7.02027Z" fill="#900000"/>
			</svg>
		</a>
		<a href="/inventory" use:ripple class="inventory-button">
			<img
				draggable="false"
				class="currency-icon"
				src="https://em-content.zobj.net/source/facebook/355/backpack_1f392.png"
				alt="coins"
			/>
		</a>
	</div>
</header>

<style lang="scss">
	.header {
		height: 3rem;
		box-shadow:
			0 0.5px 0 0 rgba(0, 0, 0, 0.07),
			0 calc(-1 * var(--border-width)) 0 0 var(--border-color) inset;
		padding: 0 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--background);
		z-index: 5;
		position: relative;
		// view-transition-name: header;
		animation: none;
	}

	.level {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		height: 2rem;
		background: none;
		border: none;
		padding: 0 0.5rem;
		color: var(--foreground);
		font-size: 1rem;
		border-radius: 0.25rem;
	}

	.level-progress {
		width: 8rem;
		height: 0.5rem;
		border-radius: 0.25rem;
		background: var(--background-secondary);
		box-shadow: 0 0 0 1 rgba(0, 0, 0, 0.07) inset;
		overflow: hidden;

		&-value {
			background: var(--accent);
			height: 100%;
		}
	}

	.wallet {
		display: flex;
		gap: 1rem;
		font-weight: 500;
	}

	.currency {
		font-size: 1rem;
		line-height: 1.25rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		text-decoration: none;
		color: var(--foreground);
		border-radius: 0.25rem;
		margin: 0 -0.5rem;
		padding: 0 0.5rem;
	}

	.currency-icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.negative {
		color: var(--danger);
	}

	.inventory-button {
		aspect-ratio: 1/1;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
	}

	// .loading-indicator {
	// 	width: 100%;
	// 	height: 1px;
	// 	background: linear-gradient(to right, var(--accent), var(--background), var(--accent));
	// 	background-size: 200%;
	// 	position: absolute;
	// 	left: 0;
	// 	bottom: 0;
	// 	animation: loading 1s linear infinite;
	// }

	// @keyframes loading {
	// 	0% {
	// 		background-position-x: 0%;
	// 	}

	// 	100% {
	// 		background-position-x: -200%;
	// 	}
	// }
</style>
