import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/reveal";

const projects = [
  {
    slug: "range-shipping",
    img: "/assets/work/range-shipping.png",
    name: "Range Shipping",
    category: "Logistics / Maritime",
    outcome: "An institutional-grade site for a 47-year dry-bulk operator.",
  },
  {
    slug: "la-roofing",
    img: "/assets/work/la-roofing.png",
    name: "LA Roofing",
    category: "Local Trades",
    outcome: "Instant quote calculator, paired with a 4.9-star reputation.",
  },
  {
    slug: "taste-of-portugal",
    img: "/assets/work/taste-of-portugal.png",
    name: "Taste of Portugal",
    category: "Hospitality / Restaurant",
    outcome: "One site, two identities — morning pastelaria, evening restaurant.",
  },
];

export default function HomeWork() {
  return (
    <section
      id="selected-work"
      className="bg-white px-6 py-24"
      aria-label="Selected work"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header row */}
        <div className="flex flex-col gap-3 md:grid md:grid-cols-[auto_1fr] md:gap-x-8 md:items-start mb-16">
          <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400 mt-2 whitespace-nowrap">
            Selected Work
          </span>
          <h2
            className="text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] text-[#0d0d0d] md:text-right"
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            Real businesses.
            <br />
            Real results.
          </h2>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {projects.map(({ slug, img, name, category, outcome }) => (
              <Link
                key={slug}
                href={`/work?project=${slug}`}
                className="border border-gray-200 flex flex-col transition-[border-color] duration-[200ms] ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:border-gray-400"
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ height: "180px" }}
                >
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.22em] text-[#5b9fd6]">
                    {category}
                  </span>
                  <h3 className="text-[20px] font-bold italic text-[#1a1a1a] font-serif">
                    {name}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-gray-500">
                    {outcome}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="flex justify-end">
          <Link
            href="/work"
            className="inline-block border border-[#0d0d0d] px-8 py-4 text-[13px] tracking-[0.12em] uppercase text-[#0d0d0d] transition-[background-color,color,transform] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#0d0d0d] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white"
          >
            See full case study &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
