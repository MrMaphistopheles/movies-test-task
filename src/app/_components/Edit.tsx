"use client";

import { Slider } from "@nextui-org/react";
import React, { useState } from "react";
import Star from "~/assets/svg/Star";
import GlassBtn from "./ui/GlassBtn";
import { type Movie } from "@prisma/client";
import File from "~/assets/svg/File";

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
        className="text-b flex w-10/12 max-w-[30em] flex-col items-center justify-center gap-3"
        onSubmit={handleSubmit}
        aria-label="Edit Movie Form"
      >
        <input
          aria-label="Image URL"
          className="text-b w-full min-w-0 rounded-lg border-2 border-black bg-transparent p-2 placeholder-gray-700 outline-none"
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
          className="text-b w-full min-w-0 rounded-lg border-2 border-black bg-transparent p-2 placeholder-gray-700 outline-none"
        />
        <span className="text-b flex w-full items-center justify-end gap-1">
          <p className="text-lg"> {rating}</p> <Star color="#fff" />
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
          className="text-b w-full min-w-0 rounded-lg border-2 border-black bg-transparent p-2 placeholder-gray-700 outline-none"
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
          className="text-b w-full min-w-0 rounded-lg border-2 border-black bg-transparent p-2 placeholder-gray-700 outline-none"
          name="releaseDate"
        />
        <input
          aria-label="Genre"
          placeholder="Genre"
          id="genre"
          name="genre"
          defaultValue={data?.genre.join().replace(/,/g, " ") ?? ""}
          className="text-b w-full min-w-0 rounded-lg border-2 border-black bg-transparent p-2 placeholder-gray-700 outline-none"
        />
        <input
          aria-label="Actors"
          placeholder="Actors"
          id="actors"
          name="actors"
          defaultValue={data?.actors.join().replace(/,/g, " ") ?? ""}
          className="text-b w-full min-w-0 rounded-lg border-2 border-black bg-transparent p-2 placeholder-gray-700 outline-none"
        />
        <input
          aria-label="Director"
          placeholder="Director"
          id="director"
          defaultValue={data?.director ?? ""}
          className="text-b w-full min-w-0 rounded-lg border-2 border-black bg-transparent p-2 placeholder-gray-700 outline-none"
          name="director"
        />
        <GlassBtn width="6.5" padding="1">
          {isPending ? (
            "Loading..."
          ) : (
            <div className="flex items-center justify-center gap-1">
              <File /> <p className="font-bold"> Save</p>
            </div>
          )}
        </GlassBtn>
      </form>
    </div>
  );
}
