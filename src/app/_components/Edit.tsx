"use client";

import { Slider } from "@nextui-org/react";
import React, { useState } from "react";
import Star from "~/assets/svg/Star";
import GlassBtn from "./ui/GlassBtn";
import { type Movie } from "@prisma/client";

type Data = {
  id: number;
  title: string;
  description: string;
  rating: number;
  releaseDate: string;
  genre: string;
  actors: string;
  director: string;
  image: string;
};

export default function Edit({
  mutate,
  isPending,
  id,
  data,
}: {
  mutate: (obj: Data) => void;
  isPending: boolean;
  id?: number;
  data?: Movie | null;
}) {
  const [rating, setRating] = useState(data?.rating ?? 5);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // FormData object
    const data = Object.fromEntries(formData); // Object

    const sendData: Data = {
      rating,
      id: id ?? 0,
      title: data.title as string,
      description: data.description as string,
      releaseDate: data.releaseDate as string,
      genre: data.genre as string,
      actors: data.actors as string,
      director: data.director as string,
      image: data.image as string,
    }; // add rating to data

    mutate(sendData); // send data to the server
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-2">
      <form
        className="flex w-10/12 max-w-[30em] flex-col items-center justify-center gap-2 text-white"
        onSubmit={handleSubmit}
      >
        <input
          aria-label="Image URL"
          className="w-full min-w-0 rounded-lg border-2 border-white bg-transparent p-2 text-white"
          defaultValue={data?.image ?? ""}
          id="image"
          name="image"
          placeholder="Image URL"
        />
        <input
          aria-label="Title"
          defaultValue={data?.title ?? ""}
          id="title"
          name="title"
          placeholder="Title"
          className="w-full min-w-0 rounded-lg border-2 border-white bg-transparent p-2 text-white"
        />
        <span className="flex w-full items-center justify-end gap-1 text-white">
          <p className="text-lg"> {rating}</p> <Star color="#ffcc00" />
        </span>
        <Slider
          aria-label="Rating"
          color="foreground"
          size="sm"
          step={0.01}
          maxValue={10}
          minValue={0}
          defaultValue={rating}
          onChange={(value) => setRating(value as number)}
          className="max-w-md"
        />
        <textarea
          aria-label="description"
          placeholder="Description"
          className="w-full min-w-0 rounded-lg border-2 border-white bg-transparent p-2 text-white"
          id="description"
          defaultValue={data?.description ?? ""}
          name="description"
        />
        <input
          aria-label="Release Date"
          type="date"
          placeholder="Release Date"
          id="releaseDate"
          defaultValue={data?.releaseDate ?? ""}
          className="w-full min-w-0 rounded-lg border-2 border-white bg-transparent p-2 text-white"
          name="releaseDate"
        />
        <input
          aria-label="Genre"
          placeholder="Genre"
          id="genre"
          name="genre"
          defaultValue={data?.genre ?? ""}
          className="w-full min-w-0 rounded-lg border-2 border-white bg-transparent p-2 text-white"
          onChange={(e) => console.log(e.target.value.split(" "))}
        />
        <input
          aria-label="Actors"
          placeholder="Actors"
          id="actors"
          name="actors"
          defaultValue={data?.actors ?? ""}
          className="w-full min-w-0 rounded-lg border-2 border-white bg-transparent p-2 text-white"
          onChange={(e) => console.log(e.target.value.split(" "))}
        />
        <input
          aria-label="Director"
          placeholder="Director"
          id="director"
          defaultValue={data?.director ?? ""}
          className="w-full min-w-0 rounded-lg border-2 border-white bg-transparent p-2 text-white"
          name="director"
          onChange={(e) => console.log(e.target.value)}
        />
        <GlassBtn width="6" padding="3">
          {isPending ? "Loading..." : "Save"}
        </GlassBtn>
      </form>
    </div>
  );
}
