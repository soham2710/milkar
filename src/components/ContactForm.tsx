"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    propertyType: string;
    propertySubType: string;
    budget: string;
    location: string[];
    sizeRange: string;
    sizeUnit: string;
    bedrooms: string;
    amenities: string[];
    purpose: string;
    timeline: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    propertySubType: "",
    budget: "",
    location: [],
    sizeRange: "",
    sizeUnit: "sqft",
    bedrooms: "",
    amenities: [],
    purpose: "",
    timeline: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showPropertySpecificFields, setShowPropertySpecificFields] = useState(false);

  // Areas in Indore
  const indoreAreas = [
    "Vijay Nagar", "Scheme 78", "Scheme 54", "AB Road", "MG Road", 
    "Saket Nagar", "Annapurna Road", "Rajendra Nagar", "Geeta Bhawan", 
    "Palasia", "New Palasia", "LIG Colony", "MIG Colony", "Scheme 140", 
    "Sapna Sangeeta", "Bapat Square", "Ring Road", "Khandwa Road", 
    "Rau", "Dewas Nagar", "Bombay Hospital Area", "Bypass Road", "Bhawarkuan",
    "Sudama Nagar", "Silicon City"
  ];

  // Amenities options
  const amenitiesOptions = [
    "Swimming Pool", "Gym", "Club House", "Children's Play Area", 
    "24/7 Security", "Power Backup", "Gated Community", "Parking", 
    "Garden/Park", "Community Hall", "Sports Facilities", "Temple",
    "Rainwater Harvesting", "Solar Power", "Shopping Complex"
  ];

  // Handle showing property-specific fields when property type changes
  useEffect(() => {
    if (formData.propertyType) {
      setShowPropertySpecificFields(true);
    } else {
      setShowPropertySpecificFields(false);
    }
  }, [formData.propertyType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, arrayName: 'location' | 'amenities') => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [arrayName]: [...prev[arrayName], value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((item) => item !== value)
      }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }
      
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        propertySubType: "",
        budget: "",
        location: [],
        sizeRange: "",
        sizeUnit: "sqft",
        bedrooms: "",
        amenities: [],
        purpose: "",
        timeline: "",
        message: ""
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPropertyTypeSpecificFields = () => {
    if (!showPropertySpecificFields) return null;

    if (formData.propertyType === "plot") {
      return (
        <>
          <div>
            <label htmlFor="propertySubType" className="block text-sm font-medium text-gray-700">
              Plot Type *
            </label>
            <select
              id="propertySubType"
              name="propertySubType"
              value={formData.propertySubType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select plot type</option>
              <option value="residential_plot">Residential Plot</option>
              <option value="commercial_plot">Commercial Plot</option>
              <option value="agricultural_land">Agricultural Land</option>
              <option value="industrial_plot">Industrial Plot</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sizeRange" className="block text-sm font-medium text-gray-700">
                Plot Size Range *
              </label>
              <select
                id="sizeRange"
                name="sizeRange"
                value={formData.sizeRange}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select size range</option>
                <option value="below_1000">Below 1000</option>
                <option value="1000_1500">1000 - 1500</option>
                <option value="1500_2000">1500 - 2000</option>
                <option value="2000_3000">2000 - 3000</option>
                <option value="3000_4000">3000 - 4000</option>
                <option value="4000_5000">4000 - 5000</option>
                <option value="above_5000">Above 5000</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sizeUnit" className="block text-sm font-medium text-gray-700">
                Size Unit *
              </label>
              <select
                id="sizeUnit"
                name="sizeUnit"
                value={formData.sizeUnit}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqm">Square Meters</option>
                <option value="acre">Acres</option>
                <option value="hectare">Hectares</option>
              </select>
            </div>
          </div>
        </>
      );
    } else if (formData.propertyType === "apartment") {
      return (
        <>
          <div>
            <label htmlFor="propertySubType" className="block text-sm font-medium text-gray-700">
              Apartment Type *
            </label>
            <select
              id="propertySubType"
              name="propertySubType"
              value={formData.propertySubType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select apartment type</option>
              <option value="flat">Flat</option>
              <option value="penthouse">Penthouse</option>
              <option value="studio">Studio Apartment</option>
              <option value="service">Service Apartment</option>
            </select>
          </div>

          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
              Number of Bedrooms *
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select number of bedrooms</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5+">5+ BHK</option>
            </select>
          </div>

          <div>
            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
              Desired Amenities
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
              {amenitiesOptions.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    id={`amenity-${amenity}`}
                    name={`amenity-${amenity}`}
                    type="checkbox"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={(e) => handleCheckboxChange(e, 'amenities')}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (formData.propertyType === "house") {
      return (
        <>
          <div>
            <label htmlFor="propertySubType" className="block text-sm font-medium text-gray-700">
              House Type *
            </label>
            <select
              id="propertySubType"
              name="propertySubType"
              value={formData.propertySubType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select house type</option>
              <option value="villa">Villa</option>
              <option value="independent_house">Independent House</option>
              <option value="row_house">Row House</option>
              <option value="farmhouse">Farmhouse</option>
              <option value="bungalow">Bungalow</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                Number of Bedrooms *
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select number of bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sizeRange" className="block text-sm font-medium text-gray-700">
                Size Range *
              </label>
              <select
                id="sizeRange"
                name="sizeRange"
                value={formData.sizeRange}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select size range</option>
                <option value="below_1500">Below 1500 sq ft</option>
                <option value="1500_2000">1500 - 2000 sq ft</option>
                <option value="2000_3000">2000 - 3000 sq ft</option>
                <option value="3000_4000">3000 - 4000 sq ft</option>
                <option value="4000_5000">4000 - 5000 sq ft</option>
                <option value="above_5000">Above 5000 sq ft</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
              Desired Amenities
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
              {amenitiesOptions.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    id={`amenity-${amenity}`}
                    name={`amenity-${amenity}`}
                    type="checkbox"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={(e) => handleCheckboxChange(e, 'amenities')}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else if (formData.propertyType === "commercial") {
      return (
        <>
          <div>
            <label htmlFor="propertySubType" className="block text-sm font-medium text-gray-700">
              Commercial Property Type *
            </label>
            <select
              id="propertySubType"
              name="propertySubType"
              value={formData.propertySubType}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">Select commercial type</option>
              <option value="office_space">Office Space</option>
              <option value="shop">Shop/Showroom</option>
              <option value="warehouse">Warehouse/Godown</option>
              <option value="industrial">Industrial Building</option>
              <option value="coworking">Co-working Space</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sizeRange" className="block text-sm font-medium text-gray-700">
                Size Range *
              </label>
              <select
                id="sizeRange"
                name="sizeRange"
                value={formData.sizeRange}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="">Select size range</option>
                <option value="below_500">Below 500 sq ft</option>
                <option value="500_1000">500 - 1000 sq ft</option>
                <option value="1000_2000">1000 - 2000 sq ft</option>
                <option value="2000_5000">2000 - 5000 sq ft</option>
                <option value="above_5000">Above 5000 sq ft</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sizeUnit" className="block text-sm font-medium text-gray-700">
                Size Unit *
              </label>
              <select
                id="sizeUnit"
                name="sizeUnit"
                value={formData.sizeUnit}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="sqft">Square Feet</option>
                <option value="sqm">Square Meters</option>
              </select>
            </div>
          </div>
        </>
      );
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
        Property Interest Form
      </h2>
      
      {submitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-green-50 p-4 rounded-md mb-6"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Thank you for your interest! We'll contact you soon about your property requirements.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-red-50 p-4 rounded-md mb-6"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Personal Information Section */}
          <div className="bg-orange-50 p-4 rounded-md mb-2">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Requirements Section */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Property Requirements</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                  Property Type *
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select property type</option>
                  <option value="plot">Plot/Land</option>
                  <option value="apartment">Apartment/Flat</option>
                  <option value="house">House/Villa</option>
                  <option value="commercial">Commercial Property</option>
                </select>
              </div>
              
              {/* Dynamic Property Type Specific Fields */}
              {renderPropertyTypeSpecificFields()}
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget Range (₹) *
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select budget range</option>
                  <option value="under_20L">Under ₹20 Lakhs</option>
                  <option value="20L_40L">₹20 Lakhs - ₹40 Lakhs</option>
                  <option value="40L_60L">₹40 Lakhs - ₹60 Lakhs</option>
                  <option value="60L_80L">₹60 Lakhs - ₹80 Lakhs</option>
                  <option value="80L_1Cr">₹80 Lakhs - ₹1 Crore</option>
                  <option value="1Cr_1.5Cr">₹1 Crore - ₹1.5 Crore</option>
                  <option value="1.5Cr_2Cr">₹1.5 Crore - ₹2 Crore</option>
                  <option value="2Cr_3Cr">₹2 Crore - ₹3 Crore</option>
                  <option value="above_3Cr">Above ₹3 Crore</option>
                </select>
              </div>

              <div>
                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                  Purpose *
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select purpose</option>
                  <option value="investment">Investment</option>
                  <option value="self_use">Self Use/End Use</option>
                  <option value="rental">Rental Income</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                  Purchase Timeline *
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (0-3 months)</option>
                  <option value="short_term">Short Term (3-6 months)</option>
                  <option value="mid_term">Mid Term (6-12 months)</option>
                  <option value="long_term">Long Term (Over 12 months)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Locations in Indore *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-3">
                  {indoreAreas.map((area) => (
                    <div key={area} className="flex items-center">
                      <input
                        id={`location-${area}`}
                        name={`location-${area}`}
                        type="checkbox"
                        value={area}
                        checked={formData.location.includes(area)}
                        onChange={(e) => handleCheckboxChange(e, 'location')}
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`location-${area}`} className="ml-2 text-sm text-gray-700">
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Select your preferred areas in Indore
                </p>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Additional Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us more about what you're looking for..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                ></textarea>
              </div>
            </div>
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Request"
            )}
          </motion.button>
          
          <p className="mt-4 text-xs text-center text-gray-500">
            By submitting this form, you agree to join MILKAR's collective buying network and be contacted about property opportunities.
          </p>
        </form>
      )}
    </motion.div>
  );
}