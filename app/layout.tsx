import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "@/lib/edgestore";
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiLoader2Line,
} from "@remixicon/react";
import RouteProgressBar from "@/components/route-progress";
import SWRConfig from "@/components/swr-config";
import { ThemeProvider } from "@/components/theme-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threadix - A Threads Clone",
  description:
    "Explore the world of threads and posts. Share your thoughts and ideas with the world. A Instagram's Threads Clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SWRConfig>
            <RouteProgressBar>
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </RouteProgressBar>
          </SWRConfig>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
