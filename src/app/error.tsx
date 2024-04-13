"use client"; // Error components must be Client Components
import Image from "next/image";
import * as cat from "~/assets/cat.png";
import { useEffect } from "react";
import GlassBtn from "./_components/ui/GlassBtn";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Here you can log the error to an error tracking service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center text-white">
      <div className="flex h-full w-5/6 flex-col items-center justify-center gap-2 md:flex-row">
        <Image src={cat} alt="cat that saying opps" className="md:w-2/6" />
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Some thing went wrong</h1>
          <GlassBtn
            padding="0.9"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            <p className="text-xl font-bold">Try again</p>
          </GlassBtn>
        </div>
      </div>
    </div>
  );
}
