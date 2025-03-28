
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocation } from 'react-router-dom';
import { Bell, Search, ChevronDown } from 'lucide-react';

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-3 px-6 md:px-10 border-b',
        scrolled || isDashboard 
          ? 'bg-white shadow-sm border-gray-200' 
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-smokum text-3xl text-primary-blue">Eldo</span>
          {isDashboard && (
            <span className="ml-6 text-lg font-medium hidden md:inline-block text-gray-700">Express Entry Journey</span>
          )}
        </div>
        
        {!isDashboard && (
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-blue transition-colors">Features</a>
            <a href="#process" className="text-gray-700 hover:text-primary-blue transition-colors">How it Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-blue transition-colors">Pricing</a>
          </nav>
        )}
        
        <div className="flex items-center space-x-3">
          {isDashboard && (
            <>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-600">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-gray-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <div className="h-px w-px bg-gray-300 mx-2 hidden md:block"></div>
            </>
          )}
          
          {isDashboard ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">John Smith</span>
                <span className="text-xs text-gray-500">j.smith@example.com</span>
              </div>
              <Avatar className="h-9 w-9 border border-gray-200 shadow-sm">
                <AvatarImage src="" alt="John Smith" />
                <AvatarFallback className="bg-eldo-blue text-white">JS</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-gray-500" />
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
