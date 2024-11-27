import { RiLoader2Line } from "@remixicon/react";
import React from "react";

function LoaderScreen() {
  return (
    <div className="w-full h-[calc(100vh-6rem)] grid place-items-center">
      <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
    </div>
  );
}

export default LoaderScreen;
