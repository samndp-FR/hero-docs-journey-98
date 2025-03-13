
import React, { useEffect, useRef } from 'react';
import { FileUp, ClipboardCheck, FileText, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => (
  <div 
    className={cn(
      "bg-white rounded-2xl p-8 shadow-lg border border-eldo-light/80 flex flex-col hover-scale",
      "opacity-0 translate-y-10 feature-card"
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="rounded-xl bg-eldo-purple/10 w-14 h-14 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-eldo-dark/80">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!featuresRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = featuresRef.current?.querySelectorAll('.feature-card');
            cards?.forEach((card) => {
              card.classList.add('opacity-100');
              card.classList.add('translate-y-0');
              card.classList.add('transition-all');
              card.classList.add('duration-700');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(featuresRef.current);

    return () => {
      if (featuresRef.current && observerRef.current) {
        observerRef.current.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <FileUp className="w-6 h-6 text-eldo-purple" />,
      title: "Smart Document Scanner",
      description: "Upload and scan all your documents in minutes, with intelligent recognition and organization.",
      delay: 100
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-eldo-purple" />,
      title: "Compliance Check",
      description: "Ensure your documents meet all government guidelines with automatic verification and feedback.",
      delay: 200
    },
    {
      icon: <FileText className="w-6 h-6 text-eldo-purple" />,
      title: "Automated Form Filling",
      description: "AI extracts information from your documents to automatically fill up to 90% of your application forms.",
      delay: 300
    },
    {
      icon: <Clock className="w-6 h-6 text-eldo-purple" />,
      title: "Timeline Predictions",
      description: "Get accurate predictions for your application timeline based on current processing times and your profile.",
      delay: 400
    }
  ];

  return (
    <section id="features" className="py-20 bg-eldo-light/30" ref={featuresRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-eldo-soft-blue text-eldo-blue font-medium text-sm inline-block mb-4">
            FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Eldo Simplifies Your Journey</h2>
          <p className="text-eldo-dark/80 max-w-2xl mx-auto">
            Our AI-powered tools streamline every step of your Express Entry application process, saving you time and reducing stress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
