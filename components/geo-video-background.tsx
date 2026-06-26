export default function GeoVideoBackground() {
  return (
    <video
      className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none opacity-[0.20]"
      style={{ filter: "brightness(0.85) contrast(1.1)" }}
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
