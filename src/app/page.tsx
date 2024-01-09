import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import SearchInput from "@/app/components/search-input";
import NextPage from "@/app/components/next-page";
import PreviousPage from "./components/previous-page";

let users = [
  {
    name: "Kenneth Bell",
    email: "kenneth.bell@example.com",
  },
  {
    name: "Mattie Conway",
    email: "mattie.conway@example.com",
  },
  {
    name: "Lola B. Graham",
    email: "lolab.graham@example.com",
  },
  {
    name: "Cara Fuentes",
    email: "cara.fuentes@example.com",
  },
];

export default async function Users({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  const usersPerPage = 7;
  const numberOfUsers = await prisma.user.count({
    where: { name: { contains: search } },
  });
  const lastPage = Math.ceil(numberOfUsers / usersPerPage);
  const page =
    typeof searchParams.page === "string"
      ? +searchParams.page < 1
        ? 1
        : +searchParams.page > lastPage
        ? lastPage
        : +searchParams.page
      : 1;
  const firstUserOnPage = (page - 1) * usersPerPage + 1;
  const lastUserOnPage = Math.min(page * usersPerPage, numberOfUsers);

  const users = await prisma.user.findMany({
    take: usersPerPage,
    skip: (page - 1) * usersPerPage,
    where: { name: { contains: search } },
  });

  const currentSearchParams = new URLSearchParams();
  
  if (search) {
    currentSearchParams.set("search", search);
  }
  if (page > 1 ) {
    currentSearchParams.set("page", `${page}`);
  }

  return (
    <div className="px-8 bg-neutral-950 pt-12 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="w-80 mt-1">
          <SearchInput search={search} />
        </div>
        <div className="mt-0 ml-16 flex-none">
          <button
            type="button"
            className="block rounded-md bg-violet-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-neutral-100 shadow-sm hover:bg-violet-500 hover:transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-6">
          <div className="inline-block min-w-full py-2 align-middle px-6">
            <div className="overflow-hidden shadow ring-1 ring-neutral-700 ring-opacity-30 rounded-lg">
              <table className="min-w-full divide-y divide-neutral-800/[.4]">
                <thead className="bg-neutral-900/[.5]">
                  <tr>
                    <th className="py-3.5 pr-3 text-left text-sm font-semibold text-neutral-200 pl-6">
                      ID
                    </th>{" "}
                    <th className="py-3.5 pr-3 text-left text-sm font-semibold text-neutral-200 pl-6">
                      Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-200">
                      Email
                    </th>
                    <th className="relative py-3.5 pl-3 pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/[.4] bg-neutral-900/[.9]">
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-neutral-200 pl-6">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-neutral-200 pl-6">
                        {user.name}
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                        {user.email.toLowerCase()}
                      </td>
                      <td className=" whitespace-nowrap py-4 pl-4 pr-6 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-violet-400 hover:text-violet-400 inline-flex items-center"
                        >
                          Edit
                          <ChevronRightIcon className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-x-2 flex items-center justify-between">
        <p className="text-neutral-500 text-sm">
          Showing <span className="font-semibold">{firstUserOnPage}</span> to{" "}
          <span className="font-semibold">{lastUserOnPage}</span> of{" "}
          <span className="font-semibold">{numberOfUsers}</span> users
        </p>
        <div className="space-x-2">
        <PreviousPage page={page} currentSearchParams={currentSearchParams} />
          <NextPage page={page} lastPage={lastPage} currentSearchParams={currentSearchParams} />
        </div>
      </div>
    </div>
  );
}
