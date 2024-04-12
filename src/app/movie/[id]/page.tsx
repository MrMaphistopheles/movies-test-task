import Movie from "~/app/_components/Movie";

export default function Page({ params }: { params: { id: string } }) {
  return <Movie id={params.id} />;
}
