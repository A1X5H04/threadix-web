import { Children, ReactNode, useState } from "react";

function SpoilerText({ children }: { children: ReactNode }) {
  const [hide, setHide] = useState(true);

  return (
    <div className="relative after:bg-white after:absolute after:w-full after:h-full">
      {Children.only(children)}
    </div>
  );
}

export default SpoilerText;
