import type { Metadata } from "next";
import { Inter, Source_Sans_3, Work_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";

const font = Work_Sans({ subsets: ["latin"] });

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
        <Toaster />
      </body>
    </html>
  );
}
