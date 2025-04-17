"use client";

import { useState, useEffect } from "react";
import { 
  Eye, 
  Download, 
  X, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Calendar,
  Clock,
  Filter,
  AlertTriangle
} from "lucide-react";

// Define the form entry interface that matches your contact form
interface FormEntry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  propertySubType?: string;
  budget: string;
  location: string[];
  sizeRange?: string;
  sizeUnit?: string;
  bedrooms?: string;
  amenities?: string[];
  purpose?: string;
  timeline?: string;
  message?: string;
  createdAt: string;
}

interface DashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: DashboardProps) {
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<FormEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<FormEntry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [filterOptions, setFilterOptions] = useState({
    propertyType: "",
    budget: "",
    dateRange: ""
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Fetch entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  // Apply filtering and search
  useEffect(() => {
    if (entries.length > 0) {
      let filtered = [...entries];
      
      // Apply search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(entry => 
          entry.name?.toLowerCase().includes(searchLower) ||
          entry.email?.toLowerCase().includes(searchLower) ||
          entry.phone?.includes(searchLower) ||
          (entry.location && Array.isArray(entry.location) && entry.location.some(loc => loc.toLowerCase().includes(searchLower))) ||
          (entry.message && entry.message.toLowerCase().includes(searchLower))
        );
      }
      
      // Apply filters
      if (filterOptions.propertyType) {
        filtered = filtered.filter(entry => entry.propertyType === filterOptions.propertyType);
      }
      
      if (filterOptions.budget) {
        filtered = filtered.filter(entry => entry.budget === filterOptions.budget);
      }
      
      if (filterOptions.dateRange) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        switch(filterOptions.dateRange) {
          case "today":
            filtered = filtered.filter(entry => {
              const entryDate = new Date(entry.createdAt);
              return entryDate >= today;
            });
            break;
          case "week":
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            filtered = filtered.filter(entry => {
              const entryDate = new Date(entry.createdAt);
              return entryDate >= weekAgo;
            });
            break;
          case "month":
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            filtered = filtered.filter(entry => {
              const entryDate = new Date(entry.createdAt);
              return entryDate >= monthAgo;
            });
            break;
        }
      }
      
      setFilteredEntries(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [entries, searchTerm, filterOptions]);

  const fetchEntries = async () => {
    setIsLoading(true);
    setFetchError("");
    
    try {
      // Fetch entries from the API
      const response = await fetch("/api/admin/entries");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch entries: ${response.statusText}`);
      }
      
      const data = await response.json();
      setEntries(Array.isArray(data) ? data : []);
      setFilteredEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching entries:", error);
      setFetchError(error instanceof Error ? error.message : "Failed to fetch entries");
      // Initialize with empty arrays
      setEntries([]);
      setFilteredEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = async () => {
    if (filteredEntries.length === 0) return;
    
    try {
      setIsLoading(true);
      
      // Use the API endpoint to download CSV
      const response = await fetch("/api/admin/download");
      
      if (!response.ok) {
        throw new Error("Failed to generate CSV");
      }
      
      // Get the CSV content
      const csvContent = await response.text();
      
      // Create and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `milkar-leads-${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("Failed to download CSV. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions to format data for display
  const formatPropertyType = (type: string): string => {
    const typeMap: {[key: string]: string} = {
      "plot": "Plot/Land",
      "apartment": "Apartment/Flat",
      "house": "House/Villa",
      "commercial": "Commercial Property"
    };
    return typeMap[type] || type;
  };

  const formatPropertySubType = (subType: string): string => {
    const subTypeMap: {[key: string]: string} = {
      "residential_plot": "Residential Plot",
      "commercial_plot": "Commercial Plot",
      "agricultural_land": "Agricultural Land",
      "industrial_plot": "Industrial Plot",
      "flat": "Flat",
      "penthouse": "Penthouse",
      "studio": "Studio Apartment",
      "service": "Service Apartment",
      "villa": "Villa",
      "independent_house": "Independent House",
      "row_house": "Row House",
      "farmhouse": "Farmhouse",
      "bungalow": "Bungalow",
      "office_space": "Office Space",
      "shop": "Shop/Showroom",
      "warehouse": "Warehouse/Godown",
      "industrial": "Industrial Building",
      "coworking": "Co-working Space"
    };
    return subTypeMap[subType] || subType;
  };

  const formatBudget = (budget: string): string => {
    const budgetMap: {[key: string]: string} = {
      "under_20L": "Under ₹20 Lakhs",
      "20L_40L": "₹20 Lakhs - ₹40 Lakhs",
      "40L_60L": "₹40 Lakhs - ₹60 Lakhs",
      "60L_80L": "₹60 Lakhs - ₹80 Lakhs",
      "80L_1Cr": "₹80 Lakhs - ₹1 Crore",
      "1Cr_1.5Cr": "₹1 Crore - ₹1.5 Crore",
      "1.5Cr_2Cr": "₹1.5 Crore - ₹2 Crore",
      "2Cr_3Cr": "₹2 Crore - ₹3 Crore",
      "above_3Cr": "Above ₹3 Crore"
    };
    return budgetMap[budget] || budget;
  };

  const formatSizeRange = (sizeRange: string): string => {
    if (!sizeRange) return "";
    
    // Maps for different property types
    const plotSizeMap: {[key: string]: string} = {
      "below_1000": "Below 1000",
      "1000_1500": "1000 - 1500",
      "1500_2000": "1500 - 2000",
      "2000_3000": "2000 - 3000",
      "3000_4000": "3000 - 4000",
      "4000_5000": "4000 - 5000",
      "above_5000": "Above 5000"
    };
    
    const houseSizeMap: {[key: string]: string} = {
      "below_1500": "Below 1500 sq ft",
      "1500_2000": "1500 - 2000 sq ft",
      "2000_3000": "2000 - 3000 sq ft",
      "3000_4000": "3000 - 4000 sq ft",
      "4000_5000": "4000 - 5000 sq ft",
      "above_5000": "Above 5000 sq ft"
    };
    
    const commercialSizeMap: {[key: string]: string} = {
      "below_500": "Below 500 sq ft",
      "500_1000": "500 - 1000 sq ft",
      "1000_2000": "1000 - 2000 sq ft",
      "2000_5000": "2000 - 5000 sq ft",
      "above_5000": "Above 5000 sq ft"
    };
    
    // Try all maps
    return plotSizeMap[sizeRange] || houseSizeMap[sizeRange] || commercialSizeMap[sizeRange] || sizeRange;
  };

  const formatPurpose = (purpose: string): string => {
    const purposeMap: {[key: string]: string} = {
      "investment": "Investment",
      "self_use": "Self Use/End Use",
      "rental": "Rental Income"
    };
    return purposeMap[purpose] || purpose;
  };

  const formatTimeline = (timeline: string): string => {
    const timelineMap: {[key: string]: string} = {
      "immediate": "Immediate (0-3 months)",
      "short_term": "Short Term (3-6 months)",
      "mid_term": "Mid Term (6-12 months)",
      "long_term": "Long Term (Over 12 months)"
    };
    return timelineMap[timeline] || timeline;
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // Handle pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // View entry details
  const handleViewDetails = (entry: FormEntry) => {
    setSelectedEntry(entry);
    setIsDetailModalOpen(true);
  };

  const resetFilters = () => {
    setFilterOptions({
      propertyType: "",
      budget: "",
      dateRange: ""
    });
    setSearchTerm("");
  };

  if (isLoading && entries.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-600 border-t-transparent"></div>
          <p className="mt-4 text-lg text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">MILKAR Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {fetchError && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error fetching data</h3>
                <p className="mt-1 text-sm text-red-700">{fetchError}</p>
                <button 
                  onClick={fetchEntries}
                  className="mt-2 text-sm font-medium text-red-800 hover:text-red-900"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Contact Form Entries
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'})
                </span>
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                {/* Filter Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                    className={`inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      Object.values(filterOptions).some(val => val !== "") 
                        ? "bg-orange-50 text-orange-600 border-orange-300" 
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {Object.values(filterOptions).some(val => val !== "") && (
                      <span className="ml-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {Object.values(filterOptions).filter(val => val !== "").length}
                      </span>
                    )}
                  </button>
                  
                  {/* Filter Menu */}
                  {isFilterMenuOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-sm font-medium text-gray-900">Filters</h3>
                          <button
                            onClick={resetFilters}
                            className="text-xs text-orange-600 hover:text-orange-800"
                          >
                            Reset all
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="filterPropertyType" className="block text-xs font-medium text-gray-700 mb-1">
                              Property Type
                            </label>
                            <select
                              id="filterPropertyType"
                              value={filterOptions.propertyType}
                              onChange={(e) => setFilterOptions({...filterOptions, propertyType: e.target.value})}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">All Types</option>
                              <option value="plot">Plot/Land</option>
                              <option value="apartment">Apartment/Flat</option>
                              <option value="house">House/Villa</option>
                              <option value="commercial">Commercial Property</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="filterBudget" className="block text-xs font-medium text-gray-700 mb-1">
                              Budget Range
                            </label>
                            <select
                              id="filterBudget"
                              value={filterOptions.budget}
                              onChange={(e) => setFilterOptions({...filterOptions, budget: e.target.value})}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">All Budgets</option>
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
                            <label htmlFor="filterDateRange" className="block text-xs font-medium text-gray-700 mb-1">
                              Date Range
                            </label>
                            <select
                              id="filterDateRange"
                              value={filterOptions.dateRange}
                              onChange={(e) => setFilterOptions({...filterOptions, dateRange: e.target.value})}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">All Time</option>
                              <option value="today">Today</option>
                              <option value="week">Last 7 Days</option>
                              <option value="month">Last 30 Days</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Download CSV Button */}
                <button
                  onClick={downloadCSV}
                  disabled={filteredEntries.length === 0 || isLoading}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    filteredEntries.length === 0 || isLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download CSV
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {filteredEntries.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No entries found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {entries.length > 0 
                    ? "Try adjusting your search or filters to see more results." 
                    : "Form submissions will appear here once users fill out the contact form."}
                </p>
                {entries.length > 0 && Object.values(filterOptions).some(val => val !== "") && (
                  <button
                    onClick={resetFilters}
                    className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEntries.map((entry) => (
                    <tr key={entry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{entry.email}</div>
                        <div className="text-sm text-gray-500">{entry.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatPropertyType(entry.propertyType)}</div>
                        {entry.propertySubType && (
                          <div className="text-sm text-gray-500">{formatPropertySubType(entry.propertySubType)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatBudget(entry.budget)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(entry.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetails(entry)}
                          className="text-orange-600 hover:text-orange-900 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-md transition-colors inline-flex items-center"
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
          {filteredEntries.length > entriesPerPage && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstEntry + 1}</span> to{" "}
                    <span className="font-medium">
                      {indexOfLastEntry > filteredEntries.length ? filteredEntries.length : indexOfLastEntry}
                    </span>{" "}
                    of <span className="font-medium">{filteredEntries.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                      // Only show current page, first page, last page, and pages +/- 1 from current
                      if (
                        number === 1 ||
                        number === totalPages ||
                        number === currentPage ||
                        number === currentPage - 1 ||
                        number === currentPage + 1
                      ) {
                        return (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === number
                                ? "z-10 bg-orange-50 border-orange-500 text-orange-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {number}
                          </button>
                        );
                      }
                      
                      // Show ellipsis for gaps
                      if (
                        (number === 2 && currentPage > 3) ||
                        (number === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <span
                            key={number}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        );
                      }
                      
                      return null;
                    })}
                    
                    <button
                      onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Detail Modal */}
      {isDetailModalOpen && selectedEntry && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Inquiry Details
                      </h3>
                      <button
                        onClick={() => setIsDetailModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Personal Information</h4>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-gray-900 mb-1">{selectedEntry.name}</p>
                            <p className="text-sm text-gray-600 mb-1">{selectedEntry.email}</p>
                            <p className="text-sm text-gray-600">{selectedEntry.phone}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Date Submitted</h4>
                          <div className="bg-gray-50 p-3 rounded-md flex items-center">
                            <Calendar className="h-4 w-4 text-orange-600 mr-2" />
                            <p className="text-sm text-gray-900">{formatDate(selectedEntry.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 py-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Property Requirements</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Property Type</p>
                          <p className="text-sm font-medium">{formatPropertyType(selectedEntry.propertyType)}</p>
                        </div>
                        
                        {selectedEntry.propertySubType && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Property Sub-Type</p>
                            <p className="text-sm font-medium">{formatPropertySubType(selectedEntry.propertySubType)}</p>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Budget Range</p>
                          <p className="text-sm font-medium">{formatBudget(selectedEntry.budget)}</p>
                        </div>
                        
                        {selectedEntry.purpose && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Purpose</p>
                            <p className="text-sm font-medium">{formatPurpose(selectedEntry.purpose)}</p>
                          </div>
                        )}
                        
                        {selectedEntry.timeline && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Timeline</p>
                            <p className="text-sm font-medium">{formatTimeline(selectedEntry.timeline)}</p>
                          </div>
                        )}
                        
                        {selectedEntry.bedrooms && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Bedrooms</p>
                            <p className="text-sm font-medium">
                              {selectedEntry.propertyType === 'apartment' 
                                ? `${selectedEntry.bedrooms} BHK` 
                                : `${selectedEntry.bedrooms} Bedroom${selectedEntry.bedrooms !== '1' ? 's' : ''}`}
                            </p>
                          </div>
                        )}
                        
                        {selectedEntry.sizeRange && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Size Range</p>
                            <p className="text-sm font-medium">
                              {formatSizeRange(selectedEntry.sizeRange)}
                              {selectedEntry.sizeUnit ? ` (${selectedEntry.sizeUnit})` : ''}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {selectedEntry.location && selectedEntry.location.length > 0 && (
                      <div className="border-t border-gray-200 py-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Preferred Locations</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(selectedEntry.location) ? (
                            selectedEntry.location.map((loc, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                              >
                                {loc}
                              </span>
                            ))
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              {selectedEntry.location}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {selectedEntry.amenities && selectedEntry.amenities.length > 0 && (
                      <div className="border-t border-gray-200 py-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Desired Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(selectedEntry.amenities) ? (
                            selectedEntry.amenities.map((amenity, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {amenity}
                              </span>
                            ))
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {selectedEntry.amenities}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {selectedEntry.message && (
                      <div className="border-t border-gray-200 py-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Additional Requirements</h4>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-sm text-gray-700 whitespace-pre-line">{selectedEntry.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}