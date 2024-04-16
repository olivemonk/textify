import { BotIcon } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <BotIcon size={32} className="text-indigo-600" />
      <span className="">Textify</span>
    </Link>
  );
};

export default Logo;
