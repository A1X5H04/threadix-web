"use client";

import {
  RiAddLine,
  RiHeartFill,
  RiHeartLine,
  RiHomeFill,
  RiHomeLine,
  RiCompass4Line,
  RiUserFill,
  RiUserLine,
  RiCompass4Fill,
} from "@remixicon/react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { User } from "lucia";
import { useAppStore, useModalStore } from "@/hooks/use-store";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Navbar({ user }: { user: User }) {
  const { hasUnreadActivity } = useAppStore();
  const { onOpen } = useModalStore((state) => state.post);
  const pathname = usePathname();

  const routes = [
    {
      name: "Home",
      path: "/",
      icon: RiHomeLine,
      activeIcon: RiHomeFill,
      isActive: pathname === "/",
    },
    {
      name: "Explore",
      path: "/explore",
      icon: RiCompass4Line,
      activeIcon: RiCompass4Fill,
      isActive: pathname.startsWith("/explore"),
    },

    {
      name: "Activity",
      path: "/activity",
      icon: RiHeartLine,
      activeIcon: RiHeartFill,
      isActive: pathname.startsWith("/activity"),
    },
    {
      name: "Profile",
      path: "/me",
      icon: RiUserLine,
      activeIcon: RiUserFill,
      isActive: pathname.startsWith("/me"),
    },
  ];

  return (
    <TooltipProvider>
      <nav className="w-full flex items-center justify-center h-20 border-b fixed max-w-2xl mx-auto z-50 backdrop-blur-md bg-background/85 transition-transform">
        {/* <button>
          <RiArrowLeftLine className="w-6 h-6" />
        </button> */}

        <ul className="w-full h-full inline-flex items-center justify-center gap-x-10">
          {routes.splice(0, 2).map((route) => (
            <Tooltip key={route.path}>
              <TooltipTrigger>
                <li className="p-4 rounded-xl bg-transparent hover:text-black dark:hover:text-white text-muted-foreground transition-colors cursor-pointer">
                  <Link href={route.path} className="w-full h-full">
                    {route.isActive ? (
                      <div>
                        <route.activeIcon className="w-6 h-6 text-black dark:text-white" />
                      </div>
                    ) : (
                      <route.icon className="w-6 h-6" />
                    )}
                    <span className="sr-only">{route.name}</span>
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent>{route.name}</TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => onOpen()}>
                <li className="py-2 px-3 rounded-md bg-foreground text-background transition-colors cursor-pointer">
                  <RiAddLine className="w-6 h-6" />
                  <span className="sr-only">Create</span>
                </li>
              </button>
            </TooltipTrigger>
            <TooltipContent>Create post</TooltipContent>
          </Tooltip>
          {routes.splice(0, 2).map((route) => (
            <Tooltip key={route.path}>
              <TooltipTrigger>
                <li
                  key={route.path}
                  className="p-4 rounded-xl bg-transparent hover:text-black dark:hover:text-white text-muted-foreground transition-colors cursor-pointer"
                >
                  <Link href={route.path} className="w-full h-full">
                    {route.isActive ? (
                      <div>
                        <route.activeIcon className="w-6 h-6 text-black dark:text-white" />
                      </div>
                    ) : (
                      <div className="relative">
                        <route.icon className="w-6 h-6" />
                        {route.path === "/activity" && hasUnreadActivity && (
                          <div className="w-2 h-2 bg-rose-500 border-2 border-white dark:border-black rounded-full absolute top-0 -right-0.5" />
                        )}
                      </div>
                    )}
                    <span className="sr-only">{route.name}</span>
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                {route.path === "/activity" && hasUnreadActivity
                  ? "Activity (Unread)"
                  : route.name}
              </TooltipContent>
            </Tooltip>
          ))}
          {/* <li>
            <button
              onClick={async () => {
                await signOut();
              }}
            >
              Logout ( {user.username} )
            </button>
            </li> */}
        </ul>
      </nav>
    </TooltipProvider>
  );
}

export default Navbar;
