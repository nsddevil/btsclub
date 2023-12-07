import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold">404 Not found page</h1>
        <Button asChild className="mt-4">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
