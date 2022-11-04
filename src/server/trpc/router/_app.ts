import { guildRouter } from './guild';
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  auth: authRouter,
  example: exampleRouter,
  guild: guildRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
