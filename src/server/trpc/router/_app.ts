import { authRouter } from "./auth";
import { encounterRouter } from './encounter';
import { exampleRouter } from "./example";
import { guildRouter } from './guild';
import { heroRouter } from './hero';
import { partyRouter } from './party';
import { questRouter } from "./quest";
import { router } from "../trpc";


export const appRouter = router({
  auth: authRouter,
  encounter: encounterRouter,
  example: exampleRouter,
  guild: guildRouter,
  hero: heroRouter,
  party: partyRouter,
  quest: questRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
