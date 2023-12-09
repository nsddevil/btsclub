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
            <strong>BTS</strong>, a gathering of billiards enthusiasts, blends
            passion for the game with intimate camaraderie. Beyond the cues and
            balls, it&apos;s a space where shared love creates lasting memories,
            and victories are celebrated among friends. Join us for the joy of
            billiards and genuine companionship.
          </p>
        </div>
      </div>
    </>
  );
}
