import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import PostTab from "./_components/post-tab";
import UsersTab from "./_components/users-tab";
import TagTab from "./_components/tag-tab";

function SearchPage() {
  return (
    <Tabs className="w-full my-5" defaultValue="all">
      <TabsList className="w-full grid grid-cols-4 my-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="tags">Tags</TabsTrigger>
      </TabsList>
      <Input placeholder="Search Anything" />
      <TabsContent value="all">All</TabsContent>
      <TabsContent value="posts">
        <PostTab searchQuery="Hello" />
      </TabsContent>
      <TabsContent value="users">
        <UsersTab />
      </TabsContent>
      <TabsContent value="tags">
        <TagTab />
      </TabsContent>
    </Tabs>
  );
}

export default SearchPage;
