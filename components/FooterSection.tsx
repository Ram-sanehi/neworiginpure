export default function FooterSection() {
  return (
    <footer className="border-t border-[#1B4332]/10 bg-[#1B4332] text-[#FFF8E7]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <p className="font-serif text-3xl tracking-tight">Tea Foxgle</p>
          <p className="mt-2 text-sm text-[#FFF8E7]/70">Slow-brewed wellness for the everyday ritual.</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#FFF8E7]/75">
          <a href="#blend" className="transition hover:text-[#D4A017]">Blends</a>
          <a href="#ritual" className="transition hover:text-[#D4A017]">Ritual</a>
          <a href="#story" className="transition hover:text-[#D4A017]">Story</a>
        </div>
      </div>
    </footer>
  );
}
