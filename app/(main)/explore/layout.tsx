import React from "react";
import SearchDialog from "./_components/search-dialog";

function ExploreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="py-5">
      <SearchDialog />
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default ExploreLayout;
