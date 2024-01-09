"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  search?: string;
}

export default function SearchInput(props: SearchInputProps) {
  const { search } = props;
  const router = useRouter();
  return (
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon
          className="h-5 w-5 text-neutral-700"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        className="bg-neutral-900 text-neutral-200 block w-full rounded-md border-neutral-800 pl-10 focus:ring-0 focus:border-neutral-800 focus:outline-none text-sm"
        placeholder="Search"
        defaultValue={search}
        onChange={(e) => {
          router.push(`/?search=${e.target.value}`);
        }}
      />
    </div>
  );
}
