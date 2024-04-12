import { type Movie } from "@prisma/client";
import Image from "next/image";
import GlassBtn from "./ui/GlassBtn";
import Star from "../../assets/svg/Star";
import Link from "next/link";
import { api } from "~/trpc/react";
import { CircularProgress } from "@nextui-org/react";

export default function Card({
  movie,
  refetch,
}: {
  movie: Movie | undefined | null;
  refetch: () => void;
}) {
  const { mutate, isPending, isError } = api.movie.deleteMovie.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const toggleFavorite = api.movie.toggleFavorite.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleDeletion = (id: number | undefined) => {
    if (!id) return;
    mutate({ id });
  };

  const handleTogle = (id: number | undefined) => {
    if (!id) return;
    toggleFavorite.mutate({ id });
  };

  return (
    <div className=" flex h-[30em] items-center justify-between rounded-xl">
      <Image
        src={
          movie?.image ??
          "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
        }
        width={320}
        height={370}
        alt={`${movie?.title} image`}
        className="h-auto rounded-xl object-cover"
      />

      <div className=" absolute flex h-[30em] w-[320px] items-end justify-center px-2 py-4  ">
        {isError || toggleFavorite.isError ? (
          <div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-red-600 p-3">
            <p className=" py-2 text-xl font-medium text-white">
              Fetching data error
            </p>
            <GlassBtn onClick={refetch}>Retry</GlassBtn>
          </div>
        ) : (
          <div className="glass flex w-full flex-col items-center justify-center gap-2 rounded-xl p-3">
            <p className=" py-2 text-xl font-medium text-white">
              {movie?.title}
            </p>
            <div className="flex w-full items-center justify-between px-4">
              <GlassBtn onClick={() => handleDeletion(movie?.id)}>
                {isPending ? "Deleting..." : "Delete"}
              </GlassBtn>
              <GlassBtn onClick={() => handleTogle(movie?.id)}>
                <Star color={movie?.favorite === true ? "#ffcc00" : "white"} />
              </GlassBtn>
            </div>
          </div>
        )}
      </div>

      <Link
        href={`/movie/${movie?.id}`}
        className="absolute h-[20em] w-[320px] cursor-pointer"
      />
    </div>
  );
}
