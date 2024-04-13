import Movie from "~/app/movie/_comp/Movie";

export default function Page({ params }: { params: { id: string } }) {
  return <Movie id={params.id} />;
}
