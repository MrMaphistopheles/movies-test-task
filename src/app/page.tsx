"use client";

// For this page better use server action to fetch data from the server for SEO purposes

import { api } from "~/trpc/react";
import Card from "./_components/Card";
import NavBar from "./_components/NavBar";
import { useState } from "react";
import { Skeleton } from "@nextui-org/react";

export default function Home() {
  const [search, setSearch] = useState("");

  // Fetch the movies data
  const { data, refetch, isLoading } = api.movie.movies.useQuery({
    title: search,
  });

  if (isLoading)
    return (
      <>
        <NavBar setSearch={setSearch} />
        <LoadingSkeleton />;
      </>
    );

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

function LoadingSkeleton() {
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-4">
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-4">
        {[...Array(10).keys()].map((i) => (
          <Skeleton key={i} className="rounded-2xl bg-slate-50">
            <div className="h-[370px] w-[320px] rounded-2xl bg-yellow-300 "></div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
