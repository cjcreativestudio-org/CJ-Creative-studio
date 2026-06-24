import Reveal from "@/components/reveal";

const symptoms = [
  {
    index: "01",
    title: "Looks outdated on phones",
    body: "Most visitors arrive on a phone. A site that wasn't built for one loses them in seconds.",
  },
  {
    index: "02",
    title: "Hasn't changed in years",
    body: "An old copyright date or a stale design tells visitors the business might not be active anymore.",
  },
  {
    index: "03",
    title: "Doesn't show up when people search",
    body: "If your site can't be found, it doesn't matter how good it looks once someone gets there.",
  },
];

export default function HomeProblem() {
  return (
    <section className="bg-white px-6 py-24" aria-label="The problem">
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            The Problem
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            An outdated site is
            <br />
            a closed sign on your door.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
            {symptoms.map(({ index, title, body }) => (
              <div
                key={index}
                className="border-b md:border-b-0 md:border-r border-gray-200 last:border-r-0 p-8 flex flex-col justify-between"
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
