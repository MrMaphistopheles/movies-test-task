"use client";
import { Input } from "@nextui-org/react";
import type { Dispatch, SetStateAction } from "react";
import { SearchIcon } from "~/assets/svg/SearchIcon";
import GlassBtn from "./ui/GlassBtn";
import Add from "~/assets/svg/Add";
import Link from "next/link";

export default function NavBar({
  setSearch,
}: {
  setSearch?: Dispatch<SetStateAction<string>>;
}) {
  return (
    <nav className="flex w-full items-center justify-center gap-3 py-4 text-white">
      <Input
        aria-label="Search"
        isClearable
        radius="lg"
        placeholder="Type to search..."
        onChange={(e) => setSearch?.(e.target.value)}
        variant="bordered"
        className="w-1/2"
        startContent={
          <SearchIcon className="pointer-events-none mb-0.5 flex-shrink-0 text-black/50 text-slate-400 dark:text-white/90" />
        }
      />
      <Link href="/add-movie">
        <GlassBtn padding="0.55">
          <Add />
        </GlassBtn>
      </Link>
    </nav>
  );
}
