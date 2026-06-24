import Reveal from "@/components/reveal";

// Illustrative placeholder quotes — swap for real testimonials later.
const testimonials = [
  {
    initials: "RJ",
    name: "Riverside Joinery",
    role: "Owner",
    quote:
      "Our old site hadn't changed since 2017. CJ Studio had a new one live in weeks, and it actually brings in calls now.",
  },
  {
    initials: "MF",
    name: "Marlowe & Finch",
    role: "Owner",
    quote:
      "We didn't have a website at all before this. Now customers find us, and it looks like we know what we're doing.",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="bg-white px-6 py-24" aria-label="What clients say">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            What Clients Say
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Don&rsquo;t take
            <br />
            our word for it.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ initials, name, role, quote }) => (
              <div
                key={initials}
                className="border border-gray-200 p-8 flex flex-col gap-6 transition-[border-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:border-gray-400"
              >
                <div
                  className="bg-[#f0ece3] flex items-center justify-center self-start"
                  style={{ width: "56px", height: "56px" }}
                  aria-hidden="true"
                >
                  <span
                    className="text-[14px] text-[#0d0d0d] tracking-[0.1em]"
                    style={{ fontFamily: "var(--font-archivo-black)" }}
                  >
                    {initials}
                  </span>
                </div>

                <p className="text-[15px] leading-relaxed text-gray-600 font-serif italic">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-bold text-[#1a1a1a]">{name}</h3>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b9fd6]">
                    {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
