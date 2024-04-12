"use client";
import Image from "next/image";
import { api } from "~/trpc/react";
import { Button } from "@nextui-org/react";
import GlassBtn from "./ui/GlassBtn";
import Star from "~/assets/svg/Star";
import Edit from "../../assets/svg/Edit";
import TrashBin from "../../assets/svg/TrashBin";

export default function Movie({ id }: { id: string }) {
  const { data } = api.movie.movie.useQuery({ id: parseInt(id) });
  console.log(data);

  return (
    <div className="flex h-[97dvh] w-full flex-col items-center justify-between px-4 py-5  text-lg text-white">
      <div className="flex w-full max-w-[30em] flex-col items-center justify-start gap-4 overflow-auto py-3">
        <Image
          src={
            data?.image ??
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
          }
          alt={`${data?.title} image`}
          width={320}
          height={450}
        />

        <h1 className="text-2xl font-bold text-white">{data?.title}</h1>

        <span className="flex w-full items-center gap-2">
          <p>Rating: {data?.rating}</p> <Star color="#ffd500" />
        </span>

        <span className="flex w-full  items-center gap-2">
          Release date: {toLocaleDateString(data?.releaseDate ?? "")}
        </span>

        <p>{data?.description}</p>

        <span className="flex w-full flex-wrap items-center gap-2">
          Genre: {data?.genre.map((genre) => <p key={genre}>{genre}</p>)}
        </span>

        <span className="flex w-full flex-wrap items-center gap-2">
          Actors: {data?.actors.map((actor) => <p key={actor}>{actor}</p>)}
        </span>

        <span className="flex w-full  items-center gap-2">
          Director: {data?.director}
        </span>
      </div>

      <div className="glass flex w-full max-w-[30em] items-center justify-between rounded-xl p-3">
        <Button className="bg-red-600 text-white" size="md">
          <TrashBin /> Delete
        </Button>
        <div className="flex gap-2">
          <GlassBtn>
            <Edit /> Edit
          </GlassBtn>
          <GlassBtn>
            <Star color="#ffd500" />
          </GlassBtn>
        </div>
      </div>
    </div>
  );
}

function toLocaleDateString(date: string) {
  return new Date(date).toLocaleDateString();
}
