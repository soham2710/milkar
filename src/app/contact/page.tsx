"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with parallax effect */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white py-20 md:py-28">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i}
                className={`absolute rounded-full bg-orange-400 bubble-${i}`}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Contact <span className="text-orange-600">MILKAR</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Get in touch with our team to learn more about collective real estate buying in Indore
            </motion.p>
          </motion.div>
        </div>
        
        {/* Downward arrow animation */}
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5, 
            delay: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.2
          }}
        >
          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch</h2>
                
                <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-8">
                  <div className="space-y-8">
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex-shrink-0 h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mr-5">
                        <MapPin className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Our Location</h4>
                        <p className="text-gray-600">
                          Main Office<br />
                          Indore, Madhya Pradesh<br />
                          India
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex-shrink-0 h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mr-5">
                        <Mail className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Email Us</h4>
                        <p className="text-gray-600 mb-1">For general inquiries:</p>
                        <a href="mailto:info@milkar.com" className="text-orange-600 hover:underline">info@milkar.com</a>
                        
                        <p className="text-gray-600 mt-3 mb-1">For support:</p>
                        <a href="mailto:support@milkar.com" className="text-orange-600 hover:underline">support@milkar.com</a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex-shrink-0 h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mr-5">
                        <Phone className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Call Us</h4>
                        <p className="text-gray-600 mb-1">Main Office:</p>
                        <a href="tel:+919876543210" className="text-orange-600 hover:underline">+91 98931 11536</a>
                        
                        <p className="text-gray-600 mt-3 mb-1">Customer Support:</p>
                        <a href="tel:+919876543211" className="text-orange-600 hover:underline">+91 98931 11536</a>
                        <p className="text-sm text-gray-500 mt-1">Monday to Saturday, 10:00 AM - 6:00 PM</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Looking to submit an inquiry?</h3>
                  <p className="text-gray-600 mb-6">
                    You can fill our detailed property inquiry form on our homepage to tell us about your real estate interests and join our collective buying groups.
                  </p>
                  <Link 
                    href="/#contact-form" 
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors"
                  >
                    Go to Contact Form
                  </Link>
                </div>
              </motion.div>
              
              {/* Right column - Map and Office Images */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {/* Map */}
                <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8">
                  <div className="absolute inset-0 bg-orange-100 flex items-center justify-center">
                    {/* Placeholder for actual map */}
                    <div className="text-center p-8">
                      <svg className="h-16 w-16 text-orange-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                      </svg>
                      <h3 className="text-xl font-bold text-gray-800">Indore, MP</h3>
                      <p className="text-gray-600 mt-2">The commercial capital of Madhya Pradesh</p>
                      <p className="text-sm text-gray-500 mt-4">Interactive map would be displayed here</p>
                    </div>
                  </div>
                </div>
                
                {/* Office Images */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Office Exterior</span>
                    </div>
                  </div>
                  <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Office Interior</span>
                    </div>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                    <svg className="h-5 w-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium text-gray-800">10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium text-gray-800">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium text-gray-800">Closed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Connect With Us</h2>
            <p className="text-gray-600 mb-8">
              Follow us on social media for the latest updates, property news, and exclusive deals
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: "Facebook", color: "bg-blue-600" },
                { name: "Instagram", color: "bg-pink-600" },
                { name: "Twitter", color: "bg-blue-400" },
                { name: "LinkedIn", color: "bg-blue-700" },
                { name: "YouTube", color: "bg-red-600" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`${social.color} text-white font-medium py-3 px-6 rounded-lg inline-flex items-center shadow-md`}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join MILKAR?</h2>
            <p className="text-xl mb-8 text-orange-100">
              Start your journey towards owning your dream property at the best possible price
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact-form" 
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Get Started
              </Link>
              <Link 
                href="/about" 
                className="bg-transparent hover:bg-orange-500 text-white border border-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}