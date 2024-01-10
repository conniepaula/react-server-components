"use client";
import { useState, useTransition } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

import { Spinner } from "@/app/components/spinner";

interface SearchInputProps {
  search?: string;
}

export default function SearchInput(props: SearchInputProps) {
  const { search } = props;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const isSearching = !!timeoutId || isPending;
  return (
    <div className="relative rounded-md shadow-sm">
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
          clearTimeout(timeoutId);
          const id = setTimeout(() => {
            startTransition(() => {
              if (e.target.value) {
                router.push(`/?search=${e.target.value}`);
              } else {
                router.push("/");
              }
            });
            setTimeoutId(undefined);
          }, 500);
          setTimeoutId(id);
        }}
      />
      {isSearching && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-3 pr-2">
          <Spinner
            className="h-5 w-5 text-neutral-500 animate-spin"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
