import { CircularProgress } from "@nextui-org/react";
export default function LoadingSpiner() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center">
      <CircularProgress size="lg" color="primary" />
    </div>
  );
}
