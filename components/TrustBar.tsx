"use client";

type IconProps = { className?: string };
type TrustItem = { label: string; icon: (props: IconProps) => React.ReactNode };

function LeafIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M19.5 4.5C13 4.8 7.7 7 6 11.1c-1.3 3.2.5 6.6 3.9 6.7 4.4.1 7.4-4.4 9.6-13.3Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 20c2.1-4.5 5.8-7.3 11.2-9.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function AdditiveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5.5 5.5h13v13h-13v-13Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
      <path d="m8 8 8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function FlavourIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 3.5c-2 3-4.5 5.1-4.5 8.5a4.5 4.5 0 0 0 9 0c0-3.4-2.5-5.5-4.5-8.5Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16.5V21M9.5 19h5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function PreservativeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M8 5.5h8M9 3h6M6.5 8.5h11v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 12h7" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

const trustItems: TrustItem[] = [
  { label: "Pure by Origin", icon: LeafIcon },
  { label: "No Additives", icon: AdditiveIcon },
  { label: "No Artificial Flavours", icon: FlavourIcon },
  { label: "No Preservatives", icon: PreservativeIcon },
];

export default function TrustBar() {
  return (
    <section aria-label="Origin Pure standards" className="relative z-20 border-y border-white/10 bg-[#0B241B] text-[#FFF8E7]">
      <div className="mx-auto flex max-w-7xl overflow-x-auto px-5 py-3.5 [scrollbar-width:none] md:justify-center md:overflow-visible md:px-10">
        <div className="flex min-w-max items-center gap-2.5 md:gap-4 lg:gap-7">
          {trustItems.map(({ label, icon: Icon }) => (
            <div key={label} className="flex h-10 items-center gap-2.5 rounded-full border border-white/15 px-4 text-[10px] font-medium uppercase tracking-[0.16em] text-white/72 md:px-5">
              <Icon className="h-4 w-4 shrink-0 text-[#E4C56F]" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
