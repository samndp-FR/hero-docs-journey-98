
import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  content: string;
  rating: number;
  country: string;
}

const TestimonialsSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const testimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      title: "Software Engineer",
      content: "Eldo Copilot saved me countless hours on my Express Entry application. The document scanning feature accurately extracted all my information, and the form filling was almost magical. I got my ITA within 3 months!",
      rating: 5,
      country: "India"
    },
    {
      name: "Michael Chen",
      title: "Marketing Specialist",
      content: "I was overwhelmed by the Express Entry process until I found Eldo. The compliance check feature caught several issues with my documents that I would have missed. Worth every penny for the peace of mind alone.",
      rating: 5,
      country: "Philippines"
    },
    {
      name: "Sarah Okonkwo",
      title: "Healthcare Professional",
      content: "The timeline predictions were incredibly accurate. Eldo estimated my processing time within a week of what actually happened. The interface is intuitive and the automated form filling saved me from countless errors.",
      rating: 4,
      country: "Nigeria"
    },
    {
      name: "Rafael Gonzalez",
      title: "Financial Analyst",
      content: "As someone who's detailed-oriented, I was skeptical of an AI tool, but Eldo impressed me with its accuracy. The Premium plan was worth it as I needed to submit multiple applications for my family.",
      rating: 5,
      country: "Brazil"
    }
  ];

  useEffect(() => {
    if (!sliderRef.current) return;

    const handleAutoSlide = () => {
      if (sliderRef.current) {
        const scrollAmount = sliderRef.current.scrollLeft + 320;
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        
        if (scrollAmount >= maxScroll) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(handleAutoSlide, 4000);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    observerRef.current.observe(sliderRef.current);

    return () => {
      if (sliderRef.current && observerRef.current) {
        observerRef.current.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 rounded-full bg-eldo-soft-blue text-eldo-blue font-medium text-sm inline-block mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories from Our Users</h2>
          <p className="text-eldo-dark/80 max-w-2xl mx-auto">
            Hear from immigrants who've simplified their Express Entry journey with Eldo Copilot.
          </p>
        </div>

        <div className="relative">
          <div 
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory" 
            ref={sliderRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg border border-eldo-light min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-center hover-scale"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-eldo-dark/80 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-eldo-dark/60">{testimonial.title}</div>
                  </div>
                  <div className="text-sm text-eldo-blue">{testimonial.country}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fades */}
          <div className="absolute top-0 bottom-8 left-0 w-24 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute top-0 bottom-8 right-0 w-24 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
