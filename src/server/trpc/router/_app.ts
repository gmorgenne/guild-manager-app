import { guildRouter } from './guild';
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { heroRouter } from './hero';

export const appRouter = router({
  auth: authRouter,
  example: exampleRouter,
  guild: guildRouter,
  hero: heroRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
