"use client";

import { AppProgressBar } from "next-nprogress-bar";

function RouteProgressBar({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AppProgressBar
        color="#ffffff"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

export default RouteProgressBar;
