import type { AppManager } from '$lib/AppManager/AppManager'
import { StandaloneAppManager } from '$lib/AppManager/StandaloneAppManager'
import { TmaAppManager } from '$lib/AppManager/TmaAppManager'

export const appManager: AppManager = window.Telegram.WebApp.initData ? new TmaAppManager() : new StandaloneAppManager()
