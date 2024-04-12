"use client";
import { api } from "~/trpc/react";
import Edit from "../../_components/Edit";

export default function EditMovie({ id }: { id: string }) {
  const { mutate, isPending } = api.movie.editMovie.useMutation();
  const { data } = api.movie.movie.useQuery({ id: Number(id) });

  return (
    <Edit mutate={mutate} id={Number(id)} isPending={isPending} data={data} />
  );
}
