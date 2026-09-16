import RevealImage from "@/components/RevealImage";

const rituals = [
  { title: "Bloom", copy: "Steep with warm water and let the leaves open slowly for a fuller aroma." },
  { title: "Breathe", copy: "Pause for one quiet minute before the first sip to ease the day into focus." },
  { title: "Return", copy: "Finish with one small ritual of stillness — the kind that stays with you." },
];

export default function RitualSection() {
  return (
    <section id="ritual" className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-[2rem] bg-[#1B4332] text-[#FFF8E7] shadow-[0_28px_80px_rgba(27,67,50,0.25)] lg:p-0">
          <div className="relative h-full min-h-[360px]">
            <RevealImage
              src="/prdimg/ButterflyPeaLemon/1.png"
              alt="Butterfly Pea Lemon tea ritual scene"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              wrapperClassName="absolute inset-0"
              skeletonClassName=""
              className="object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,24,19,0.18),rgba(11,24,19,0.72))]" />
            <div className="absolute inset-0 flex items-end p-8 lg:p-10">
              <div className="max-w-[28rem] rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(11,24,19,0.52),rgba(11,24,19,0.28))] p-5 shadow-[0_18px_36px_rgba(11,24,19,0.2)] backdrop-blur-[2px]">
                <p className="text-xs uppercase tracking-[0.26em] text-[#FFF8E7]/70">the ritual</p>
                <h2 className="mt-4 font-serif text-4xl text-[#FFF8E7] md:text-5xl">A calmer pace, one cup at a time.</h2>
                <p className="mt-5 max-w-md text-base leading-8 text-[#FFF8E7]/80">
                  Each blend is designed to slow you down and bring more ease into your daily rhythm. That’s the difference between a drink and a ritual.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {rituals.map((ritual, index) => (
            <div
              key={ritual.title}
              className="flex items-start gap-5 rounded-[1.6rem] border border-[#1B4332]/10 bg-[#FFF8E7] p-5 shadow-[0_16px_40px_rgba(27,67,50,0.06)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D4A017]/18 text-lg font-semibold text-[#1B4332]">
                {index + 1}
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#1B4332]">{ritual.title}</h3>
                <p className="mt-2 text-base leading-7 text-[#1B4332]/70">{ritual.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
