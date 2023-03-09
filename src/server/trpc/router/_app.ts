import { authRouter } from "./auth";
import { crewRouter } from "./crew";
import { encounterRouter } from './encounter';
import { exampleRouter } from "./example";
import { guildRouter } from './guild';
import { heroRouter } from './hero';
import { partyRouter } from './party';
import { questRouter } from "./quest";
import { router } from "../trpc";
import { staffRouter } from "./staff";

export const appRouter = router({
  auth: authRouter,
  crew: crewRouter,
  encounter: encounterRouter,
  example: exampleRouter,
  guild: guildRouter,
  hero: heroRouter,
  party: partyRouter,
  quest: questRouter,
  staff: staffRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
