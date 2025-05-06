import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Upload, BookOpen, BarChart4, Leaf } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
                Empowering Farmers for a <span className="text-yellow-300">Sustainable Future</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8">
                Access resources, knowledge, and support to improve your farming practices and increase productivity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 shadow-lg flex items-center"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/knowledge"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300 transform hover:-translate-y-1 flex items-center"
                >
                  Learn More
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg" 
                alt="Farmer in field" 
                className="rounded-lg shadow-2xl max-h-96 object-cover mx-auto mt-8 lg:mt-0"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 transform -skew-y-2 origin-right -mb-8 z-0"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How AgriFarm Helps You</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides farmers with the tools and resources they need to thrive in modern agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Upload className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Image Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upload photos of your crops and receive instant analysis for disease identification and treatment recommendations.
              </p>
              <Link
                to="/image-upload"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center"
              >
                Try It Now
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BarChart4 className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Agricultural Schemes</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Discover government, bank, and corporate schemes designed to support farmers with subsidies and resources.
              </p>
              <Link
                to="/schemes"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center"
              >
                Explore Schemes
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BookOpen className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Knowledge Base</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Access comprehensive guides on plant growth, seasonal advice, and best cultivation practices.
              </p>
              <Link
                to="/knowledge"
                className="text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center"
              >
                Learn More
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Making a Difference</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform has helped thousands of farmers improve their productivity and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10,000+</p>
              <p className="text-gray-600 dark:text-gray-300">Registered Farmers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">500+</p>
              <p className="text-gray-600 dark:text-gray-300">Agricultural Schemes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1,000+</p>
              <p className="text-gray-600 dark:text-gray-300">Knowledge Articles</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">30+</p>
              <p className="text-gray-600 dark:text-gray-300">Countries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Farmers Say</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear from farmers who have transformed their agricultural practices with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">John Smith</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Wheat Farmer, USA</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The knowledge base has helped me optimize my irrigation practices, resulting in a 20% increase in yield this season."
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Maria Garcia</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Vegetable Grower, Mexico</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I identified a fungal infection early thanks to the image upload feature, saving my entire tomato crop from being lost."
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Rajesh Patel</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Rice Farmer, India</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Through the schemes portal, I accessed a government subsidy for solar-powered equipment that has reduced my costs significantly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Farming Community Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Take the first step towards improving your agricultural practices and connecting with resources that matter.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Register Now
            </Link>
            <Link
              to="/schemes"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300"
            >
              Explore Schemes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;