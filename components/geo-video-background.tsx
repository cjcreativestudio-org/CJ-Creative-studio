export default function GeoVideoBackground() {
  return (
    <video
      className="fixed inset-0 w-full h-full object-cover z-[2] pointer-events-none mix-blend-screen opacity-[0.55]"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/assets/video/geo-bg.mp4" type="video/mp4" />
    </video>
  );
}
