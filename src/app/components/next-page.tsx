import Link from "next/link";
import LinkButton from "./link-button";

interface NextPage {
  page: number;
  lastPage: number;
  currentSearchParams: URLSearchParams;
}

export default function NextPage(props: NextPage) {
  const { page, lastPage, currentSearchParams } = props;

  const newSearchParams = new URLSearchParams(currentSearchParams);

  newSearchParams.set("page", `${page + 1}`);

  const isDisabled = !!(page >= lastPage);

  return (
    <LinkButton href={`/?${newSearchParams}`} disabled={isDisabled}>
      Next
    </LinkButton>
  );
}
