import React from "react";

import { RiArrowRightSLine } from "@remixicon/react";

function TagTab() {
  return (
    <div className="w-full space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-between p-4 group cursor-pointer border-b"
        >
          <div className="inline-flex items-center">
            <div className="w-10 h-10 grid place-items-center bg-white rounded-full">
              <span className="font-bold text-2xl text-black">#</span>
            </div>
            <div className="ml-3 gap-x-2">
              <h3 className="font-semibold inline-flex items-center">
                EyesOnRafah
              </h3>
              <p className="text-sm text-muted-foreground">
                feliboy ·&nbsp;
                <span className="text-foreground text-xs">{200} Posts</span>
              </p>
            </div>
          </div>
          <RiArrowRightSLine className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      ))}
    </div>
  );
}

export default TagTab;
