import UserItem from "@/components/user-item";
import React from "react";

function UsersTab() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="w-full border-b">
          <UserItem />
        </div>
      ))}
    </div>
  );
}

export default UsersTab;
