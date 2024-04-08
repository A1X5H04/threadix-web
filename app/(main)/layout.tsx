import Navbar from "@/components/navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <main className="max-w-2xl mx-auto px-5">
      <Navbar />
      {children}
    </main>
  );
}

export default MainLayout;
