
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

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
          <span className="font-smokum text-3xl text-primary-blue">Eldo</span>
        </div>
        
        {!isDashboard && (
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-blue transition-colors">Features</a>
            <a href="#process" className="text-gray-700 hover:text-primary-blue transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-blue transition-colors">Pricing</a>
          </nav>
        )}
        
        <div>
          {isDashboard ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">John Smith</span>
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-eldo-blue text-white">JS</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button className="bg-[#F4D040] hover:bg-[#F4D040]/90 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Start Now
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
