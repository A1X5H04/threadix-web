import { Ri24HoursLine, RiHistoryLine } from "@remixicon/react";
import React from "react";

function ActivityPage() {
  return (
    <div className="grid place-items-center w-full h-96">
      <div className="grid place-items-center">
        <RiHistoryLine className="w-20 h-20 text-muted mb-2" />
        <h4 className="font-semibold text-lg">No Activity Found</h4>
        <p className="text-sm text-muted-foreground">
          When you like or follow something, it will show up here.
        </p>
      </div>
    </div>
  );
}

export default ActivityPage;
