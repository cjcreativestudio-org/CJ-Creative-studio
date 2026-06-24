import Reveal from "@/components/reveal";

const differentiators = [
  {
    index: "01",
    title: "Fast",
    body: "A turnaround you can plan around — no open-ended timelines, no disappearing for months.",
  },
  {
    index: "02",
    title: "Reliable",
    body: "Fixed scope, fixed price. What we agree on at the start is what you get at the end.",
  },
  {
    index: "03",
    title: "Handcrafted",
    body: "Boutique design, built for your business — not a template with your logo dropped in.",
  },
];

export default function HomeDifferentiators() {
  return (
    <section className="bg-[#f0ece3] px-6 py-24" aria-label="How we're different">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr] gap-x-8 items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            How We&rsquo;re Different
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Built for businesses,
            <br />
            not award shows.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-white">
            {differentiators.map(({ index, title, body }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-300 last:border-r-0 p-8 flex flex-col justify-between"
                style={{ minHeight: "220px" }}
              >
                <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                  {index}
                </span>
                <div className="flex flex-col gap-2 mt-auto">
                  <h3 className="text-[17px] font-bold italic text-[#1a1a1a] font-serif">
                    {title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-500">
                    {body}
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
