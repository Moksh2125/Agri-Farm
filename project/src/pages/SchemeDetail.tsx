import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clover as Government, Building2, Building as BuildingOffice, Calendar, Calendar as CalendarIcon, User, Mail, Phone, ArrowLeft, Download, ExternalLink, Clock, AlertTriangle, CheckCircle, Paperclip as PaperClip } from 'lucide-react';

// Types
interface Scheme {
  id: string;
  title: string;
  provider: 'government' | 'bank' | 'corporate' | 'event';
  description: string;
  deadline: string;
  eligibility: string;
  benefits: string;
  documents?: string;
  applicationProcess?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  tags: string[];
}

// Sample data (same as in Schemes.tsx)
const sampleSchemes: Scheme[] = [
  {
    id: '1',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    provider: 'government',
    description: 'Pradhan Mantri Fasal Bima Yojana (PMFBY) is a crop insurance scheme that provides financial support to farmers suffering crop loss/damage due to unforeseen events. The scheme aims to stabilize the income of farmers to ensure their continuance in farming and protect them from production risks.',
    deadline: '2023-12-31',
    eligibility: 'All farmers including sharecroppers and tenant farmers growing the notified crops. The scheme is mandatory for farmers who have availed crop loans for notified crops and voluntary for other farmers.',
    benefits: 'Financial assistance in case of crop damage due to natural calamities, pests & diseases. Low premium rates - 2% for Kharif crops, 1.5% for Rabi crops, and 5% for annual commercial/horticultural crops. Use of technology for quick assessment and settlement of claims.',
    documents: 'Land records, Bank account details, Aadhaar card, Sowing certificate, Proof of insurable interest',
    applicationProcess: '1. Approach the nearest agricultural office or authorized bank\n2. Fill the application form and submit required documents\n3. Pay the premium amount\n4. Receive the insurance acknowledgment',
    contactName: 'Ministry of Agriculture',
    contactEmail: 'pmfby@gov.in',
    contactPhone: '1800-110-001',
    website: 'https://pmfby.gov.in',
    tags: ['insurance', 'crop damage', 'financial']
  },
  {
    id: '2',
    title: 'Agriculture Infrastructure Fund',
    provider: 'bank',
    description: 'The Agriculture Infrastructure Fund is a financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets through interest subvention and financial support.',
    deadline: '2023-10-15',
    eligibility: 'Farmers, FPOs, PACS, Marketing Cooperative Societies, SHGs, Joint Liability Groups (JLG), Multipurpose Cooperative Societies, Agricultural entrepreneurs, Start-ups, and Central/State agency or Local Body sponsored PPP Projects.',
    benefits: 'Interest subvention of 3% per annum for loans up to Rs. 2 crores. Moratorium for principal repayment of up to 2 years. PMKSY, PIDF, and other schemes can be integrated with this fund to create larger facilities.',
    documents: 'Business plan, Land documents, Identity proof, Project report, Bank account details',
    applicationProcess: '1. Apply through the online portal or visit your local bank branch\n2. Submit project details and required documents\n3. After approval, loan will be sanctioned with interest subvention',
    contactName: 'Agriculture Finance Corporation',
    contactEmail: 'aif@nabard.org',
    contactPhone: '1800-111-222',
    website: 'https://agriinfra.dac.gov.in',
    tags: ['infrastructure', 'post-harvest', 'loans']
  },
  {
    id: '3',
    title: 'Green Revolution Scheme',
    provider: 'government',
    description: 'This comprehensive scheme promotes sustainable agriculture through organic farming techniques and modern technology. It aims to increase productivity while preserving environmental health.',
    deadline: '2023-11-30',
    eligibility: 'All farmers willing to adopt organic farming methods and modern agricultural practices.',
    benefits: 'Subsidies on organic inputs, training programs, and marketing support for organic produce.',
    documents: 'Land ownership documents, Bank account details, Identity proof',
    applicationProcess: 'Apply through local agricultural extension office with required documents',
    contactName: 'Department of Agriculture',
    contactEmail: 'greenrev@gov.in',
    contactPhone: '1800-333-444',
    tags: ['organic', 'sustainability', 'training']
  },
  {
    id: '4',
    title: 'Digital Agriculture Initiative',
    provider: 'corporate',
    description: 'A private sector initiative supporting farmers with digital tools and technologies to improve productivity and market access.',
    deadline: '2023-09-30',
    eligibility: 'Small and medium farmers interested in adopting digital agriculture technologies.',
    benefits: 'Free digital tools, training on digital literacy, access to market information.',
    applicationProcess: 'Register online through the corporate website',
    contactName: 'AgriTech Solutions Ltd.',
    contactEmail: 'support@agritech.com',
    tags: ['digital', 'technology', 'market access']
  },
  {
    id: '5',
    title: 'Rural Micro Irrigation Fund',
    provider: 'bank',
    description: 'Financial assistance for micro irrigation projects to enhance water use efficiency in agriculture.',
    deadline: '2023-12-15',
    eligibility: 'Individual farmers, FPOs, and water user associations implementing micro irrigation systems.',
    benefits: 'Low-interest loans and partial subsidies for setting up drip and sprinkler irrigation systems.',
    contactName: 'Rural Development Bank',
    contactEmail: 'microirrigation@rdb.org',
    tags: ['water', 'irrigation', 'efficiency']
  },
  {
    id: '6',
    title: 'Sustainable Agriculture Workshop',
    provider: 'event',
    description: 'Two-day workshop on sustainable farming practices with hands-on demonstrations from industry experts.',
    deadline: '2023-08-25',
    eligibility: 'Open to all farmers interested in sustainable agriculture.',
    benefits: 'Free registration, educational materials, and networking opportunities with experts.',
    applicationProcess: 'Register online or through local agricultural extension centers',
    contactName: 'Sustainable Farming Alliance',
    contactEmail: 'workshop@sfa.org',
    website: 'https://www.sustainablefarming.org/workshop',
    tags: ['workshop', 'education', 'sustainable']
  },
];

const SchemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState<Scheme | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to get scheme details
    const fetchScheme = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        const foundScheme = sampleSchemes.find(s => s.id === id);
        if (foundScheme) {
          setScheme(foundScheme);
        }
      } catch (error) {
        console.error('Error fetching scheme details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  // Helper function to get icon based on provider
  const getProviderIcon = (provider: 'government' | 'bank' | 'corporate' | 'event') => {
    switch (provider) {
      case 'government':
        return <Government className="h-6 w-6" />;
      case 'bank':
        return <Building2 className="h-6 w-6" />;
      case 'corporate':
        return <BuildingOffice className="h-6 w-6" />;
      case 'event':
        return <Calendar className="h-6 w-6" />;
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
        return 'Government Scheme';
      case 'bank':
        return 'Bank Offering';
      case 'corporate':
        return 'Corporate Initiative';
      case 'event':
        return 'Agricultural Event';
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate remaining days
  const calculateRemainingDays = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-green-600 border-r-transparent dark:border-green-400 dark:border-r-transparent"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scheme Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The scheme you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/schemes"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schemes
          </Link>
        </div>
      </div>
    );
  }

  const remainingDays = calculateRemainingDays(scheme.deadline);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/schemes')}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Schemes
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Scheme Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <div className="flex items-center mb-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20`}>
              {getProviderIcon(scheme.provider)}
              <span className="ml-1">{getProviderLabel(scheme.provider)}</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">{scheme.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {scheme.tags.map(tag => (
              <span 
                key={tag} 
                className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 capitalize"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Deadline Banner */}
        <div className={`px-6 py-3 flex items-center justify-between ${
          remainingDays <= 7 ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300' : 
          remainingDays <= 30 ? 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' : 
          'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
        }`}>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-medium">Application Deadline: {formatDate(scheme.deadline)}</span>
          </div>
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              remainingDays <= 7 ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200' : 
              remainingDays <= 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' : 
              'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
            }`}>
              {remainingDays <= 0 ? (
                'Deadline passed'
              ) : (
                `${remainingDays} days remaining`
              )}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* Scheme Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About the Scheme</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {scheme.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Eligibility */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Eligibility</h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {scheme.eligibility}
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Benefits</h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {scheme.benefits}
                </p>
              </div>
            </div>
          </div>

          {/* Documents */}
          {scheme.documents && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Required Documents</h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <PaperClip className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {scheme.documents}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Application Process */}
          {scheme.applicationProcess && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How to Apply</h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {scheme.applicationProcess}
                </p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{scheme.contactName}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <a href={`mailto:${scheme.contactEmail}`} className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                  {scheme.contactEmail}
                </a>
              </div>
              {scheme.contactPhone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <a href={`tel:${scheme.contactPhone}`} className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                    {scheme.contactPhone}
                  </a>
                </div>
              )}
              {scheme.website && (
                <div className="flex items-center">
                  <ExternalLink className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <a 
                    href={scheme.website.startsWith('http') ? scheme.website : `https://${scheme.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Official Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            {remainingDays > 0 ? (
              <button
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Application Form
              </button>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 inline-block">
                <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Application deadline has passed. Please check back for future opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Schemes */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Similar Schemes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleSchemes
            .filter(s => s.id !== scheme.id && s.tags.some(tag => scheme.tags.includes(tag)))
            .slice(0, 2)
            .map(relatedScheme => (
              <div key={relatedScheme.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-5">
                  <div className="flex items-center mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProviderColor(relatedScheme.provider)}`}>
                      {getProviderIcon(relatedScheme.provider)}
                      <span className="ml-1">{getProviderLabel(relatedScheme.provider)}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                    {relatedScheme.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                    {relatedScheme.description}
                  </p>
                  <Link
                    to={`/schemes/${relatedScheme.id}`}
                    className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    View details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;