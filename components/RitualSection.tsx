import Image from "next/image";

const rituals = [
  { title: "Bloom", copy: "Steep with warm water and let the leaves open slowly for a fuller aroma." },
  { title: "Breathe", copy: "Pause for one quiet minute before the first sip to ease the day into focus." },
  { title: "Return", copy: "Finish with one small ritual of stillness — the kind that stays with you." },
];

export default function RitualSection() {
  return (
    <section id="ritual" className="mx-auto max-w-7xl px-6 py-20 lg:px-12 lg:py-28">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-8">
        <div className="flex min-h-[390px] flex-col rounded-[1.75rem] bg-[#123A2B] p-8 text-[#FFF8E7] shadow-[0_24px_70px_rgba(27,67,50,0.16)] md:p-12 lg:min-h-[500px] lg:p-14">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#DCC378]/80">THE RITUAL</p>

          <div className="relative mt-5 w-full max-w-[430px] overflow-hidden rounded-[1.25rem] border border-[#DCC378]/25 bg-[#0D2C22] shadow-[0_16px_34px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,195,120,0.18),_transparent_42%),linear-gradient(180deg,rgba(7,24,17,0.06),rgba(7,24,17,0.38))]" />
            <div className="relative h-[180px] overflow-hidden md:h-[190px]">
              <Image
                src="/images/9.png"
                alt="Tea leaves and a calming tea ritual"
                fill
                sizes="(max-width: 768px) 100vw, 430px"
                className="object-cover object-center saturate-[0.82] contrast-[1.04] brightness-[0.82]"
                priority
              />
            </div>
          </div>

          <div className="mt-6 max-w-xl lg:mt-7">
            <h2 className="font-serif text-5xl leading-[0.98] tracking-[-0.045em] md:text-6xl">A calmer pace, one cup at a time.</h2>
            <p className="mt-7 max-w-md text-[15px] leading-7 text-[#FFF8E7]/68 md:text-base">
              Each blend is designed to make room for a slower, more attentive rhythm. Let the water warm, let the leaves open, and let the day arrive at its own pace.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {rituals.map((ritual, index) => (
            <div
              key={ritual.title}
              className="flex min-h-[145px] items-start gap-5 rounded-[1.25rem] border border-[#1B4332]/10 bg-[#F7F1E5] px-6 py-6 shadow-[0_12px_30px_rgba(27,67,50,0.035)] md:min-h-[158px] md:px-8 md:py-7"
            >
              <div className="w-10 shrink-0 font-serif text-4xl leading-none text-[#B88D27]/75 md:w-14 md:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="max-w-xl">
                <h3 className="font-serif text-2xl text-[#1B4332] md:text-3xl">{ritual.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#1B4332]/65 md:text-base">{ritual.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
