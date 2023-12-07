import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignoutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className="w-full">
        Signout
      </Button>
    </form>
  );
}
