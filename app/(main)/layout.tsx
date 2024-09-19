import Navbar from "@/components/navbar";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

async function MainLayout({ children }: Props) {
  const { session } = await validateRequest();

  if (!session) return redirect("/login");

  return (
    <main className="relative max-w-2xl mx-auto px-5 w-full h-full">
      <Navbar />
      <div className="pt-20 w-full h-full">{children}</div>
    </main>
  );
}

export default MainLayout;
