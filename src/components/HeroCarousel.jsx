import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bannerSlides } from '../data/products';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const go = (idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((idx + bannerSlides.length) % bannerSlides.length);
      setIsTransitioning(false);
    }, 200);
  };

  useEffect(() => {
    const timer = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = bannerSlides[current];

  return (
    <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl shadow-lg">
      {/* Background image */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-70`} />
      </div>

      {/* Content */}
      <div className={`absolute inset-0 flex flex-col justify-center px-10 md:px-20 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <p className="text-amazon-yellow font-semibold text-sm md:text-base mb-2 uppercase tracking-widest">Limited Time Offer</p>
        <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-3 leading-tight drop-shadow-lg">{slide.title}</h2>
        <p className="text-white/90 text-base md:text-xl mb-6 drop-shadow">{slide.subtitle}</p>
        <Link
          to="/search?q=deals"
          className="inline-flex items-center gap-2 bg-amazon-orange hover:bg-orange-500 text-white font-bold px-6 py-3 rounded-lg text-base transition-all duration-200 w-fit shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {slide.cta} →
        </Link>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
