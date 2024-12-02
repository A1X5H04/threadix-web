import { cn } from "@/lib/utils";
import { RiLoader2Line } from "@remixicon/react";
import Image from "next/image";
import React from "react";

function SplashScreen({ isFetching }: { isFetching: boolean }) {
  const [showTip, setShowTip] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, Math.floor(Math.random() * 10000) + 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="w-full h-screen grid place-items-center bg-background relative">
        <div className="-translate-y-32 flex flex-col items-center gap-y-2">
          <div className="p-5 rounded-lg bg-muted/20 border border-muted">
            <Image
              className={cn("", isFetching && "animate-pulse")}
              src="/logo.svg"
              alt="logo"
              width={50}
              height={50}
            />
          </div>
          {isFetching && (
            <h1 className="text-2xl font-extrabold text-primary mt-4 animate-in slide-in-from-bottom-3">
              Threadix
            </h1>
          )}
        </div>
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
