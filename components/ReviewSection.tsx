const reviews = [
  {
    quote:
      "The kind of tea that makes your whole evening slow down in the best possible way.",
    author: "Maya R.",
  },
  {
    quote:
      "Deep, grounding flavor with a luxurious feel — it fits beautifully into my nightly routine.",
    author: "Alex P.",
  },
  {
    quote:
      "Elegant, calming, and beautifully balanced. It tastes like a quiet little reset.",
    author: "Nina S.",
  },
];

export default function ReviewSection() {
  return (
    <section id="reviews" className="bg-[#FFF8E7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#1B4332]/60">reviews</p>
          <h2 className="mt-3 font-serif text-4xl text-[#1B4332] md:text-5xl">Loved in the quiet moments.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.author}
              className="rounded-[1.8rem] border border-[#1B4332]/10 bg-white/80 p-6 shadow-[0_18px_50px_rgba(27,67,50,0.05)]"
            >
              <div className="mb-5 text-[#D4A017] text-2xl">★★★★★</div>
              <p className="text-lg leading-8 text-[#1B4332]/80">“{review.quote}”</p>
              <footer className="mt-6 text-sm uppercase tracking-[0.18em] text-[#1B4332]/55">{review.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
