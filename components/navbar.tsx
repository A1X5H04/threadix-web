"use client";

import {
  RiAddLine,
  RiArrowLeftLine,
  RiHeartFill,
  RiHeartLine,
  RiHomeFill,
  RiHomeLine,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from "@remixicon/react";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import PostFormIndex from "./post/form";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

import CreatePostDialog from "./dialogs/post";
import { User } from "lucia";
import { useModalStore } from "@/hooks/use-store";
import { signOut } from "@/actions/sign-out";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function Navbar({ user }: { user: User }) {
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
      icon: RiSearchLine,
      activeIcon: RiSearchFill,
      isActive: pathname === "/search",
    },

    {
      name: "Activity",
      path: "/activity",
      icon: RiHeartLine,
      activeIcon: RiHeartFill,
      isActive: pathname === "/activity",
    },
    {
      name: "Profile",
      path: "/me",
      icon: RiUserLine,
      activeIcon: RiUserFill,
      isActive: pathname === "/me",
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
                      <route.icon className="w-6 h-6" />
                    )}
                    <span className="sr-only">{route.name}</span>
                  </Link>
                </li>
              </TooltipTrigger>
              <TooltipContent>{route.name}</TooltipContent>
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
