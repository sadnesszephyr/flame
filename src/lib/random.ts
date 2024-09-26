import cryptoEs from 'crypto-es'

export function random(seed?: string | number) {
	if (seed === undefined) {
		seed = Date.now()
	}

	const hash = cryptoEs.SHA256(seed.toString())

	return parseInt(hash.toString(), 16) / 16 ** 64
}

export function selectWeightedRandom<T>(items: T[], getWeight: (item: T) => number, seed?: string | number): T {
	const weights = [getWeight(items[0])]

	for (let i = 1; i < items.length; i++) {
		weights.push(getWeight(items[i]) + weights[i - 1])
	}

	const randomValue = random(seed) * weights.at(-1)!

	for (let i = 0; i < weights.length; i++) {
		if (weights[i] > randomValue) {
			return items[i]
		}
	}

	return items[0]
}
