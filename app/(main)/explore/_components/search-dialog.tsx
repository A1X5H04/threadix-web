"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  RiArrowRightSLine,
  RiCloseFill,
  RiSearch2Line,
} from "@remixicon/react";
import React, { useState } from "react";
import SearchBar from "./search-bar";
import useSWRMutation from "swr/mutation";
import { POST } from "@/lib/fetcher";
import { Tag, User } from "@/types/api-responses/common";
import UserItemHorizontal from "./user-item-horizontal";
import HashTagItem from "./hashtag-item";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";

type MutationArg = {
  searchTerm: string;
};

type ResponseData = {
  results: { id: string; word: string; score: number }[];
  tags: Tag[];
  users: User[];
};

function SearchDialog() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const { trigger, data, isMutating } = useSWRMutation<
    ResponseData,
    null,
    string,
    MutationArg
  >("/api/explore", POST);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="w-full justify-start gap-x-2"
        >
          <RiSearch2Line className="text-muted-foreground size-5" />
          {searchParams.get("q") || "Search"}
        </Button>
        {searchParams.get("q") && (
          <Link href="/explore" className="absolute right-3 py-2 px-1">
            <RiCloseFill className="size-5 text-muted-foreground" />
          </Link>
        )}
      </div>

      <DialogContent className="w-full max-w-2xl">
        <SearchBar
          defaultValue={searchParams.get("q") || ""}
          onEnter={() => setIsOpen(false)}
          isLoading={isMutating}
          onChange={(value) => {
            if (
              value.trim() &&
              value.trim().length > 2 &&
              value.trim() != searchParams.get("q")
            ) {
              trigger({ searchTerm: value });
            }
          }}
        />
        <div
          onClick={() => setIsOpen(false)}
          className="mt-2 max-h-96 overflow-y-auto no-scrollbar"
        >
          {data?.results.map((result, index) => (
            <Link
              key={result.id}
              href={`/explore/search?q=${result.word}`}
              shallow
              replace
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex flex-col">
                  <p className="font-semibold text-sm">{result.word}</p>
                  <p className="text-xs text-muted-foreground">
                    Score: {result.score.toFixed(2)}
                  </p>
                </div>
                <RiArrowRightSLine className="size-5 text-muted-foreground" />
              </div>
              {index !== data.results.length - 1 && (
                <Separator className="my-2" />
              )}
            </Link>
          ))}

          {data && data?.tags.length > 0 && <Separator className="my-4" />}
          {data?.tags.map((tag) => (
            <HashTagItem key={tag.id} tag={tag} />
          ))}
          {data && data?.users.length > 0 && <Separator className="my-4" />}
          {data?.users.map((user) => (
            <UserItemHorizontal key={user.username} user={user} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
