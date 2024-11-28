import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { RiLoader2Fill, RiSearch2Line } from "@remixicon/react";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function SearchBar({
  defaultValue,
  isLoading,
  onChange,
  onEnter,
}: {
  defaultValue: string;
  isLoading: boolean;
  onChange: (debouncedValue: string) => void;
  onEnter: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const debouncedsearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    onChange(debouncedsearch);
  }, [debouncedsearch]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-4 flex items-center">
        <RiSearch2Line className="text-muted-foreground size-5" />
      </div>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            pathname.startsWith("/explore/search")
              ? router.replace(`/explore/search?q=${searchTerm}`)
              : router.push(`/explore/search?q=${searchTerm}`);
            onEnter();
          }
        }}
        placeholder="Search"
        className="h-10 indent-8 text-sm"
      />
      <div className="absolute inset-y-0 right-4 flex items-center">
        {isLoading || (searchTerm && debouncedsearch !== searchTerm) ? (
          <RiLoader2Fill className="w-4 h-4 animate-spin text-muted-foreground" />
        ) : null}
      </div>
    </div>
  );
}

export default SearchBar;
