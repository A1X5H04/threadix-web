import PostItem from "@/components/post/item";
import React from "react";

interface PostTabsProps {
  searchQuery: string;
}

function PostTab({ searchQuery }: PostTabsProps) {
  return (
    <div className="overflow-scroll space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostItem key={index} />
      ))}
    </div>
  );
}

export default PostTab;
