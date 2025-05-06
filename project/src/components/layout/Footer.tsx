import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">AgriFarm</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
              Empowering farmers globally with knowledge, resources, and connections to help them thrive.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Agricultural Schemes
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/image-upload" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Image Upload
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Farming Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Seasonal Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Disease Identification
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm">
                  Market Prices
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">123 Farm Street, Agriculture District, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">support@agrifarm.com</span>
              </li>
              <li className="flex items-center mt-4 space-x-3">
                <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                  <Youtube className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AgriFarm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;