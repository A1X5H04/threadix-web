import React from "react";

function ActivityPage() {
  return (
    <div className="grid place-items-center w-full">
      <div className="grid place-items-center">
        <h4 className="font-semibold text-lg">No Activity Found</h4>
        <p className="text-sm text-muted-foreground">
          When you like or follow something, it will show up here.
        </p>
      </div>
    </div>
  );
}

export default ActivityPage;
