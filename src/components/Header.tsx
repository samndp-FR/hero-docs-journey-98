
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-eldo-dark font-bold text-2xl">eldo</span>
          <span className="text-eldo-purple font-light text-lg ml-1">copilot</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-eldo-dark/80 hover:text-eldo-purple transition-colors">Features</a>
          <a href="#process" className="text-eldo-dark/80 hover:text-eldo-purple transition-colors">How it Works</a>
          <a href="#pricing" className="text-eldo-dark/80 hover:text-eldo-purple transition-colors">Pricing</a>
        </nav>
        
        <div>
          <button className="bg-eldo-purple text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Start Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
