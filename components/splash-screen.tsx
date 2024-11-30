import { cn } from "@/lib/utils";
import { RiLoader2Line } from "@remixicon/react";
import Image from "next/image";
import React from "react";

function SplashScreen({ isFetching }: { isFetching: boolean }) {
  const [showTip, setShowTip] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, Math.floor(Math.random() * 8000) + 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="w-full h-screen grid place-items-center bg-background relative">
        <Image
          className={cn("-translate-y-32", isFetching && "animate-pulse")}
          src="/logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="absolute bottom-1/4 flex flex-col items-center gap-y-2">
          <div
            className={cn(
              "opacity-0 transition-opacity",
              isFetching && "opacity-100"
            )}
          >
            <RiLoader2Line
              className={cn("w-6 h-6 animate-spin text-muted-foreground ")}
            />
          </div>
          {showTip && (
            <p className="text-xs text-muted-foreground mt-4">
              You may refresh page, if it takes too long to load.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
