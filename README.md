# Guild Manager App

This app is a game where you can control a guild of heroes similar to a sports team. 
Hire heroes, train them, send them on quests, and compete in the league of guilds.

## How to get started contributing to this app

- install prerequisites:
  - git [git for windows](https://gitforwindows.org/)
  - nodejs (recommend using nvm for node version management) [mac/linux](https://github.com/nvm-sh/nvm) [windows](https://github.com/coreybutler/nvm-windows)
  - yarn:
    - npm: `npm install yarn` or globally with `npm install --global yarn`
    - chocolatey: `choco install yarn`
  - docker
- clone repository and create local .env
- run `yarn install` to install dependencies
- build postgres docker containers `docker compose -f "docker-compose.yml" up -d --build`
- setup prisma
  - populate prisma dbs `yarn prisma db push`
  - migrate `yarn prisma migrate dev`
  - generate client `yarn prisma generate`
- run app `yarn dev`

## Technologies Used

- [nextjs](https://nextjs.org/)
- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

To Run App:
right-click docker-compose.yml => compose up
in terminal window => yarn dev

To end:
in terminal window => ctrl + c 
right-click docker-compose.yml => compose down