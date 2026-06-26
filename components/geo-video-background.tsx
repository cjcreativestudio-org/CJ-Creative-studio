export default function GeoVideoBackground() {
  return (
    <video
      className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none opacity-[0.07]"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/assets/video/geo-dark-loop.mp4" type="video/mp4" />
    </video>
  );
}
