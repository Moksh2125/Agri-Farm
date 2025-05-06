import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Bookmark, Share, ThumbsUp, MessageSquare, ChevronRight } from 'lucide-react';

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
  content?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
}

// Sample articles from KnowledgeBase.tsx plus additional content
const articles: Article[] = [
  {
    id: '1',
    title: 'Complete Guide to Wheat Cultivation',
    summary: 'Learn everything about wheat cultivation from soil preparation to harvesting techniques.',
    category: 'crops',
    readTime: 12,
    tags: ['wheat', 'cultivation', 'soil preparation', 'harvesting'],
    thumbnail: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg',
    date: '2023-05-15',
    content: `
# Complete Guide to Wheat Cultivation

Wheat is one of the world's most important cereal crops and a staple food for billions of people. Cultivating wheat successfully requires knowledge, preparation, and attention to detail throughout the growing cycle. This comprehensive guide covers everything you need to know from soil preparation to harvesting.

## Soil Preparation

Good soil preparation is the foundation of successful wheat cultivation. Wheat prefers well-drained loamy soils with a pH between 6.0 and 7.0.

### Steps for Soil Preparation:

1. **Soil Testing**: Before planting, test your soil to determine its pH and nutrient content. This will help you determine what amendments are needed.

2. **Plowing**: Plow the field to a depth of 6-8 inches to loosen the soil and incorporate any crop residues from previous plantings.

3. **Harrowing**: Follow plowing with harrowing to break up clods and create a fine seedbed.

4. **Application of Fertilizers**: Based on soil test results, apply the recommended fertilizers. Wheat typically requires nitrogen, phosphorus, and potassium in appropriate ratios.

## Selecting the Right Wheat Variety

Choosing the right wheat variety for your climate and growing conditions is crucial. Consider factors such as:

- Climate adaptation (winter vs. spring wheat)
- Disease resistance
- Yield potential
- End-use quality (bread, pasta, etc.)

Consult with local agricultural extension services for recommendations specific to your region.

## Sowing Techniques

Proper sowing ensures good germination and stand establishment.

### Sowing Methods:

1. **Broadcasting**: Scattering seeds by hand or mechanical spreader
2. **Drilling**: Using a seed drill to place seeds at the correct depth and spacing
3. **Bed Planting**: Creating raised beds for areas with drainage issues

### Sowing Guidelines:

- **Depth**: Sow seeds 1-2 inches deep
- **Spacing**: For drilling, maintain 6-7 inches between rows
- **Seeding Rate**: Use 80-100 kg of seeds per hectare
- **Timing**: Plant winter wheat in fall, spring wheat in early spring

## Irrigation Management

Proper water management is essential for optimal wheat growth.

### Critical Irrigation Stages:

1. **Crown Root Initiation**: 20-25 days after sowing
2. **Tillering**: 40-45 days after sowing
3. **Jointing**: 60-65 days after sowing
4. **Flowering**: 85-90 days after sowing
5. **Grain Filling**: 100-110 days after sowing

Avoid over-irrigation as it can lead to disease issues and lodging (plants falling over).

## Weed Management

Weeds compete with wheat for nutrients, water, and sunlight, reducing yields significantly.

### Weed Control Methods:

1. **Cultural Practices**: Crop rotation, proper tillage, and optimal plant density
2. **Mechanical Control**: Tilling, hoeing, or hand-weeding
3. **Chemical Control**: Herbicides appropriate for wheat fields (always follow label instructions)
4. **Integrated Weed Management**: Combining multiple approaches for the best results

## Disease and Pest Management

Wheat is susceptible to various diseases and pests that can significantly impact yield.

### Common Diseases:

- Rust (leaf, stem, and stripe)
- Powdery mildew
- Fusarium head blight
- Septoria leaf blotch

### Common Pests:

- Aphids
- Armyworms
- Hessian fly
- Wheat stem sawfly

### Management Approaches:

1. **Preventive Measures**: Using resistant varieties, practicing crop rotation
2. **Cultural Controls**: Adjusting planting dates, proper field sanitation
3. **Biological Controls**: Encouraging beneficial insects
4. **Chemical Controls**: Fungicides and insecticides when necessary

## Harvesting

Timing the harvest correctly is crucial for maximizing grain quality and yield.

### Harvesting Guidelines:

1. **Timing**: Harvest when grain moisture content is between 14-20%
2. **Methods**: Combine harvesting is most common in commercial operations
3. **Equipment Adjustment**: Properly adjust combine settings to minimize grain loss and damage
4. **Post-Harvest Handling**: Clean, dry, and store grain properly to prevent spoilage

## Conclusion

Successful wheat cultivation requires careful planning and management throughout the growing season. By following the practices outlined in this guide and adapting them to your specific conditions, you can maximize both the yield and quality of your wheat crop.

Remember to stay informed about new techniques, varieties, and challenges by consulting with local agricultural experts and extension services.`,
    author: {
      name: 'Dr. Rajesh Patel',
      role: 'Agricultural Scientist',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
    }
  },
  {
    id: '2',
    title: 'Identifying and Managing Tomato Blight',
    summary: 'A comprehensive guide to identifying, preventing, and treating tomato blight in your garden.',
    category: 'diseases',
    readTime: 8,
    tags: ['tomato', 'disease', 'blight', 'prevention'],
    thumbnail: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    date: '2023-04-22',
    content: `
# Identifying and Managing Tomato Blight

Tomato blight is one of the most destructive diseases affecting tomato plants worldwide. It can quickly devastate an entire crop if not identified and managed promptly. This guide will help you recognize the symptoms of different types of tomato blight, understand their causes, and implement effective management strategies.

## Types of Tomato Blight

There are two main types of blight that affect tomato plants:

### 1. Early Blight (Alternaria solani)

Early blight typically appears during warm, humid weather and affects older leaves first.

**Symptoms:**
- Dark brown spots with concentric rings (target-like appearance)
- Yellow areas surrounding the spots
- Spots begin on older, lower leaves and progress upward
- Infected leaves eventually turn yellow, wither, and fall off
- Fruit can develop dark, leathery spots usually at the stem end

### 2. Late Blight (Phytophthora infestans)

Late blight is the same disease that caused the Irish potato famine and can be devastating to tomato crops.

**Symptoms:**
- Pale green, water-soaked spots on leaves that quickly enlarge and turn brown
- White, fuzzy growth on the undersides of leaves in humid conditions
- Rapid spreading across the entire plant
- Dark brown, firm spots on fruits
- In severe cases, entire plants can collapse within days

## Causes and Conditions

Understanding what causes blight can help you prevent it in the first place.

### Environmental Factors:

- **Moisture**: Both types of blight thrive in wet conditions
- **Temperature**: Early blight favors warm temperatures (75-85°F), while late blight prefers cooler temperatures (60-70°F)
- **Humidity**: High humidity promotes spore formation and disease spread

### Sources of Infection:

- Infected seeds or transplants
- Soil-borne spores from previous seasons
- Airborne spores from nearby infected plants
- Contaminated garden tools
- Volunteer tomato or potato plants (for late blight)

## Prevention Strategies

Prevention is the most effective approach to managing tomato blight.

### Cultural Practices:

1. **Crop Rotation**: Don't plant tomatoes or related crops (potatoes, eggplants, peppers) in the same location for at least 3 years.

2. **Plant Spacing**: Space plants properly to promote good air circulation.

3. **Watering Techniques**: Water at the base of plants in the morning, avoiding leaf wetness.

4. **Mulching**: Apply mulch around plants to prevent soil splash onto lower leaves.

5. **Resistant Varieties**: Choose tomato varieties with resistance to early or late blight.

6. **Clean Gardening**: Remove and destroy all plant debris at the end of the season.

7. **Seed Selection**: Use certified disease-free seeds and transplants.

### Preventive Treatments:

1. **Copper-based Fungicides**: Apply as a preventive measure before disease appears.

2. **Organic Options**: Neem oil, compost tea, or copper soap can provide some protection.

3. **Proper Timing**: Apply preventive treatments before wet weather periods.

## Treatment of Infected Plants

If blight has already appeared in your garden, take prompt action to limit its spread.

### Managing Early Blight:

1. **Remove Infected Leaves**: Prune and destroy affected leaves at the first sign of infection.

2. **Fungicide Application**: Apply approved fungicides according to label directions.

3. **Improve Air Circulation**: Prune plants to increase airflow.

4. **Avoid Working in Wet Gardens**: Working among wet plants can spread spores.

### Managing Late Blight:

1. **Early Detection**: Monitor plants closely, especially during cool, wet weather.

2. **Immediate Action**: Late blight spreads rapidly; remove and destroy entire plants at first signs.

3. **Protective Sprays**: Apply copper-based fungicides preventively during high-risk periods.

4. **Community Awareness**: Alert neighboring gardeners as spores can travel long distances.

## Organic Management Options

For gardeners preferring organic methods, several approaches can help manage blight:

1. **Compost Tea**: Regular applications may boost plant immunity.

2. **Milk Spray**: A solution of 40% milk and 60% water applied weekly can reduce early blight severity.

3. **Baking Soda Solution**: Mix 1 tablespoon of baking soda with 2.5 tablespoons of vegetable oil in a gallon of water. Add a few drops of liquid soap and spray plants weekly.

4. **Crop Barriers**: Plant non-host crops between tomato plants or rows to slow disease spread.

## Conclusion

Tomato blight can be challenging to manage, but with vigilant monitoring, preventive practices, and prompt action when symptoms appear, you can minimize its impact on your tomato crop. Remember that prevention is always easier and more effective than treatment once the disease is established.

By implementing good gardening practices and staying informed about disease conditions in your area, you can enjoy a healthy, productive tomato harvest even in regions where blight is common.`,
    author: {
      name: 'Maria Garcia',
      role: 'Horticulturist',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    }
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

const KnowledgeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundArticle = articles.find(a => a.id === id);
        if (foundArticle) {
          setArticle(foundArticle);
          
          // Find related articles based on tags or category
          const related = articles
            .filter(a => a.id !== id)
            .filter(a => 
              a.category === foundArticle.category || 
              a.tags.some(tag => foundArticle.tags.includes(tag))
            )
            .slice(0, 3);
          
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-green-600 border-r-transparent dark:border-green-400 dark:border-r-transparent"></div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/knowledge"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Link>
        </div>
      </div>
    );
  }

  // Function to render markdown-like content (simplified version for demo)
  const renderContent = (content: string = '') => {
    if (!content) {
      return (
        <div className="py-16 text-center">
          <p className="text-gray-500 dark:text-gray-400 italic">Full content for this article is not available in the preview.</p>
        </div>
      );
    }

    // Split the content by lines
    const lines = content.split('\n');
    
    return (
      <div className="prose prose-green max-w-none dark:prose-invert">
        {lines.map((line, index) => {
          // Headers
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
          }
          if (line.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
          }
          if (line.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold mt-5 mb-2">{line.substring(4)}</h3>;
          }
          
          // Lists
          if (line.match(/^\d+\. /)) {
            const text = line.replace(/^\d+\. /, '');
            return <div key={index} className="flex"><span className="mr-2">•</span><p className="ml-2 mb-2">{text}</p></div>;
          }
          if (line.startsWith('- ')) {
            return <div key={index} className="flex mb-2"><span className="mr-2">•</span><p>{line.substring(2)}</p></div>;
          }
          
          // Bold
          if (line.includes('**')) {
            const parts = line.split('**');
            return (
              <p key={index} className="mb-4">
                {parts.map((part, i) => i % 2 === 0 ? part : <strong key={i}>{part}</strong>)}
              </p>
            );
          }
          
          // Empty lines and regular text
          if (line.trim() === '') {
            return <div key={index} className="h-4"></div>;
          }
          
          return <p key={index} className="mb-4">{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          to="/knowledge"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Knowledge Base
        </Link>
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Article header */}
        <div className="relative">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-72 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex items-center text-white mb-2">
              <Tag className="h-4 w-4 mr-1" />
              <span className="text-sm capitalize">{article.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{article.title}</h1>
            <div className="flex items-center text-white/80 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{article.readTime} min read</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(article.date)}</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Author info if available */}
          {article.author && (
            <div className="flex items-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {article.author.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{article.author.role}</p>
              </div>
              <div className="ml-auto flex space-x-3">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Share className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Article summary */}
          <div className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-medium">
            {article.summary}
          </div>

          {/* Article content */}
          <div className="text-gray-800 dark:text-gray-200">
            {renderContent(article.content)}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Link
                  key={tag}
                  to={`/knowledge?tag=${tag}`}
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors capitalize"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Article actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-4">
            <button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Helpful
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
              <MessageSquare className="h-4 w-4 mr-2" />
              Leave a Comment
            </button>
            <button className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Share className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(related => (
              <div key={related.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
                <Link to={`/knowledge/${related.id}`} className="block">
                  <img
                    src={related.thumbnail}
                    alt={related.title}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex items-center mb-1">
                    <Tag className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    <span className="text-xs text-green-600 dark:text-green-400 capitalize">
                      {related.category}
                    </span>
                  </div>
                  <Link to={`/knowledge/${related.id}`} className="block">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {related.title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{related.readTime} min read</span>
                  </div>
                  <Link
                    to={`/knowledge/${related.id}`}
                    className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Read Article
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="mt-12 bg-green-50 dark:bg-green-900/20 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Stay Updated with Farming Knowledge
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive the latest farming tips, guides, and seasonal advice.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
          />
          <button className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDetail;