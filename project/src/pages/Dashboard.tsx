import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, BookOpen, CheckSquare, AlertTriangle, BarChart4, Cloud, Sun, Droplets } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface WeatherCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ icon, value, label }) => (
  <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {user?.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Here's your farming dashboard</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/image-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Camera className="h-4 w-4 mr-2" />
            Upload New Image
          </Link>
        </div>
      </div>

      {/* Weather Section */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Today's Weather</h2>
          <p className="text-white text-sm">Mumbai, India</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <WeatherCard 
            icon={<Sun className="h-6 w-6 text-yellow-500" />} 
            value="32°C" 
            label="Temperature" 
          />
          <WeatherCard 
            icon={<Cloud className="h-6 w-6 text-blue-500" />} 
            value="40%" 
            label="Humidity" 
          />
          <WeatherCard 
            icon={<Droplets className="h-6 w-6 text-blue-500" />} 
            value="20%" 
            label="Rain Chance" 
          />
          <WeatherCard 
            icon={<Wind className="h-6 w-6 text-blue-500" />} 
            value="10 km/h" 
            label="Wind Speed" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/image-upload" className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
              <div className="p-2 rounded-md bg-green-100 dark:bg-green-900 mr-3">
                <Camera className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Upload Crop Image</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyze crop health issues</p>
              </div>
            </Link>
            
            <Link to="/schemes" className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
              <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900 mr-3">
                <BarChart4 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Browse Schemes</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Access agricultural subsidies</p>
              </div>
            </Link>
            
            <Link to="/knowledge" className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
              <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900 mr-3">
                <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-medium">Knowledge Base</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Learn farming techniques</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start p-3 border-l-4 border-green-600 bg-gray-50 dark:bg-gray-700 rounded-r-md">
              <CheckSquare className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
              <div className="ml-3">
                <p className="text-gray-900 dark:text-white">Crop analysis completed</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your wheat crop images show healthy growth patterns</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 border-l-4 border-yellow-600 bg-gray-50 dark:bg-gray-700 rounded-r-md">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div className="ml-3">
                <p className="text-gray-900 dark:text-white">Pest alert in your region</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Increase in grasshopper population reported in neighboring farms</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 border-l-4 border-blue-600 bg-gray-50 dark:bg-gray-700 rounded-r-md">
              <BarChart4 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div className="ml-3">
                <p className="text-gray-900 dark:text-white">New agricultural scheme available</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Government announces subsidy for drip irrigation systems</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
          <Link to="#" className="block text-center mt-4 text-sm text-green-600 dark:text-green-400 hover:underline">
            View all activity
          </Link>
        </div>
      </div>

      {/* Upcoming Events & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="flex flex-col items-center justify-center bg-green-100 dark:bg-green-900 rounded-md p-2 mr-4 w-14 h-14">
                <span className="text-green-600 dark:text-green-400 font-bold">15</span>
                <span className="text-green-600 dark:text-green-400 text-xs">MAY</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Farmer's Workshop</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sustainable Irrigation Techniques</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="flex flex-col items-center justify-center bg-green-100 dark:bg-green-900 rounded-md p-2 mr-4 w-14 h-14">
                <span className="text-green-600 dark:text-green-400 font-bold">22</span>
                <span className="text-green-600 dark:text-green-400 text-xs">MAY</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Market Day</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Agricultural Products Exhibition</p>
              </div>
            </div>
          </div>
          <Link to="#" className="block text-center mt-4 text-sm text-green-600 dark:text-green-400 hover:underline">
            View all events
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Seasonal Recommendations</h2>
          <div className="space-y-3">
            <div className="flex p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-900 mr-3">
                <Sun className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Wheat Harvesting</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Optimal time for wheat harvesting in your region</p>
              </div>
            </div>
            
            <div className="flex p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900 mr-3">
                <CloudRain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Monsoon Preparation</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Prepare fields for upcoming rain season</p>
              </div>
            </div>
            
            <div className="flex p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <div className="p-2 rounded-md bg-green-100 dark:bg-green-900 mr-3">
                <Sprout className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Rice Planting</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Start rice seedling preparation for next season</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;