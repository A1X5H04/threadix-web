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
      <div className="flex flex-col gap-y-10 items-center">
        <div className="inline-flex gap-x-2 ">
          <img src="logo.svg" width="20" />
          <h3 className="text-xl font-extrabold tracking-tight">Threadix</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
