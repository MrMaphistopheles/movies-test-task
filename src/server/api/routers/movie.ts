import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const moviesRouter = createTRPCRouter({
  movies: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.movie.findMany({
        orderBy: { id: "asc" },
        where: {
          title: {
            contains: input.title,
            mode: "insensitive",
          },
        },
      });
    }),
  movie: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.movie.findUnique({
        where: { id: input.id },
      });
    }),

  deleteMovie: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.movie.delete({
        where: { id: input.id },
      });
    }),

  toggleFavorite: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const movie = await ctx.db.movie.findUnique({
        where: { id: input.id },
      });

      if (!movie) {
        throw new Error("Movie not found");
      }

      return await ctx.db.movie.update({
        where: { id: input.id },
        data: { favorite: !movie.favorite },
      });
    }),
});
