// components/providers/search-provider-wrapper.tsx
"use client";

import { useSearch } from "../hooks/use-search";
import { SearchDialog } from "./search-dialog";

export default function SearchProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useSearch();

  return (
    <>
      {children}
      <SearchDialog open={open} setOpen={setOpen} />
    </>
  );
}
