import Background from "./Background";

export default function Hero() {
  return (
    <>
      <div className="relative h-screen p-10">
        <Background />
        <div className="absolute top-[30%] w-[60%] text-white">
          <h1 className="text-7xl font-bold">BTS</h1>
          <h3 className="text-3xl font-semibold">Billiard Technic Shot</h3>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            assumenda deserunt architecto tempore, sed, velit labore quaerat
            debitis ad, voluptatem excepturi veritatis laboriosam? Quaerat
            temporibus repellendus repellat voluptates adipisci similique?
          </p>
        </div>
      </div>
    </>
  );
}
