"use client";


const steps = [
  {
    number: "01",
    title: "Boil",
    description: "Heat fresh water to 80-85°C",
    icon: TeapotIcon,
  },
  {
    number: "02",
    title: "Steep",
    description: "Place tea bag in a cup, pour hot water, steep 3-5 minutes",
    icon: CupTagIcon,
  },
  {
    number: "03",
    title: "Enjoy",
    description: "Remove the tea bag, relax and enjoy your refreshing cup",
    icon: SteamingCupIcon,
  },
  {
    number: "04",
    title: "Best Enjoyed",
    description: "Hot or iced, enjoy it your way, any time of day",
    icon: LeafCupIcon,
  },
];

function TeapotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 28H46C46 22 42 18 36 18H28C22 18 18 22 18 28Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 28H46L43 45C42 49 38 52 34 52H30C26 52 22 49 21 45L18 28Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 28H51C53 28 54 30 54 32C54 34 53 36 51 36H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 18V14M32 18V12M40 18V14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 40H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CupTagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24H46C46 18 42 14 36 14H28C22 14 18 18 18 24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 24H46V42C46 47 42 52 36 52H28C22 52 18 47 18 42V24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 28H52C54 28 56 30 56 32C56 34 54 36 52 36H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 23L31 30L38 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 35H38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SteamingCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24H46V42C46 47 42 52 36 52H28C22 52 18 47 18 42V24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 30H52C54 30 56 32 56 34C56 36 54 38 52 38H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M23 18C23 12 28 10 31 12C33 14 32 18 29 19C27 20 23 20 23 18Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 18C32 12 37 10 40 12C42 14 41 18 38 19C36 20 32 20 32 18Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 30H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function LeafCupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24H46V42C46 47 42 52 36 52H28C22 52 18 47 18 42V24Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 30H52C54 30 56 32 56 34C56 36 54 38 52 38H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 24C24 18 27 14 32 14C36 14 41 18 41 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 33C28 31 31 31 32 31C35 31 39 32 41 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 39C29 33 34 30 41 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function HowToBrewSection() {
  return (
    <section className="relative overflow-hidden bg-[#1B4332] py-12 text-[#FFF8E7] lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#FFF8E7]/60">Brew guide</p>
            <h2 className="mt-2 font-serif text-3xl text-[#FFF8E7] md:text-4xl">How to Brew</h2>
          </div>
          <p className="hidden text-xs text-[#FFF8E7]/50 sm:block">A simple four-step ritual</p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-7 h-[calc(100%-56px)] w-px bg-[#D4A017]/45 sm:hidden" />
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-[#D4A017]/45 sm:block" />
          <div className="grid gap-3 sm:grid-cols-4 sm:gap-4">
            {steps.map(({ number, title, description, icon: Icon }) => (
              <article key={number} className="brew-step relative z-10 flex min-h-[98px] items-center gap-4 rounded-xl border border-[#1B4332]/10 bg-white p-4 text-[#1B4332] shadow-[0_12px_28px_rgba(0,0,0,0.12)] sm:block sm:min-h-[214px] sm:rounded-[1.2rem] sm:p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1B4332] text-[#FFF8E7] sm:h-14 sm:w-14">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <div className="flex-1 sm:mt-5">
                  <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#1B4332]/48">{number}</div>
                  <h3 className="mt-1 font-serif text-2xl text-[#1B4332]">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#1B4332]/65 sm:max-w-[14rem]">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
