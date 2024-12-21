"use client";

import React, { useEffect, useTransition } from "react";
import { useAppStore } from "@/hooks/use-store";
import SplashScreen from "./splash-screen";

function DataFetcher({ children }: { children: React.ReactNode }) {
  const { intializeData } = useAppStore();
  const [isFetching, startFetching] = useTransition();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    startFetching(() => intializeData());
  }, [intializeData]);

  if (isFetching || !mounted) {
    return <SplashScreen isFetching={mounted} />;
  }

  return <div className="w-full h-full">{children}</div>;
}

export default DataFetcher;
