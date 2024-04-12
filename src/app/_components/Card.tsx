import { type Movie } from "@prisma/client";
import Image from "next/image";
import GlassBtn from "./ui/GlassBtn";
import Star from "../../assets/svg/Star";
import Link from "next/link";

export default function Card({ movie }: { movie: Movie | undefined | null }) {
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
        className="rounded-xl object-cover"
      />

      <div className=" absolute flex h-[30em] w-[320px] items-end justify-center px-2 py-4  ">
        <div className="glass flex w-full flex-col items-center justify-center gap-2 rounded-xl p-3">
          <p className=" py-2 text-xl font-medium text-white">{movie?.title}</p>
          <div className="flex w-full items-center justify-between px-4">
            <GlassBtn>Delete</GlassBtn>
            <GlassBtn>
              <Star />
            </GlassBtn>
          </div>
        </div>
      </div>

      <Link
        href={`/movie/${movie?.id}`}
        className="absolute h-[20em] w-[320px] cursor-pointer"
      />
    </div>
  );
}
