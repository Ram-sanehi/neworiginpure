"use client";

const benefits = [
  {
    label: "Immunity",
    description: "Daily support for natural defenses.",
    icon: ShieldIcon,
  },
  {
    label: "Relaxation",
    description: "A softer pause for slower evenings.",
    icon: MeditationIcon,
  },
  {
    label: "Antioxidants",
    description: "Plant-rich support for everyday vitality.",
    icon: RefreshIcon,
  },
  {
    label: "Digestion",
    description: "Fresh botanicals for a lighter finish.",
    icon: StomachIcon,
  },
  {
    label: "Metabolism",
    description: "A clean lift for your daily rhythm.",
    icon: LeafIcon,
  },
];

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M32 8L50 14V29C50 40 43 48 32 54C21 48 14 40 14 29V14L32 8Z" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 31L29 35L39 25" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MeditationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="3.2" />
      <path d="M20 48C22 38 26 34 32 34C38 34 42 38 44 48" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M32 27V42" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M22 31L16 42" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M42 31L48 42" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 24C20 17 26 12 34 12C42 12 48 16 52 23" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 40C44 47 38 52 30 52C22 52 16 48 12 41" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 23L44 19L46 11" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 41L20 45L18 53" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StomachIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M18 35C18 25 25 18 35 18C43 18 49 23 49 30C49 38 44 42 38 45L32 48L27 52C23 48 20 45 18 35Z" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 22C22 27 22 32 25 36" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M39 22C42 27 42 32 39 36" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M16 43C23 25 34 16 50 12C47 30 40 42 23 48C19 49 17 47 16 43Z" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 45C27 39 35 31 41 21" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M24 47C31 37 39 29 48 24" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export default function BenefitsSection() {
  return (
    <section className="py-8 lg:py-10" style={{ backgroundColor: "#F7F4ED" }}>
      <div className="mx-auto max-w-7xl overflow-x-auto px-6 [scrollbar-width:none] lg:px-12">
        <div className="grid min-w-[760px] grid-cols-5 divide-x divide-[#1B4332]/12">
          {benefits.map(({ label, description, icon: Icon }) => (
            <article key={label} className="benefit-row px-5 text-center first:pl-0 last:pr-0">
              <div className="mx-auto flex h-9 w-9 items-center justify-center text-[#B88D27]">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-[#1B4332]">{label}</h3>
              <p className="mx-auto mt-1 max-w-[150px] text-xs leading-5 text-[#1B4332]/60">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
