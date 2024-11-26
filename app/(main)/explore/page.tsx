import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import PostTab from "./_components/post-tab";
import UsersTab from "./_components/users-tab";
import TagTab from "./_components/tag-tab";
import {
  RiArrowRightSLine,
  RiFireFill,
  RiSearch2Line,
  RiUserStarFill,
} from "@remixicon/react";

function SearchPage() {
  return (
    <div className="py-5">
      <div className="relative">
        <Input
          placeholder="Search Anything"
          className="h-10 indent-8 text-sm"
        />
        <div className="absolute inset-y-0 left-4 flex items-center">
          <RiSearch2Line className="text-muted-foreground size-5" />
        </div>
      </div>
      <div className="mt-4 flex justify-between text-muted-foreground text-sm">
        <div className="inline-flex items-center gap-x-2">
          <RiFireFill className="size-4" /> Trending Posts
        </div>
        <RiArrowRightSLine />
      </div>
      <div className="mt-4 flex justify-between text-muted-foreground text-sm">
        <div className="inline-flex items-center gap-x-2">
          <RiUserStarFill className="size-4" /> Popular Users
        </div>
        <RiArrowRightSLine />
      </div>
    </div>
  );
}

export default SearchPage;
