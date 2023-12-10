import Image from "next/image";
import GoogleIcon from "@/assets/google_icon.png";
import KakaoIcon from "@/assets/kakao_icon.png";
import { signIn } from "@/auth";

export default function Signin() {
  return (
    <div className="flex h-[82vh] w-full items-center justify-center">
      <div className="flex w-full flex-col items-center gap-2">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
          className="flex items-center justify-center gap-2 rounded-md border px-14 py-4"
        >
          <Image
            src={GoogleIcon}
            alt="google_icon"
            width={16}
            height={16}
            className="h-4 w-4"
          />
          <button>Google</button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("kakao", { redirectTo: "/" });
          }}
          className="flex items-center justify-center gap-2 rounded-md border px-14 py-4"
        >
          <Image
            src={KakaoIcon}
            alt="kakao_icon"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <button type="submit">Kakao</button>
        </form>
      </div>
    </div>
  );
}
