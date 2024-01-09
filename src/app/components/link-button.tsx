import Link, { LinkProps } from "next/link";

interface LinkButtonProps extends LinkProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export default function LinkButton(props: LinkButtonProps) {
  const { disabled = false, children } = props;
  return !disabled ? (
    <Link
      className="
    bg-neutral-900 font-semibold hover:transition-colors  hover:bg-neutral-800/[0.7] rounded-md border border-neutral-800/[.6] px-3 py-2 inline-flex items-center justify-center text-sm text-neutral-200"
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button
      disabled
      className="opacity-50
    bg-neutral-900 font-semibold rounded-md border border-neutral-800/[.6] px-3 py-2 inline-flex items-center justify-center text-sm text-neutral-200"
    >
      {children}
    </button>
  );
}
