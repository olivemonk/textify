"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { BotIcon, Menu } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const SmallSidenavBar = () => {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <BotIcon size={28} className="text-indigo-600" />
            <span className="sr-only">Textify</span>
          </Link>
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.href}
              className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${
                route.active
                  ? "bg-neutral-200 text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {route.label}
            </Link>
          ))}
          <Button className="mt-2" variant={"secondary"} size={"sm"}>
            Logout
          </Button>
        </nav>
        <div className="mt-auto">
          <Button variant={"outline"} size={"lg"} className="w-full">
            Help & Support
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SmallSidenavBar;
