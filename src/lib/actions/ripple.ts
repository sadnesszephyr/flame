import type { Action } from 'svelte/action'

const downEvents = [
	'pointerdown',
	'touchstart'
] as const
const upEvents = [
	'pointerup',
	'mouseleave',
	'dragleave',
	'toucmmove',
	'touchend',
	'touchcancel'
] as const

export const ripple: Action = (element: HTMLElement) => {
	if (!element.classList.contains('with-ripple')) {
		element.classList.add('with-ripple')
	}

	downEvents.forEach((event) => {
		element.addEventListener(event, createRipple)
	})

	return {
		destroy() {
			downEvents.forEach((event) => {
				element.removeEventListener(event, createRipple)
			})
		}
	}
}


function createRipple(event: PointerEvent | TouchEvent) {
	const parentElement = event.currentTarget

	if (!(parentElement instanceof HTMLElement)) return

	for (const child of parentElement.children) {
		const { classList } = child
		if (classList.contains('ripple') && !classList.contains('fade')) return
	}

	const clientX = event instanceof TouchEvent
		? event.touches[0].clientX
		: event.clientX
	const clientY = event instanceof TouchEvent
		? event.touches[0].clientY
		: event.clientY

	const rect = parentElement.getBoundingClientRect()
	const radius = findDistanceToFurthestPoint(
		rect.width,
		rect.height,
		clientX - rect.left,
		clientY - rect.top
	)

	const rippleElement = document.createElement('span')
	rippleElement.classList.add('ripple')

	const size = radius * 2
	const left = clientX - rect.left
	const top = clientY - rect.top

	rippleElement.style.left = left + 'px'
	rippleElement.style.top = top + 'px'

	rippleElement.style.width = size + 'px'

	parentElement.appendChild(rippleElement)

	upEvents.forEach((eventName) => {
		document.addEventListener(eventName, () => {
			removeRipple(rippleElement)
		}, {
			once: true
		})
	})
}

function removeRipple(rippleElement: HTMLElement) {
	if (rippleElement === null) return

	rippleElement.classList.add('fade')
	rippleElement.style.opacity = '0'

	rippleElement.addEventListener('transitionend', () => {
		rippleElement.remove()
	}, { once: true })
}

function findDistanceToFurthestPoint(
	elementWidth: number,
	elementHeight: number,
	clickX: number,
	clickY: number
) {
	const x = clickX > elementWidth / 2 ? 0 : elementWidth
	const y = clickY > elementHeight / 2 ? 0 : elementHeight
	return Math.hypot(x - clickX, y - clickY)
}
