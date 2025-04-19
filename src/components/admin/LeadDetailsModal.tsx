"use client";

import { X, Mail, Phone, MapPin, Home, Calendar, DollarSign, Users } from "lucide-react";

// Define a strong type for the lead entry
interface LeadEntry {
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  propertyType?: string;
  propertySubType?: string;
  location?: string[] | string;
  budget?: string;
  timeline?: string;
  purpose?: string;
  sizeRange?: string;
  sizeUnit?: string;
  bedrooms?: number;
  message?: string;
  amenities?: string[];
}

// Use the interface in the props
interface LeadDetailsModalProps {
  entry: LeadEntry;
  onClose: () => void;
}


export default function LeadDetailsModal({ entry, onClose }: LeadDetailsModalProps) {
  // Format dates for better display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  // Format property types
  const formatPropertyType = (type?: string) => {
      if (!type) return "N/A";
      return type.replace(/-/g, ' ').split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 md:mx-auto my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            Lead Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    Full Name
                  </div>
                  <p className="text-base text-gray-900">{entry.name || "N/A"}</p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Email Address
                  </div>
                  <p className="text-base text-gray-900">{entry.email || "N/A"}</p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Phone Number
                  </div>
                  <p className="text-base text-gray-900">{entry.phone || "N/A"}</p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Submission Date
                  </div>
                  <p className="text-base text-gray-900">{formatDate(entry.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Property Requirements</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Home className="h-4 w-4 mr-1" />
                    Property Type
                  </div>
                  <p className="text-base text-gray-900">
                    {formatPropertyType(entry.propertyType)}
                    {entry.propertySubType ? ` - ${formatPropertyType(entry.propertySubType)}` : ""}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Preferred Locations
                  </div>
                  <p className="text-base text-gray-900">
                    {Array.isArray(entry.location) && entry.location.length > 0 
                      ? entry.location.join(", ") 
                      : entry.location || "Not specified"}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Budget
                  </div>
                  <p className="text-base text-gray-900">
                    {entry.budget 
                      ? entry.budget.replace(/-/g, ' ').split(' ').map((word: string) => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')
                      : "Not specified"}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Timeline
                  </div>
                  <p className="text-base text-gray-900">
                    {entry.timeline 
                      ? entry.timeline.replace(/-/g, ' ').split(' ').map((word: string) => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')
                      : "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Purpose</div>
                    <p className="text-base text-gray-900">
                      {entry.purpose 
                        ? entry.purpose.replace(/-/g, ' ').split(' ').map((word: string) => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')
                        : "Not specified"}
                    </p>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Size Requirements</div>
                    <p className="text-base text-gray-900">
                      {entry.sizeRange 
                        ? `${entry.sizeRange} ${entry.sizeUnit || ''}`
                        : "Not specified"}
                    </p>
                  </div>
                  
                  {entry.bedrooms && (
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">Bedrooms</div>
                      <p className="text-base text-gray-900">{entry.bedrooms}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">Message/Requirements</div>
                <p className="text-base text-gray-900 whitespace-pre-line">
                  {entry.message || "No additional message provided"}
                </p>
                
                {Array.isArray(entry.amenities) && entry.amenities.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Requested Amenities</div>
                    <ul className="list-disc list-inside text-base text-gray-900">
                      {entry.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              // For future implementation - could add contact action here
              window.open(`mailto:${entry.email}`, '_blank');
            }}
          >
            Contact Lead
          </button>
        </div>
      </div>
    </div>
  );
}