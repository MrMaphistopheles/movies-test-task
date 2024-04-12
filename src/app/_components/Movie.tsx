"use client";
import Image from "next/image";
import { api } from "~/trpc/react";
import { Button } from "@nextui-org/react";
import GlassBtn from "./ui/GlassBtn";
import Star from "~/assets/svg/Star";
import Edit from "../../assets/svg/Edit";
import TrashBin from "../../assets/svg/TrashBin";
import { useRouter } from "next/navigation";
import LoadingSpiner from "./LoadingSpiner";
import Link from "next/link";

export default function Movie({ id }: { id: string }) {
  // Get the router instance
  const router = useRouter();

  // Fetch the movie data
  const { data, refetch, isLoading } = api.movie.movie.useQuery({
    id: parseInt(id),
  });

  // Delete the movie data
  const { mutate, isPending, isError } = api.movie.deleteMovie.useMutation({
    onSuccess: async () => {
      router.push("/");
    },
  });
  // Toggle the favorite status of the movie
  const toggleFavorite = api.movie.toggleFavorite.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  // Handle the deletion of the movie
  const handleDeletion = (id: number | undefined) => {
    if (!id) return;
    mutate({ id });
  };
  // Handle the toggling of the favorite status of the movie
  const handleTogle = (id: number | undefined) => {
    if (!id) return;

    toggleFavorite.mutate({ id });
  };

  if (isLoading) {
    return <LoadingSpiner />; // match better way to create a loading sckeleton than the spinner but is't test project
  }

  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-between px-4 py-5  text-lg text-white">
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

      {isError || toggleFavorite.isError ? (
        <div className="flex w-full max-w-[30em] items-center justify-between rounded-xl bg-red-600 p-3">
          <p className="text-white">An error occurred</p>
          <GlassBtn onClick={() => refetch()}>Retry</GlassBtn>
        </div>
      ) : (
        <div className="glass flex w-full max-w-[30em] items-center justify-between rounded-xl p-3">
          <Button
            onClick={() => handleDeletion(data?.id)}
            className="bg-red-600 text-white"
            size="md"
            aria-label="delete button"
          >
            {isPending ? (
              "Deleting..."
            ) : (
              <div className="flex items-center justify-center">
                <TrashBin /> Delete
              </div>
            )}
          </Button>
          <div className="flex gap-2">
            <Link href={`/edit/${data?.id}`}>
              <GlassBtn>
                <Edit /> Edit
              </GlassBtn>
            </Link>

            <GlassBtn onClick={() => handleTogle(data?.id)}>
              <Star color={data?.favorite === true ? "#ffcc00" : "white"} />
            </GlassBtn>
          </div>
        </div>
      )}
    </div>
  );
}

function toLocaleDateString(date: string) {
  return new Date(date).toLocaleDateString();
}
