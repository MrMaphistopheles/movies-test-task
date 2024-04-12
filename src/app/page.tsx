"use client";

// For this page better use server action to fetch data from the server for SEO purposes

import { api } from "~/trpc/react";
import Card from "./_components/Card";
import NavBar from "./_components/NavBar";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  // Fetch the movies data
  const { data, refetch } = api.movie.movies.useQuery({ title: search });

  return (
    <>
      <NavBar setSearch={setSearch} />

      <div className="flex h-full w-full flex-wrap items-center justify-center gap-4">
        {data?.map((movie) => (
          <Card key={movie.id} movie={movie} refetch={refetch} />
        ))}
      </div>
    </>
  );
}
