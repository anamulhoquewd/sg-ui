import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample images for the slideshow
const slideImages = [
  {
    url: "https://ghorerbazar.com/cdn/shop/files/6467_1647600254.webp",
    alt: "Fresh mangoes on display",
    title: "Fresh Mangoes",
    description: "Premium quality directly from farmers",
  },
  {
    url: "https://ghorerbazar.com/cdn/shop/files/gb_banner.jpg",
    alt: "Assorted mango varieties",
    title: "Multiple Varieties",
    description: "Choose from Himshagor, Rupali, Bari 4 and more",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slideshow functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slideImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  return (
    <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      {slideImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image with overlay */}
          <div className="relative w-full h-full">
            <Image
              src={slide.url}
              alt={slide.alt}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8">
                {slide.description}
              </p>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
                Fresh Mangoes at Your Doorstep
              </div>
              <Link href="/products">
                {" "}
                <Button
                  size="lg"
                  className="cursor-pointer"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-lime-500" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
