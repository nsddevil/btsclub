import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";
import SignoutForm from "./SignoutForm";

export default async function SideBar() {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger>
        {session && session.user ? (
          <UserAvatar session={session} />
        ) : (
          <MenuIcon />
        )}
      </SheetTrigger>
      <SheetContent>
        <ul className="mt-6 flex flex-col gap-2">
          {session?.user && session.user.role === "ADMIN" && (
            <li>
              <SheetClose asChild>
                <Link href="/add-post" className="w-full" replace>
                  <Button variant="secondary" className="w-full">
                    이미지업로드
                  </Button>
                </Link>
              </SheetClose>
            </li>
          )}
          <li>
            <SheetClose asChild>
              {session && session.user ? (
                <SignoutForm />
              ) : (
                <Button asChild className="w-full">
                  <Link href="/signin" replace>
                    SignIn
                  </Link>
                </Button>
              )}
            </SheetClose>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
