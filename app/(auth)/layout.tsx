import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

async function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = await validateRequest();

  if (user) return redirect("/");

  return (
    <div className="w-full h-screen grid place-items-center bg-long-bars">
      {children}
    </div>
  );
}

export default AuthLayout;
