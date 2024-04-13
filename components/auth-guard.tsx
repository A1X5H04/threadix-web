import { Fragment, ReactNode } from "react";

function AuthGuard({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}

export default AuthGuard;
