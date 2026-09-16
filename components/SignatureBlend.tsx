const blends = [
  {
    name: "Golden Hour",
    note: "Lemon Turmeric • ginger • bright citrus warmth",
    accent: "#D4A017",
    position: "center 38%",
    image: "/prdimg/LemonTurmeric/1.png",
  },
  {
    name: "Moonlit Mint",
    note: "Lemon Tulsi • mint • grounding herbal balance",
    accent: "#1B4332",
    position: "center 28%",
    image: "/prdimg/LemonTulsi/1.png",
  },
  {
    name: "Wild Herb Calm",
    note: "Hibiscus • lemongrass • chamomile floral ease",
    accent: "#C8D9C8",
    position: "center 42%",
    image: "/prdimg/HibiscusLemonBalm/1.png",
  },
];

export default function SignatureBlend() {
  return (
    <section id="blend" className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#1B4332]/65">signature blends</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">The comfort of a slow ritual.</h2>
        </div>
        <p className="max-w-xl text-base leading-7 text-[#1B4332]/70">
          Thoughtful botanicals, balanced for clarity and calm — no harshness, just a grounded cup that feels like a reset.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {blends.map((blend) => (
          <article
            key={blend.name}
            className="group rounded-[2rem] border border-[#1B4332]/10 bg-white/60 p-6 shadow-[0_24px_70px_rgba(27,67,50,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(27,67,50,0.1)]"
          >
            <div
              className="mb-6 flex h-32 items-end rounded-[1.5rem] border border-[#1B4332]/10 p-5"
              style={{
                background: `linear-gradient(135deg, ${blend.accent}22 0%, rgba(255,248,231,0.9) 100%), url('${blend.image}') center/cover no-repeat`,
                backgroundPosition: blend.position,
              }}
            >
              <div className="h-20 w-20 rounded-full border border-[#1B4332]/10 bg-white/50 shadow-inner backdrop-blur-[2px]" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1B4332]/55">Blend</p>
            <h3 className="mt-3 font-serif text-3xl text-[#1B4332]">{blend.name}</h3>
            <p className="mt-4 text-base leading-7 text-[#1B4332]/70">{blend.note}</p>
            <div className="mt-6 flex items-center justify-between border-t border-[#1B4332]/10 pt-5">
              <span className="text-sm font-medium text-[#1B4332]/65">Calming profile</span>
              <span className="text-lg text-[#D4A017]">✦</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
