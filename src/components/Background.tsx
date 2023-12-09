import Image from "next/image";

export default function Background() {
  return (
    <Image
      alt="Mountains"
      src="/hero-image.jpg"
      quality={50}
      fill
      placeholder="blur"
      blurDataURL="/hero-image.jpg"
      sizes="100vw"
      style={{
        objectFit: "cover",
      }}
      className="-z-10"
    />
  );
}
