<p align="center">
    <img src="https://i.imgur.com/DnudRMs.png" alt="Campfire Logo" width="128" height="128">
    <h1 align="center">Campfire <img alt="license" src="https://img.shields.io/badge/BETA-F16E14?style=flat-square"></h1>
</p>

<p align="center">
	<a aria-label="License" href="https://github.com/sadnesszephyr/campfire/blob/main/LICENSE">
		<img alt="license" src="https://img.shields.io/github/license/sadnesszephyr/campfire?style=flat-square&labelColor=1A1A1A">
	</a>
</p>

**Campfire** is a UI-game in Telegram based on [Mini Apps](https://core.telegram.org/bots/webapps) (Web Apps) technology, built with [SvelteKit](https://kit.svelte.dev/).

Features:

* Economy system
* Fishing mini-game
* Inventory system

## Setup

Setup guide can be found on [this Notion page](https://timnik.notion.site/Campfire-Setup-Guide-f8afd3486bc34b83b191d1f9b066771b).

## Project structure

This project uses SvelteKit for both client and server parts. SvelteKit makes it way easier to write the app and has a lot of utilities for API creation and state management.

The database schema is defined in `/prisma/schema.prisma`. You can generate Prisma client and push changes to your database using `npx prisma db push`.

You can see all the pages in `src/routes/` directory. Utility code, global states and components can be found in `src/lib/client` directory.

API enpoinds lay in `src/routes/api` directory, middlewared by `hooks.server.ts` file, which handles user creation and authentification, as well as validating init data coming from Telegram.

Campfire has a localization system (`src/lib/shared/localization.ts`). It works automatically, taking the language the user uses in Telegram.

Useful links:

* https://www.prisma.io/docs
* https://kit.svelte.dev/docs