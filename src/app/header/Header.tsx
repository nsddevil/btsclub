import Image from "next/image";
import Logo from "@/assets/bts4.jpg";
import Link from "next/link";
import SideBar from "@/app/sadiebar/SideBar";

export default async function Header() {
  return (
    <header className="sticky left-0 top-0 z-20 w-full bg-white">
      <div className="flex items-center justify-between rounded-lg p-4 shadow-md">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src={Logo}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold uppercase">bts club</h1>
        </Link>
        <div className="ml-auto flex gap-2">
          <SideBar />
        </div>
      </div>
    </header>
  );
}
