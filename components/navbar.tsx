"use client";

import {
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
    <>
      <nav className="w-full h-20 border-b fixed max-w-2xl mx-auto">
        <ul className="w-full h-full inline-flex items-center justify-center gap-x-10">
          {routes.map((route) => (
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
          ))}
          {/* <li>
          <Button
            variant="link"
            onClick={async () => {
              await signOut();
            }}
          >
          <RiLogoutBoxLine className="w-6 h-6" />
          </Button>
        </li> */}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
