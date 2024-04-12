import { number, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const moviesRouter = createTRPCRouter({
  movies: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.movie.findMany({});
  }),
  movie: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.movie.findUnique({
        where: { id: input.id },
      });
    }),
});
