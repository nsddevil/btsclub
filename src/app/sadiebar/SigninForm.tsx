import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SigninForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit" className="w-full">
        Signin
      </Button>
    </form>
  );
}
