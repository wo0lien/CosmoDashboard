# Cosmo Dashboard

An app used in CosmoLyon association to manage volunteers attendance at events.
Login using an email that should be associated to a volunteer in the database.

## Security

Since this is just email you should not have sensitive data in the database.
Consider adding proper rate limiting ahead of the app.

## Dev doc

### Envrionnement

DB_URL       nocodb url
DB_API_KEY   nocodb api key
ORIGIN       origin url for cors


### Deploying the app

Using docker or docker compose

```yaml
version: "3"

services:
  dashboard:
    image: ghcr.io/merlou52/cosmo-dashboard:latest
    ports:
      - "3000:3000"
    env_file:
      - .env
```

### Building the app

`docker build . -t cosmo-dashboard:latest`

### Deploying container

You can deploy the container on github container registry with these commands

```bash
docker tag cosmo-dashboard:latest ghcr.io/<github_username>/cosmo-dashboard:latest
docker login
docker push ghcr.io/<github_username>/cosmo-dashboard:latest
```

### Dev

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Add SMUI elements

Need to rebuild and restart the server after each installation of a new component

```bash
npm run prepare
npm run dev -- --open
```
