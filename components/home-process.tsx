import Reveal from "@/components/reveal";

const steps = [
  {
    index: "01",
    name: "Discovery",
    description: "We map your goals, audience, and what's not working today.",
  },
  {
    index: "02",
    name: "Design",
    description: "A handcrafted site built around your business, not a template.",
  },
  {
    index: "03",
    name: "Launch",
    description: "Live, tested, and handed over — with support after launch.",
  },
];

export default function HomeProcess() {
  return (
    <section className="bg-[#f0ece3] px-6 py-24" aria-label="How it works">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            How It Works
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Three steps from
            <br />
            brief to launch.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-white">
            {steps.map(({ index, name, description }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-300 last:border-r-0 p-8 flex flex-col gap-3"
                style={{ minHeight: "200px" }}
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                  {index}
                </span>
                <h3 className="text-[16px] font-bold italic text-[#1a1a1a] font-serif">
                  {name}
                </h3>
                <p className="text-[13px] leading-relaxed text-gray-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
