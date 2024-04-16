"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const SidenavBar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Dashboard",
        active: pathname === "/",
        href: "/",
      },
      {
        label: "Explore",
        active: pathname === "/explore",
        href: "/explore",
      },
      {
        label: "Settings",
        active: pathname === "/settings",
        href: "/settings",
      },
      {
        label: "Notifications",
        active: pathname === "/notifications",
        href: "/notifications",
      },
      {
        label: "My Profile",
        active: pathname === "/profile",
        href: "/profile",
      },
    ],
    [pathname]
  );

  return (
    <>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                route.active ? "bg-neutral-200 text-black" : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <Button className="mt-2" variant={"secondary"} size={"sm"}>
            Logout
          </Button>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button variant={'outline'} size={"lg"} className="w-full">
            Help & Support
        </Button>
      </div>
    </>
  );
};

export default SidenavBar;
