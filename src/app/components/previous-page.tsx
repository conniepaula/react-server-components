import Link from "next/link";
import LinkButton from "./link-button";

interface PreviousPageProps {
  page: number;
  currentSearchParams: URLSearchParams;
}

export default function PreviousPage(props: PreviousPageProps) {
  const { page, currentSearchParams } = props;

  const newSearchParams = new URLSearchParams(currentSearchParams);
  if (page > 2) {
    newSearchParams.set("page", `${page - 1}`);
  } else {
    newSearchParams.delete("page");
  }
  const isDisabled = !!(page <= 1);

  return (
    <LinkButton href={`/?${newSearchParams}`} disabled={isDisabled}>
      Previous
    </LinkButton>
  );
}
