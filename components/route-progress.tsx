"use client";
import { useState, useEffect } from "react";

import { AppProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";

function RouteProgressBar({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {children}
      <AppProgressBar
        color={theme === "dark" ? "#fff" : "#000"}
        // options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

export default RouteProgressBar;
