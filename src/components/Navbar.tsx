"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle navbar style change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path ? "text-orange-600 font-medium" : "";
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold ${scrolled ? "text-orange-600" : "text-orange-600"}`}>
              MILKAR
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-center space-x-1">
              <Link 
                href="/" 
                className={`px-4 py-2 rounded-md transition-colors ${isActive("/")} hover:bg-orange-50 hover:text-orange-600`}
              >
                Home
              </Link>
              
              <Link 
                href="/about" 
                className={`px-4 py-2 rounded-md transition-colors ${isActive("/about")} hover:bg-orange-50 hover:text-orange-600`}
              >
                About
              </Link>
              
              <Link 
                href="/contact" 
                className={`px-4 py-2 rounded-md transition-colors ${isActive("/contact")} hover:bg-orange-50 hover:text-orange-600`}
              >
                Contact
              </Link>
            </nav>
            
            {/* Contact phone */}
            <a 
              href="tel:+919876543210" 
              className="ml-6 flex items-center bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>+91 9876543210</span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-orange-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}>
          <nav className="flex flex-col space-y-2 pb-4">
            <Link 
              href="/" 
              className={`px-4 py-3 rounded-md transition-colors ${isActive("/")} hover:bg-orange-50 hover:text-orange-600`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            
            <Link 
              href="/about" 
              className={`px-4 py-3 rounded-md transition-colors ${isActive("/about")} hover:bg-orange-50 hover:text-orange-600`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className={`px-4 py-3 rounded-md transition-colors ${isActive("/contact")} hover:bg-orange-50 hover:text-orange-600`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <a 
              href="tel:+919876543210" 
              className="flex items-center bg-orange-600 text-white px-4 py-3 rounded-md hover:bg-orange-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>Call Us Now</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}