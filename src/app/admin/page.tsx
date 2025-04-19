"use client";

import { useState, useEffect } from "react";
import { Download, Search, RefreshCw, Database, Mail, Eye, LogOut } from "lucide-react";

// Assuming you have this component
interface FormEntry {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  propertySubType?: string;
  location?: string[] | string;
  purpose?: string;
  budget?: string;
  sizeRange?: string;
  sizeUnit?: string;
  bedrooms?: string;
  timeline?: string;
  amenities?: string[] | string;
  message?: string;
  createdAt?: string;
}

interface LeadDetailsModalProps {
  entry: FormEntry;
  onClose: () => void;
}

const LeadDetailsModal = ({ entry, onClose }: LeadDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Lead Details</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="font-medium">{entry.name || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{entry.email || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{entry.phone || "Not provided"}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Property Preferences</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Property Type</div>
                  <div className="font-medium">
                    {entry.propertyType ? entry.propertyType.charAt(0).toUpperCase() + entry.propertyType.slice(1) : "Not provided"}
                    {entry.propertySubType ? ` - ${entry.propertySubType}` : ""}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Budget</div>
                  <div className="font-medium">{entry.budget || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Purpose</div>
                  <div className="font-medium">{entry.purpose || "Not provided"}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
              <div className="font-medium">
                {Array.isArray(entry.location) && entry.location.length > 0 
                  ? entry.location.join(", ") 
                  : entry.location 
                    ? entry.location
                    : "Not specified"
                }
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Size & Timeline</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-500">Size</div>
                  <div className="font-medium">
                    {entry.sizeRange ? `${entry.sizeRange} ${entry.sizeUnit || ''}` : "Not provided"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Bedrooms</div>
                  <div className="font-medium">{entry.bedrooms || "Not provided"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Timeline</div>
                  <div className="font-medium">
                    {entry.timeline ? entry.timeline.replace(/-/g, ' ') : "Not provided"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {entry.message && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Message</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">{entry.message}</p>
              </div>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-500">
            Submitted on: {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "Unknown date"}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Leads management state
  interface FormEntry {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    propertyType?: string;
    propertySubType?: string;
    location?: string[] | string;
    purpose?: string;
    budget?: string;
    sizeRange?: string;
    sizeUnit?: string;
    bedrooms?: string;
    timeline?: string;
    amenities?: string[] | string;
    message?: string;
    createdAt?: string;
  }

  const [formEntries, setFormEntries] = useState<FormEntry[]>([]);
  const [isEntriesLoading, setIsEntriesLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [isCsvDownloading, setIsCsvDownloading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<FormEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
      setIsLoggedIn(adminLoggedIn);
      setIsLoading(false);
      
      // If logged in, fetch entries
      if (adminLoggedIn) {
        fetchFormEntries();
      }
    };
    
    checkAuth();
  }, []);

  // Login form handlers
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleLoginSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);
    
    try {
      // Check credentials
      if (loginData.username === "admin@milkar.com" && loginData.password === "Admin#2025") {
        localStorage.setItem("adminLoggedIn", "true");
        setIsLoggedIn(true);
        fetchFormEntries();
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dashboard handlers
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  const fetchFormEntries = async () => {
    setIsEntriesLoading(true);
    try {
      const response = await fetch("/api/entries");
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      const data = await response.json();
      setFormEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setIsEntriesLoading(false);
    }
  };

  const handleDownloadCsv = async () => {
    setIsCsvDownloading(true);
    try {
      // Log the URL we're trying to fetch (for debugging)
      console.log("Fetching from:", "/api/export-csv");
      
      // Use the correct API endpoint with full path
      const response = await fetch("/api/export-csv", {
        // Add cache busting query parameter
        headers: {
          // Add a custom header that will pass through the referer check
          'X-From-Admin': 'true'
        },
        // Explicitly set these fetch options
        cache: 'no-store',
        credentials: 'same-origin'
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to download CSV: ${response.status} ${response.statusText}`);
      }
      
      // Extract filename from Content-Disposition header if available
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "milkar-leads.csv";
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }
      
      // Create a blob from the response
      const blob = await response.blob();
      console.log("Blob size:", blob.size);
      
      // Create a link to download the blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;
      
      // Add to document, click it, and remove it
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      
    } catch (error) {
      console.error("Error downloading CSV:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert("Failed to download CSV. Please try again. Error: " + errorMessage);
    } finally {
      setIsCsvDownloading(false);
    }
  };

  const handleViewLead = (entry: FormEntry) => {
      setSelectedEntry(entry);
      setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const filteredEntries = formEntries.filter(entry => {
    if (!filterQuery.trim()) return true;
    
    const searchTerm = filterQuery.toLowerCase();
    return (
      (entry.name && entry.name.toLowerCase().includes(searchTerm)) ||
      (entry.email && entry.email.toLowerCase().includes(searchTerm)) ||
      (entry.phone && entry.phone.toLowerCase().includes(searchTerm)) ||
      (entry.propertyType && entry.propertyType.toLowerCase().includes(searchTerm))
    );
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-600">MILKAR</h1>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">Admin Login</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            {loginError && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm flex items-center">
                <svg className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="email"
                    required
                    value={loginData.username}
                    onChange={handleLoginChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="admin@milkar.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>
              
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Sign in
              </button>
            </form>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Use email: admin@milkar.com and password: Admin#2025</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show dashboard if authenticated
  return (
    <div className="min-h-screen bg-gray-50 pt-20 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Lead Management</h2>
                <button
                  onClick={handleLogout}
                  className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-gray-600 hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
              <p className="text-gray-600">View and manage all your property inquiry submissions</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={fetchFormEntries}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                disabled={isEntriesLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isEntriesLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={handleDownloadCsv}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                disabled={isCsvDownloading}
              >
                {isCsvDownloading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Search & Filter */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, phone or property type..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          
          {/* Leads Table */}
          <div className="overflow-x-auto">
            {isEntriesLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-600 border-t-transparent mb-2"></div>
                <p className="text-gray-600">Loading entries...</p>
              </div>
            ) : formEntries.length === 0 ? (
              <div className="py-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Database className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No entries found</p>
                <p className="text-sm text-gray-500">Entries will appear here once users submit the contact form</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name & Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget & Timeline
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntries.map((entry, index) => (
                    <tr key={entry._id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-medium">
                            {entry.name ? entry.name.charAt(0).toUpperCase() : "?"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{entry.name || "N/A"}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-3 w-3 mr-1" /> {entry.email || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">{entry.phone || "N/A"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 font-medium">
                          {entry.propertyType ? entry.propertyType.charAt(0).toUpperCase() + entry.propertyType.slice(1) : "N/A"}
                          {entry.propertySubType ? ` - ${entry.propertySubType}` : ""}
                        </div>
                        <div className="text-sm text-gray-500">
                          {Array.isArray(entry.location) && entry.location.length > 0 
                            ? `Location: ${entry.location.join(", ")}` 
                            : entry.location 
                              ? `Location: ${entry.location}`
                              : "Location: Not specified"
                          }
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.purpose ? `Purpose: ${entry.purpose}` : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.budget 
                            ? typeof entry.budget === 'string' 
                              ? entry.budget.replace(/-/g, ' ').split(' ').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ') 
                              : entry.budget
                            : "Not specified"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.sizeRange ? `Size: ${entry.sizeRange} ${entry.sizeUnit || ''}` : ""}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.timeline 
                            ? typeof entry.timeline === 'string'
                              ? `Timeline: ${entry.timeline.replace(/-/g, ' ')}`
                              : `Timeline: ${entry.timeline}`
                            : ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewLead(entry)}
                          className="text-orange-600 hover:text-orange-900 inline-flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center w-full">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredEntries.length}</span> entries
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={true}
                >
                  Previous
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={true}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Details Modal */}
      {isModalOpen && selectedEntry && (
        <LeadDetailsModal entry={selectedEntry} onClose={closeModal} />
      )}
    </div>
  );
}