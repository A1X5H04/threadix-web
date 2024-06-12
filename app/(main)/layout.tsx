import Navbar from "@/components/navbar";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

async function MainLayout({ children }: Props) {
  const { user } = await validateRequest();

  if (!user) return redirect("/login");
  return (
    <main className="max-w-2xl mx-auto px-5">
      <Navbar />
      {children}
    </main>
  );
}

export default MainLayout;
