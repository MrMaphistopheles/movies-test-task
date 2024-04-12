import EditMovie from "../_comp/EditMovie";

export default function Page({ params }: { params: { id: string } }) {
  return <EditMovie id={params.id} />;
}
