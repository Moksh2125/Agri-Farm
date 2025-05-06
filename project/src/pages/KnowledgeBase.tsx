import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag, ChevronRight, Leaf, Clock, BookOpen, Filter } from 'lucide-react';

// Types
interface Article {
  id: string;
  title: string;
  summary: string;
  category: 'crops' | 'vegetables' | 'pests' | 'diseases' | 'techniques' | 'seasonal';
  readTime: number;
  tags: string[];
  thumbnail: string;
  date: string;
}

// Sample articles
const articles: Article[] = [
  {
    id: '1',
    title: 'Complete Guide to Wheat Cultivation',
    summary: 'Learn everything about wheat cultivation from soil preparation to harvesting techniques.',
    category: 'crops',
    readTime: 12,
    tags: ['wheat', 'cultivation', 'soil preparation', 'harvesting'],
    thumbnail: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
    date: '2023-05-15'
  },
  {
    id: '2',
    title: 'Identifying and Managing Tomato Blight',
    summary: 'A comprehensive guide to identifying, preventing, and treating tomato blight in your garden.',
    category: 'diseases',
    readTime: 8,
    tags: ['tomato', 'disease', 'blight', 'prevention'],
    thumbnail: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    date: '2023-04-22'
  },
  {
    id: '3',
    title: 'Sustainable Pest Management for Organic Farms',
    summary: 'Discover effective and eco-friendly methods to control pests without harmful chemicals.',
    category: 'pests',
    readTime: 10,
    tags: ['organic', 'pest control', 'sustainable', 'eco-friendly'],
    thumbnail: 'https://images.pexels.com/photos/7728083/pexels-photo-7728083.jpeg',
    date: '2023-06-03'
  },
  {
    id: '4',
    title: 'Seasonal Planting Guide for Monsoon',
    summary: 'What to plant during the monsoon season to maximize yield and minimize disease.',
    category: 'seasonal',
    readTime: 6,
    tags: ['monsoon', 'seasonal', 'planting guide'],
    thumbnail: 'https://images.pexels.com/photos/5472308/pexels-photo-5472308.jpeg',
    date: '2023-05-30'
  },
  {
    id: '5',
    title: 'Modern Irrigation Techniques for Water Conservation',
    summary: 'Explore the latest irrigation technologies to save water while improving crop yield.',
    category: 'techniques',
    readTime: 14,
    tags: ['irrigation', 'water conservation', 'technology', 'efficiency'],
    thumbnail: 'https://images.pexels.com/photos/2254030/pexels-photo-2254030.jpeg',
    date: '2023-03-18'
  },
  {
    id: '6',
    title: 'Growing Nutrient-Rich Vegetables in Small Spaces',
    summary: 'Tips and techniques for growing vegetables in limited space like balconies and small gardens.',
    category: 'vegetables',
    readTime: 9,
    tags: ['vegetables', 'small space', 'urban farming', 'container gardening'],
    thumbnail: 'https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg',
    date: '2023-06-10'
  },
  {
    id: '7',
    title: 'Natural Soil Amendments to Improve Fertility',
    summary: 'Discover organic ways to enhance soil fertility and structure for better plant growth.',
    category: 'techniques',
    readTime: 11,
    tags: ['soil', 'fertility', 'organic', 'amendments'],
    thumbnail: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg',
    date: '2023-04-05'
  },
  {
    id: '8',
    title: 'Essential Guide to Rice Cultivation',
    summary: 'From paddy preparation to harvesting, learn the complete process of rice cultivation.',
    category: 'crops',
    readTime: 15,
    tags: ['rice', 'cultivation', 'paddy farming'],
    thumbnail: 'https://images.pexels.com/photos/5677011/pexels-photo-5677011.jpeg',
    date: '2023-05-05'
  }
];

// Get all unique tags
const allTags = Array.from(new Set(articles.flatMap(article => article.tags))).sort();

// Category information
const categories = [
  { id: 'crops', name: 'Crops', icon: <Leaf className="h-5 w-5" /> },
  { id: 'vegetables', name: 'Vegetables', icon: <Leaf className="h-5 w-5" /> },
  { id: 'pests', name: 'Pests', icon: <Leaf className="h-5 w-5" /> },
  { id: 'diseases', name: 'Diseases', icon: <Leaf className="h-5 w-5" /> },
  { id: 'techniques', name: 'Techniques', icon: <Leaf className="h-5 w-5" /> },
  { id: 'seasonal', name: 'Seasonal', icon: <Leaf className="h-5 w-5" /> },
];

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setSearchTerm('');
  };

  // Filter articles based on search term, category, and tags
  const filteredArticles = articles.filter(article => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === null || article.category === selectedCategory;
    
    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Farming Knowledge Base</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Educational resources and guides to help you improve your agricultural practices
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="relative inline-block">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter by Topics
              {(selectedCategory || selectedTags.length > 0) && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {(selectedCategory ? 1 : 0) + selectedTags.length}
                </span>
              )}
            </button>
            <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10 divide-y divide-gray-100 dark:divide-gray-600">
              <div className="py-1">
                <div className="px-4 py-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Categories</h3>
                  <div className="mt-2 space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          id={`filter-${category.id}`}
                          name={`filter-${category.id}`}
                          type="checkbox"
                          checked={selectedCategory === category.id}
                          onChange={() => toggleCategory(category.id)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`filter-${category.id}`} className="ml-2 text-sm text-gray-700 dark:text-gray-200">
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="py-1">
                <div className="px-4 py-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Popular Tags</h3>
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center">
                        <input
                          id={`filter-tag-${tag}`}
                          name={`filter-tag-${tag}`}
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
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

        {/* Active filters display */}
        {(selectedCategory || selectedTags.length > 0) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCategory && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {categories.find(c => c.id === selectedCategory)?.name}
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:text-green-500 focus:outline-none"
                >
                  <span className="sr-only">Remove filter</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            )}

            {selectedTags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 capitalize">
                {tag}
                <button
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Remove filter for {tag}</span>
                  <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
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

      {/* Feature article - first article in the list */}
      {filteredArticles.length > 0 && (
        <div className="mb-12">
          <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={filteredArticles[0].thumbnail}
                  alt={filteredArticles[0].title}
                  className="h-64 md:h-96 w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400 capitalize">
                    {filteredArticles[0].category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {filteredArticles[0].title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {filteredArticles[0].summary}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{filteredArticles[0].readTime} min read</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(filteredArticles[0].date)}</span>
                </div>
                <Link
                  to={`/knowledge/${filteredArticles[0].id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Read Full Article
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles grid */}
      {filteredArticles.length > 1 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map(article => (
            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <Link to={`/knowledge/${article.id}`} className="block">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                  <span className="text-sm text-green-600 dark:text-green-400 capitalize">
                    {article.category}
                  </span>
                </div>
                <Link to={`/knowledge/${article.id}`} className="block">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {article.summary}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readTime} min read</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
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
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any articles matching your search or filters. Try adjusting your criteria or browse all articles.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Clear filters
          </button>
        </div>
      ) : null}

      {/* Categories section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-green-100 dark:bg-green-900'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`p-3 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              } mb-2`}>
                {category.icon}
              </div>
              <span className={`text-sm font-medium ${
                selectedCategory === category.id
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-16 bg-green-50 dark:bg-green-900/20 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Contribute to Our Knowledge Base
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Are you an agricultural expert? Share your knowledge with our farming community.
        </p>
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Submit an Article
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBase;