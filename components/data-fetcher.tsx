"use client";

import React, { useEffect, useTransition } from "react";
import { useAppStore } from "@/hooks/use-store";
import { RiLoader2Line } from "@remixicon/react";
import Image from "next/image";

function DataFetcher({ children }: { children: React.ReactNode }) {
  const { fetchData } = useAppStore();
  const [isFetching, startFetching] = useTransition();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    startFetching(() => fetchData());
  }, [fetchData]);

  if (!mounted) {
    return (
      <div className="w-full h-full absolute z-50 inset grid place-items-center bg-background">
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>
    );
  } else if (isFetching) {
    return (
      <div className="w-full h-[calc(100vh-6rem)] grid place-items-center">
        <RiLoader2Line className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  } else {
    return <div className="pt-20 w-full h-full">{children}</div>;
  }
}

export default DataFetcher;
