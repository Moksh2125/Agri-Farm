import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Calendar, User, Mail, Phone, BuildingOffice, FileText, Tag, Loader, Check, ChevronLeft } from 'lucide-react';

const SchemeSubmission: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    organizationName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    deadline: '',
    description: '',
    eligibility: '',
    benefits: '',
    documents: '',
    applicationProcess: '',
    website: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.title.trim()) newErrors.title = 'Scheme title is required';
    if (!formData.provider) newErrors.provider = 'Provider type is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    if (!formData.deadline.trim()) newErrors.deadline = 'Deadline is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.eligibility.trim()) newErrors.eligibility = 'Eligibility criteria is required';
    if (!formData.benefits.trim()) newErrors.benefits = 'Benefits is required';
    
    // Email validation
    if (formData.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    // Website validation (if provided)
    if (formData.website && !/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementsByName(firstErrorField)[0];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call - in a real app, this would be a POST request to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting scheme:', error);
      setErrors({
        form: 'There was an error submitting your scheme. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Scheme Submitted Successfully</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Thank you for submitting your agricultural scheme. Our team will review your submission and get in touch with you if we need any additional information.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/schemes')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back to Schemes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate('/schemes')}
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Schemes
        </button>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Submit a New Scheme</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Share agricultural schemes, subsidies, or events with our farming community
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Submit a Scheme</h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-200">
                <p>
                  Help farmers discover valuable resources by submitting agricultural schemes. All submissions are reviewed by our team before being published.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {errors.form && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-700 dark:text-red-300">
              {errors.form}
            </div>
          )}

          {/* Scheme Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Scheme Information</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Scheme Title *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.title ? 'border-red-300 dark:border-red-500' : ''}`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="provider" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Provider Type *
                </label>
                <div className="mt-1">
                  <select
                    id="provider"
                    name="provider"
                    value={formData.provider}
                    onChange={handleInputChange}
                    className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.provider ? 'border-red-300 dark:border-red-500' : ''}`}
                  >
                    <option value="">Select type</option>
                    <option value="government">Government</option>
                    <option value="bank">Bank</option>
                    <option value="corporate">Corporate</option>
                    <option value="event">Event</option>
                  </select>
                  {errors.provider && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.provider}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Organization Name *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="organizationName"
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.organizationName ? 'border-red-300 dark:border-red-500' : ''}`}
                  />
                  {errors.organizationName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.organizationName}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Application Deadline *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className={`pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.deadline ? 'border-red-300 dark:border-red-500' : ''}`}
                  />
                  {errors.deadline && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.deadline}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.description ? 'border-red-300 dark:border-red-500' : ''}`}
                    placeholder="Provide a detailed description of the scheme including its purpose and goals"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Eligibility Criteria *
                </label>
                <div className="mt-1">
                  <textarea
                    id="eligibility"
                    name="eligibility"
                    rows={3}
                    value={formData.eligibility}
                    onChange={handleInputChange}
                    className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.eligibility ? 'border-red-300 dark:border-red-500' : ''}`}
                    placeholder="Who is eligible to apply for this scheme?"
                  />
                  {errors.eligibility && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.eligibility}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Benefits *
                </label>
                <div className="mt-1">
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows={3}
                    value={formData.benefits}
                    onChange={handleInputChange}
                    className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.benefits ? 'border-red-300 dark:border-red-500' : ''}`}
                    placeholder="What benefits will farmers receive from this scheme?"
                  />
                  {errors.benefits && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.benefits}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="documents" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Required Documents
                </label>
                <div className="mt-1">
                  <textarea
                    id="documents"
                    name="documents"
                    rows={2}
                    value={formData.documents}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                    placeholder="List any documents needed for application (e.g., ID proof, land records)"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="applicationProcess" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Application Process
                </label>
                <div className="mt-1">
                  <textarea
                    id="applicationProcess"
                    name="applicationProcess"
                    rows={2}
                    value={formData.applicationProcess}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                    placeholder="Describe the steps to apply for this scheme"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Official Website
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className={`shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.website ? 'border-red-300 dark:border-red-500' : ''}`}
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.website}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                    placeholder="e.g., irrigation, loans, training (comma separated)"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Add relevant tags to help farmers find your scheme more easily
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Person *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="contactName"
                    id="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className={`pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.contactName ? 'border-red-300 dark:border-red-500' : ''}`}
                  />
                  {errors.contactName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactName}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="contactEmail"
                    id="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className={`pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md ${errors.contactEmail ? 'border-red-300 dark:border-red-500' : ''}`}
                  />
                  {errors.contactEmail && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.contactEmail}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="contactPhone"
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="pl-10 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/schemes')}
                className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Scheme'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemeSubmission;