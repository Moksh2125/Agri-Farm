import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Clover as Government, Building2, Building as BuildingOffice, Calendar, PlusCircle, X } from 'lucide-react';

// Types
interface Scheme {
  id: string;
  title: string;
  provider: 'government' | 'bank' | 'corporate' | 'event';
  description: string;
  deadline: string;
  eligibility: string;
  benefits: string;
  tags: string[];
}

// Sample data
const sampleSchemes: Scheme[] = [
  {
    id: '1',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    provider: 'government',
    description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage due to unforeseen events.',
    deadline: '2023-12-31',
    eligibility: 'All farmers including sharecroppers and tenant farmers growing the notified crops.',
    benefits: 'Financial assistance in case of crop damage due to natural calamities, pests & diseases.',
    tags: ['insurance', 'crop damage', 'financial']
  },
  {
    id: '2',
    title: 'Agriculture Infrastructure Fund',
    provider: 'bank',
    description: 'Financing facility for investment in viable projects for post-harvest management infrastructure.',
    deadline: '2023-10-15',
    eligibility: 'Farmers, FPOs, PACS, Marketing Cooperative Societies, SHGs, Joint Liability Groups (JLG).',
    benefits: 'Interest subvention of 3% per annum for loans up to Rs. 2 crores.',
    tags: ['infrastructure', 'post-harvest', 'loans']
  },
  {
    id: '3',
    title: 'Green Revolution Scheme',
    provider: 'government',
    description: 'Promoting sustainable agriculture through organic farming techniques and modern technology.',
    deadline: '2023-11-30',
    eligibility: 'All farmers willing to adopt organic farming methods and modern agricultural practices.',
    benefits: 'Subsidies on organic inputs, training programs, and marketing support for organic produce.',
    tags: ['organic', 'sustainability', 'training']
  },
  {
    id: '4',
    title: 'Digital Agriculture Initiative',
    provider: 'corporate',
    description: 'Supporting farmers with digital tools and technologies to improve productivity and market access.',
    deadline: '2023-09-30',
    eligibility: 'Small and medium farmers interested in adopting digital agriculture technologies.',
    benefits: 'Free digital tools, training on digital literacy, access to market information.',
    tags: ['digital', 'technology', 'market access']
  },
  {
    id: '5',
    title: 'Rural Micro Irrigation Fund',
    provider: 'bank',
    description: 'Financial assistance for micro irrigation projects to enhance water use efficiency.',
    deadline: '2023-12-15',
    eligibility: 'Individual farmers, FPOs, and water user associations implementing micro irrigation systems.',
    benefits: 'Low-interest loans and partial subsidies for setting up drip and sprinkler irrigation systems.',
    tags: ['water', 'irrigation', 'efficiency']
  },
  {
    id: '6',
    title: 'Sustainable Agriculture Workshop',
    provider: 'event',
    description: 'Two-day workshop on sustainable farming practices with hands-on demonstrations.',
    deadline: '2023-08-25',
    eligibility: 'Open to all farmers interested in sustainable agriculture.',
    benefits: 'Free registration, educational materials, and networking opportunities with experts.',
    tags: ['workshop', 'education', 'sustainable']
  },
];

const Schemes: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>(sampleSchemes);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    provider: ('government' | 'bank' | 'corporate' | 'event')[];
    tags: string[];
  }>({
    provider: [],
    tags: []
  });

  // All available tags from schemes
  const allTags = Array.from(
    new Set(sampleSchemes.flatMap(scheme => scheme.tags))
  ).sort();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleProviderFilter = (provider: 'government' | 'bank' | 'corporate' | 'event') => {
    setActiveFilters(prev => {
      if (prev.provider.includes(provider)) {
        return {
          ...prev,
          provider: prev.provider.filter(p => p !== provider)
        };
      } else {
        return {
          ...prev,
          provider: [...prev.provider, provider]
        };
      }
    });
  };

  const toggleTagFilter = (tag: string) => {
    setActiveFilters(prev => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter(t => t !== tag)
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag]
        };
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      provider: [],
      tags: []
    });
    setSearchTerm('');
  };

  // Filter schemes based on search term and active filters
  useEffect(() => {
    let filtered = sampleSchemes;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(scheme => 
        scheme.title.toLowerCase().includes(term) || 
        scheme.description.toLowerCase().includes(term)
      );
    }
    
    // Apply provider filter
    if (activeFilters.provider.length > 0) {
      filtered = filtered.filter(scheme => 
        activeFilters.provider.includes(scheme.provider)
      );
    }
    
    // Apply tag filter
    if (activeFilters.tags.length > 0) {
      filtered = filtered.filter(scheme => 
        scheme.tags.some(tag => activeFilters.tags.includes(tag))
      );
    }
    
    setSchemes(filtered);
  }, [searchTerm, activeFilters]);

  // Helper function to get icon based on provider
  const getProviderIcon = (provider: 'government' | 'bank' | 'corporate' | 'event') => {
    switch (provider) {
      case 'government':
        return <Government className="h-5 w-5" />;
      case 'bank':
        return <Building2 className="h-5 w-5" />;
      case 'corporate':
        return <BuildingOffice className="h-5 w-5" />;
      case 'event':
        return <Calendar className="h-5 w-5" />;
    }
  };

  // Helper function to get color based on provider
  const getProviderColor = (provider: 'government' | 'bank' | 'corporate' | 'event') => {
    switch (provider) {
      case 'government':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'bank':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'corporate':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'event':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
    }
  };

  // Helper function to get provider label
  const getProviderLabel = (provider: 'government' | 'bank' | 'corporate' | 'event') => {
    switch (provider) {
      case 'government':
        return 'Government';
      case 'bank':
        return 'Bank';
      case 'corporate':
        return 'Corporate';
      case 'event':
        return 'Event';
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agricultural Schemes</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Discover government, bank, and corporate schemes to support your farming journey
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/schemes/submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-colors duration-200"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Submit a Scheme
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative inline-block">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {(activeFilters.provider.length > 0 || activeFilters.tags.length > 0) && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {activeFilters.provider.length + activeFilters.tags.length}
                  </span>
                )}
              </button>
              <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10 divide-y divide-gray-100 dark:divide-gray-600">
                <div className="py-1">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Provider Type</h3>
                    <div className="mt-2 space-y-2">
                      {(['government', 'bank', 'corporate', 'event'] as const).map((provider) => (
                        <div key={provider} className="flex items-center">
                          <input
                            id={`filter-${provider}`}
                            name={`filter-${provider}`}
                            type="checkbox"
                            checked={activeFilters.provider.includes(provider)}
                            onChange={() => toggleProviderFilter(provider)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`filter-${provider}`} className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                            {getProviderLabel(provider)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <div className="px-4 py-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tags</h3>
                    <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                      {allTags.map((tag) => (
                        <div key={tag} className="flex items-center">
                          <input
                            id={`filter-tag-${tag}`}
                            name={`filter-tag-${tag}`}
                            type="checkbox"
                            checked={activeFilters.tags.includes(tag)}
                            onChange={() => toggleTagFilter(tag)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`filter-tag-${tag}`} className="ml-2 text-sm text-gray-700 dark:text-gray-200 capitalize">
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Active filters */}
        {(activeFilters.provider.length > 0 || activeFilters.tags.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.provider.map(provider => (
              <span 
                key={provider}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {getProviderLabel(provider)}
                <button
                  type="button"
                  onClick={() => toggleProviderFilter(provider)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                >
                  <span className="sr-only">Remove filter for {provider}</span>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            
            {activeFilters.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 capitalize"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => toggleTagFilter(tag)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                >
                  <span className="sr-only">Remove filter for {tag}</span>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Schemes List */}
      <div className="space-y-6">
        {schemes.length > 0 ? (
          schemes.map(scheme => (
            <div key={scheme.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProviderColor(scheme.provider)}`}>
                        {getProviderIcon(scheme.provider)}
                        <span className="ml-1">{getProviderLabel(scheme.provider)}</span>
                      </span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        Deadline: {formatDate(scheme.deadline)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
                      {scheme.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                      {scheme.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {scheme.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 capitalize"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <Link
                    to={`/schemes/${scheme.id}`}
                    className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    View details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No schemes found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find more schemes.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;