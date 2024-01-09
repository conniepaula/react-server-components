import { Spinner } from "@/app/components/spinner";

export default function Loading() {
  return (
    <div className=" flex h-screen bg-neutral-950 items-center justify-center">
      <Spinner className="w-12 animate-spin text-violet-400" />
    </div>
  );
}
