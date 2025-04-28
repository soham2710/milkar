"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Users, 
  Percent, 
  Building, 
  Gem, 
  MapPin,  
  ArrowRight,  
  Play, 
  CheckCircle2,
  X,
  Send,
  Mail,
  Phone,
  Calendar
} from "lucide-react";


export default function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "residential",
    propertySubType: "apartment",
    budget: "",
    location: [] as string[],
    sizeRange: "",
    sizeUnit: "sqft",
    bedrooms: "",
    amenities: [] as string[],
    purpose: "self-use",
    timeline: "1-3-months",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: ""
  });
  
  // Set visibility after component mounts for animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (name === "location" || name === "amenities") {
      setFormData(prev => {
        const currentArray = prev[name] as string[];
        if (checked) {
          return { ...prev, [name]: [...currentArray, value] };
        } else {
          return { ...prev, [name]: currentArray.filter(item => item !== value) };
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: "" });
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: "" });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "residential",
        propertySubType: "apartment",
        budget: "",
        location: [],
        sizeRange: "",
        sizeUnit: "sqft",
        bedrooms: "",
        amenities: [],
        purpose: "self-use",
        timeline: "1-3-months",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus({ 
        isSubmitting: false, 
        isSubmitted: false, 
        error: "Failed to submit form. Please try again." 
      });
    }
  };

  // Animation classes
  const fadeIn = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
  const slideIn = isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10";
  const scaleIn = isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
  
  return (
    <div className="pt-16"> {/* Adding padding top to account for fixed navbar */}
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-orange-100 pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path 
              fill="rgba(249, 115, 22, 0.05)" 
              fillOpacity="1" 
              d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,144C672,107,768,85,864,101.3C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-300 ${fadeIn}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-orange-600">MILKAR</span> - Power in <br/>Collective Buying
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                Get up to 20% better deals on real estate through our collective purchasing power in Indore. Join hundreds of satisfied property buyers today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#contact-form" 
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-lg border border-gray-200 transition-colors flex items-center justify-center"
                >
                  <Play className="mr-2 h-5 w-5 text-orange-600" />
                  Watch Video
                </button>
              </div>
              
              <div className="mt-12 flex items-center space-x-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <div className={`w-full h-full bg-orange-${num * 100} flex items-center justify-center text-white font-bold`}>
                        {num}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-900">500+</span> Happy customers
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-500 ${scaleIn}`}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-orange-600 rounded-tl-3xl rounded-br-3xl -rotate-6 opacity-20"></div>
                <div className="absolute inset-0 overflow-hidden rounded-tl-3xl rounded-br-3xl">
                  <Image 
                    src="/hero-image.jpg" 
                    alt="MILKAR Real Estate Collective" 
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Floating stats */}
                <div className="absolute -bottom-5 -left-5 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <Percent className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Average Discount</p>
                    <p className="font-bold text-gray-900">15-20% Off</p>
                  </div>
                </div>
                
                <div className="absolute -top-5 -right-5 bg-white shadow-lg rounded-lg p-4 flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-md">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Group Size</p>
                    <p className="font-bold text-gray-900">50+ Buyers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-1000 ${fadeIn}`}>
              How <span className="text-orange-600">MILKAR</span> Works
            </h2>
            <p className="text-lg text-gray-600">
              Our unique collective approach ensures the best possible deals for everyone involved. It&apos;s a simple 3-step process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-orange-600" />,
                title: "Group Formation",
                description: "We form groups of 50+ buyers who are interested in properties in the same area or from the same developer in Indore.",
                step: 1
              },
              {
                icon: <Percent className="h-10 w-10 text-orange-600" />,
                title: "Negotiation",
                description: "We approach builders with our group of ready buyers, negotiating significant discounts that benefit everyone.",
                step: 2
              },
              {
                icon: <Building className="h-10 w-10 text-orange-600" />,
                title: "Property Selection",
                description: "Based on the negotiated terms, group members select their preferred properties at discounted rates.",
                step: 3
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-lg shadow-md border border-gray-100 transition-all duration-1000 delay-${300 + (index * 200)} ${fadeIn} hover:-translate-y-2 hover:shadow-lg`}
              >
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <div className="flex items-center mb-4">
                  <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/about" 
              className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
            >
              Learn more about our process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/city-bg.jpg"
            alt="Indore City"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              See MILKAR in Action
            </h2>
            <p className="text-lg text-gray-300">
              Watch how our collective buying approach helps clients save money on their property investments.
            </p>
          </div>
          
          <div className="relative mx-auto max-w-4xl aspect-video bg-gray-800 rounded-lg overflow-hidden group cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full w-20 h-20 flex items-center justify-center transition-transform group-hover:scale-110">
                <Play className="h-10 w-10" />
              </button>
            </div>
            <div className="absolute inset-0 opacity-30">
              <Image
                src="/video.jpg"
                alt="Video Thumbnail"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${slideIn}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Benefits for Everyone
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our collective approach creates a win-win-win situation for buyers, builders, and our team at MILKAR.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-white rounded-full p-3 border border-orange-200">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">For Buyers</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Save 10-20% more than individual negotiations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Access to premium properties in prime locations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Simplified purchasing process with expert guidance</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-white rounded-full p-3 border border-orange-200">
                      <Building className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">For Builders</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Sell multiple properties at once</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Reduced marketing costs and faster sales</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Better cash flow and project momentum</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-white rounded-full p-3 border border-orange-200">
                      <Gem className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">For MILKAR</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Earn commission while creating value</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Build long-term relationships with clients</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Grow our community of satisfied customers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`relative transition-all duration-1000 delay-300 ${scaleIn}`}>
              <div className="relative mx-auto max-w-md">
                <div className="absolute inset-0 bg-orange-600 rounded-tr-3xl rounded-bl-3xl rotate-3 opacity-20"></div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-tr-3xl rounded-bl-3xl shadow-xl">
                  <Image 
                    src="/benefits-image.jpg" 
                    alt="Happy Property Owners" 
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Stats overlay */}
                <div className="absolute -right-6 top-1/4 bg-white shadow-lg rounded-lg p-4 max-w-[180px]">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">20%</div>
                    <p className="text-sm text-gray-600">Average Savings</p>
                  </div>
                </div>
                
                <div className="absolute -left-6 bottom-1/4 bg-white shadow-lg rounded-lg p-4 max-w-[180px]">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">500+</div>
                    <p className="text-sm text-gray-600">Properties Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section id="contact-form" className="py-20 md:py-32 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get in Touch with <span className="text-orange-600">MILKAR</span>
            </h2>
            <p className="text-lg text-gray-600">
              Tell us about your property interests and join our collective buying power
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 items-start">
              {/* Contact Form - 3 columns */}
              <div className="md:col-span-3 bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                {formStatus.isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-8 inline-flex items-center">
                      <CheckCircle2 className="h-6 w-6 mr-2" />
                      <span className="font-medium">Thank you for your submission!</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">We&apos;ve received your information</h3>
                    <p className="text-gray-600 mb-8">Our team will contact you shortly to discuss your property interests.</p>
                    <button 
                      onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name*
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Users className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              placeholder="Your Name"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address*
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              placeholder="your.email@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number*
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                            Budget Range*
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            required
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="">Select Budget Range</option>
                            <option value="under-50-lakh">Under 50 Lakhs</option>
                            <option value="50-lakh-1-cr">50 Lakhs - 1 Crore</option>
                            <option value="1-cr-2-cr">1 Crore - 2 Crore</option>
                            <option value="2-cr-5-cr">2 Crore - 5 Crore</option>
                            <option value="above-5-cr">Above 5 Crore</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Property Interests */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Property Interests</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                              Property Type*
                            </label>
                            <select
                              id="propertyType"
                              name="propertyType"
                              required
                              value={formData.propertyType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              <option value="residential">Residential</option>
                              <option value="commercial">Commercial</option>
                              <option value="plot">Plot/Land</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="propertySubType" className="block text-sm font-medium text-gray-700 mb-1">
                              Property Sub-Type
                            </label>
                            <select
                              id="propertySubType"
                              name="propertySubType"
                              value={formData.propertySubType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              {formData.propertyType === "residential" && (
                                <>
                                  <option value="apartment">Apartment</option>
                                  <option value="villa">Villa/Bungalow</option>
                                  <option value="row-house">Row House</option>
                                  <option value="penthouse">Penthouse</option>
                                </>
                              )}
                              {formData.propertyType === "commercial" && (
                                <>
                                  <option value="office">Office Space</option>
                                  <option value="retail">Retail Shop</option>
                                  <option value="showroom">Showroom</option>
                                  <option value="warehouse">Warehouse</option>
                                </>
                              )}
                              {formData.propertyType === "plot" && (
                                <>
                                  <option value="residential-plot">Residential Plot</option>
                                  <option value="commercial-plot">Commercial Plot</option>
                                  <option value="agricultural">Agricultural Land</option>
                                </>
                              )}
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                              Purpose
                            </label>
                            <select
                              id="purpose"
                              name="purpose"
                              value={formData.purpose}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              <option value="self-use">Self Use</option>
                              <option value="investment">Investment</option>
                              <option value="both">Both</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                              Purchase Timeline
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                              </div>
                              <select
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleInputChange}
                                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                              >
                                <option value="immediate">Immediately</option>
                                <option value="1-3-months">1-3 Months</option>
                                <option value="3-6-months">3-6 Months</option>
                                <option value="6-12-months">6-12 Months</option>
                                <option value="more-than-year">More than a year</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Preferred Locations */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Preferred Locations in Indore
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {["Vijay Nagar", "Scheme 78", "Scheme 54", "AB Road", "MG Road", 
    "Saket Nagar", "Annapurna Road", "Rajendra Nagar", "Geeta Bhawan", 
    "Palasia", "New Palasia", "LIG Colony", "MIG Colony", "Scheme 140", 
    "Sapna Sangeeta", "Bapat Square", "Ring Road", "Khandwa Road", 
    "Rau", "Dewas Nagar", "Bombay Hospital Area", "Bypass Road", "Bhawarkuan",
    "Sudama Nagar", "Silicon City"].map((loc) => (
                            <div key={loc} className="flex items-center">
                              <input
                                id={`loc-${loc}`}
                                name="location"
                                type="checkbox"
                                value={loc}
                                checked={formData.location.includes(loc)}
                                onChange={handleCheckboxChange}
                                className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                              />
                              <label htmlFor={`loc-${loc}`} className="ml-2 text-sm text-gray-700">
                                {loc}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Additional Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Requirements
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Tell us more about your specific requirements or any questions you have..."
                        />
                      </div>
                      
                      {/* Submit Button */}
                      <div>
                        {formStatus.error && (
                          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                            {formStatus.error}
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={formStatus.isSubmitting}
                          className="w-full flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                          {formStatus.isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Submit Inquiry
                            </>
                          )}
                        </button>
                        <p className="mt-2 text-xs text-gray-500 text-center">
                          By submitting this form, you agree to our Privacy Policy and Terms of Service.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
              
              {/* Contact Info - 2 columns */}
              <div className="md:col-span-2">
                <div className="bg-orange-600 text-white rounded-xl shadow-lg p-8 mb-8">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Our Office</h4>
                        <p className="text-orange-100">
                          Indore, Madhya Pradesh<br />
                          India
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Email Us</h4>
                        <a href="mailto:info@milkar.com" className="text-orange-100 hover:text-white">
                          info@milkar.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Call Us</h4>
                        <a href="tel:+919876543210" className="text-orange-100 hover:text-white">
                          +91 9876 543210
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <h3 className="text-xl font-bold mb-6">Why Choose MILKAR?</h3>
                  
                  <div className="space-y-4">
                    {[
                      "Get up to 20% discount through collective buying power",
                      "Access exclusive property deals in Indore",
                      "No obligation to purchase",
                      "Free consultation and property advice",
                      "Join a community of like-minded property buyers"
                    ].map((point, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                          <CheckCircle2 className="h-4 w-4 text-orange-600" />
                        </div>
                        <p className="text-gray-600">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      question: "How much can I save with MILKAR?",
                      answer: "On average, our clients save 10-20% more than they would through individual negotiations with builders."
                    },
                    {
                      question: "Is there any joining fee?",
                      answer: "No, there are no upfront fees to join MILKAR. We earn our commission from the builder once a sale is completed."
                    },
                    {
                      question: "How long does the process take?",
                      answer: "Once a buying group is formed, the negotiation process typically takes 2-4 weeks. The actual purchase timeline then follows normal real estate procedures."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link 
                    href="/faqs"
                    className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center"
                  >
                    View all FAQs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 md:p-10">
                <h3 className="text-2xl font-bold mb-6">We&apos;re Here to Help</h3>
                <p className="text-gray-600 mb-6">
                  Can&apos;t find what you&apos;re looking for? Feel free to reach out to our team directly.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Support</h4>
                      <a href="mailto:support@milkar.com" className="text-orange-600 hover:underline">
                        support@milkar.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Customer Support</h4>
                      <a href="tel:+919876543210" className="text-orange-600 hover:underline">
                        +91 9876 543210
                      </a>
                      <p className="text-xs text-gray-500 mt-1">Mon-Sat, 10AM-6PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full">
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <p className="text-white">Video Player Placeholder</p>
                {/* In a real implementation, you would embed a YouTube or Vimeo video here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}