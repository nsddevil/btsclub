import Image from "next/image";
import heroImg from "@/assets/hero-image.jpg";

export default function Background() {
  return (
    <Image
      alt="Mountains"
      src={heroImg}
      quality={50}
      fill
      priority
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
      className="-z-10"
    />
  );
}
