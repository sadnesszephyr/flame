/// <reference types="@sveltejs/kit"/>
/// <reference lib="webworker"/>
declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const cacheName = `cache-${version}`;
const assets = [ ...build, ...files ];

self.addEventListener('install', (event) => {
	async function cacheFiles() {
		const cache = await caches.open(cacheName);
		console.log(assets)
		await cache.addAll(assets);
	}

	event.waitUntil(cacheFiles());
});
