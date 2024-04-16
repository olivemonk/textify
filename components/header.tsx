import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  BellDot,
  CircleUser,
  MessageSquare,
  MessageSquareText,
  Search,
} from "lucide-react";
import SmallSidenavBar from "./sm-sidenav-bar";

const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <SmallSidenavBar />
      <div className="w-full flex-1">
        <h3 className="text-lg font-semibold hidden md:block">
          Welcome back, John Doe!
        </h3>
      </div>
      <div className="flex w-fit items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search here"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Button size={"icon"} className="rounded-full">
          <MessageSquareText />
        </Button>
        <Button size={"icon"} className="rounded-full">
          <BellDot />
        </Button>
      </div>
    </header>
  );
};

export default Header;
