import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth/types";

interface UserAvatarProps {
  session: Session;
}

export default function UserAvatar({ session }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage
        src={session.user.image ? session.user.image : ""}
        alt="@shadcn"
      />
      <AvatarFallback>
        {session.user.name ? session.user.name.split("")[0] : "G"}
      </AvatarFallback>
    </Avatar>
  );
}
