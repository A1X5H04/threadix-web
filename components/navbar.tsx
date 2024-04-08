import { cn } from "@/lib/utils";
import {
  RiCompass4Fill,
  RiCompass4Line,
  RiHeartFill,
  RiHeartLine,
  RiHomeFill,
  RiHomeLine,
  RiMenu3Line,
  RiSearchFill,
  RiSearchLine,
  RiUserFill,
  RiUserLine,
} from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import React from "react";
import { Icon } from "@radix-ui/react-select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

const routes = [
  {
    name: "Home",
    path: "/",
    icon: RiHomeLine,
    activeIcon: RiHomeFill,
    isActive: true,
  },
  {
    name: "Search",
    path: "/search",
    icon: RiSearchLine,
    activeIcon: RiSearchFill,
    isActive: false,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: RiCompass4Line,
    activeIcon: RiCompass4Fill,
    isActive: false,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: RiHeartLine,
    activeIcon: RiHeartFill,
    isActive: false,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: RiUserLine,
    activeIcon: RiUserFill,
    isActive: false,
  },
];

function Navbar() {
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
