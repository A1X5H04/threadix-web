import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RiSearch2Line } from "@remixicon/react";
import React, { useState } from "react";
import SearchBar from "./search-bar";
import useSWRMutation from "swr/mutation";
import { POST } from "@/lib/fetcher";
import { Tag, User } from "@/types/api-responses/common";
import UserItemHorizontal from "./user-item-horizontal";
import HashTagItem from "./hashtag-item";

type MutationArg = {
  searchTerm: string;
};

type ResponseData = {
  tags: Tag[];
  users: User[];
};

function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { trigger, data, isMutating } = useSWRMutation<
    ResponseData,
    null,
    string,
    MutationArg
  >("/api/explore", POST);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full justify-start gap-x-2"
      >
        <RiSearch2Line className="text-muted-foreground size-5" />
        Search
      </Button>

      <DialogContent className="w-full max-w-2xl top-[20%]">
        <SearchBar
          onEnter={() => setIsOpen(false)}
          isLoading={isMutating}
          onChange={(value) => {
            if (value.trim()) {
              trigger({ searchTerm: value });
            }
          }}
        />
        <div className="mt-2">
          {data?.tags.map((tag) => (
            <HashTagItem key={tag.id} tag={tag} />
          ))}
          {data?.users.map((user) => (
            <UserItemHorizontal key={user.username} user={user} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
