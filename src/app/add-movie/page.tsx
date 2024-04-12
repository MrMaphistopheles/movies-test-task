"use client";
import { api } from "~/trpc/react";
import Edit from "../_components/Edit";

export default function Page() {
  const { mutate, isPending } = api.movie.addMovie.useMutation();
  return <Edit mutate={mutate} isPending={isPending} />;
}
