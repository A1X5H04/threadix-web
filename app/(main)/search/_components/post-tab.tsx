import React from "react";

interface PostTabsProps {
  searchQuery: string;
}

function PostTab({ searchQuery }: PostTabsProps) {
  return <div className="overflow-scroll space-y-4">PostItem</div>;
}

export default PostTab;
