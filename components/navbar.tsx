"use client";

import { cn } from "@/lib/utils";
import {
  RiCompass4Fill,
  RiCompass4Line,
  RiHeartFill,
  RiHeartLine,
  RiHomeFill,
  RiHomeLine,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function Navbar() {
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
      name: "Search",
      path: "/search",
      icon: RiSearchLine,
      activeIcon: RiSearchFill,
      isActive: pathname === "/search",
    },
    {
      name: "Explore",
      path: "/explore",
      icon: RiCompass4Line,
      activeIcon: RiCompass4Fill,
      isActive: pathname === "/explore",
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
      path: "/profile",
      icon: RiUserLine,
      activeIcon: RiUserFill,
      isActive: pathname === "/profile",
    },
  ];

  return (
    <nav className="w-full py-5 px-2.5">
      <ul className="w-full inline-flex items-center justify-center gap-x-10">
        {routes.map((route) => (
          <li
            key={route.path}
            className={cn(
              "p-4 rounded-lg",
              route.isActive
                ? "bg-muted "
                : "bg-transparent hover:bg-muted text-muted-foreground"
            )}
          >
            <Link href={route.path} className="w-full h-full">
              {route.isActive ? (
                <route.activeIcon className="w-6 h-6" />
              ) : (
                <route.icon className="w-6 h-6" />
              )}
              <span className="sr-only">{route.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
