"use client";
import { SWRConfig as NextSWRConfig } from "swr";

function SWRConfig({ children }: { children: React.ReactNode }) {
  return (
    <NextSWRConfig
      value={{ revalidateOnFocus: process.env.NODE_ENV === "production" }}
    >
      {children}
    </NextSWRConfig>
  );
}

export default SWRConfig;
