import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "@/lib/edgestore";
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiLoader2Line,
} from "@remixicon/react";

const font = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cascade - A Threads Clone",
  description:
    "Explore the world of threads and posts. Share your thoughts and ideas with the world. A Instagram's Threads Clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              borderRadius: "var(--radius)",
              border: "1px solid hsl(var(--muted))",
            },
            className: "text-sm shadow-lg",

            success: {
              icon: <RiCheckboxCircleFill className="w-5 h-5" />,
            },
            error: {
              icon: <RiErrorWarningFill className="w-5 h-5" />,
            },
            loading: {
              icon: <RiLoader2Line className="w-4 h-4 animate-spin" />,
            },
          }}
        />
      </body>
    </html>
  );
}
