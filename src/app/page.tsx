"use client";

import { api } from "~/trpc/react";
import Card from "./_components/Card";

export default function Home() {
  const { data } = api.movie.movies.useQuery();
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-4">
      {data?.map((movie) => <Card key={movie.id} movie={movie} />)}
    </div>
  );
}
