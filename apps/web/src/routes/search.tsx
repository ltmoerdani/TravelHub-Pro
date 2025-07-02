import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import { Card, CardContent, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";
import {
  Search,
  Funnel,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  Plane,
  Eye,
  Bookmark,
} from "lucide-solid";

interface BaseResult {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  price?: number;
  amount?: number;
  rating?: number;
  status?: string;
  location?: string;
  duration?: string;
}

interface Product extends BaseResult {
  type: 'product';
  price: number;
  rating: number;
  image: string;
  category: string;
  location: string;
  duration: string;
}

interface Customer extends BaseResult {
  type: 'customer';
  email: string;
  phone: string;
  location: string;
  joinDate: string;
}

interface Booking extends BaseResult {
  type: 'booking';
  amount: number;
  status: string;
  travelDate: string;
  paxCount: number;
}

type SearchResult = Product | Customer | Booking;

interface SearchFilters {
  priceRange: [number, number];
  dateRange: string;
  location: string;
  category: string;
  rating: number;
}

interface MockData {
  products: Product[];
  customers: Customer[];
  bookings: Booking[];
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = createSignal('');
  const [searchType, setSearchType] = createSignal<'all' | 'products' | 'customers' | 'bookings' | 'agents'>('all');
  const [results, setResults] = createSignal<SearchResult[]>([]);
  const [loading, setLoading] = createSignal(false);

  const searchTypes = [
    { id: 'all' as const, label: 'All', icon: Search },
    { id: 'products' as const, label: 'Products', icon: Plane },
    { id: 'customers' as const, label: 'Customers', icon: Users },
    { id: 'bookings' as const, label: 'Bookings', icon: Calendar },
    { id: 'agents' as const, label: 'Agents', icon: Users },
  ];

  const mockResults: MockData = {
    products: [
      {
        id: 'PROD001',
        type: 'product',
        title: 'Umroh Premium 12 Hari',
        subtitle: 'Makkah & Madinah',
        description: 'Premium Umroh package with 5-star accommodation and experienced Muthawif',
        price: 35000000,
        rating: 4.9,
        image: 'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'umroh',
        location: 'Saudi Arabia',
        duration: '12 days',
      },
      {
        id: 'PROD002',
        type: 'product',
        title: 'Bali Paradise 5D4N',
        subtitle: 'Bali, Indonesia',
        description: 'Experience the beauty of Bali with comprehensive tour package',
        price: 4500000,
        rating: 4.8,
        image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'travel',
        location: 'Bali',
        duration: '5 days',
      },
    ],
    customers: [
      {
        id: 'CUST001',
        type: 'customer',
        title: 'Ahmad Wijaya',
        subtitle: 'VIP Customer',
        description: 'Regular Umroh customer, 3 bookings, total spent: Rp 75,000,000',
        email: 'ahmad.wijaya@email.com',
        phone: '+62 812-3456-7890',
        location: 'Jakarta',
        joinDate: '2023-03-15',
      },
      {
        id: 'CUST002',
        type: 'customer',
        title: 'Sarah Johnson',
        subtitle: 'Regular Customer',
        description: 'Travel enthusiast, 2 bookings, total spent: Rp 15,500,000',
        email: 'sarah.j@email.com',
        phone: '+62 813-9876-5432',
        location: 'Bali',
        joinDate: '2023-06-20',
      },
    ],
    bookings: [
      {
        id: 'BOOK001',
        type: 'booking',
        title: 'TH-2024-001',
        subtitle: 'Umroh Premium - Ahmad Wijaya',
        description: 'Confirmed booking for 2 passengers, travel date: Feb 20, 2024',
        amount: 35000000,
        status: 'confirmed',
        travelDate: '2024-02-20',
        paxCount: 2,
      },
      {
        id: 'BOOK002',
        type: 'booking',
        title: 'TH-2024-002',
        subtitle: 'Bali Paradise - Sarah Johnson',
        description: 'Pending booking for 2 passengers, travel date: Jan 25, 2024',
        amount: 9000000,
        status: 'pending',
        travelDate: '2024-01-25',
        paxCount: 2,
      },
    ],
  };

  const performSearch = () => {
    if (!searchQuery().trim()) return;
    
    setLoading(true);
    setTimeout(() => {
      let searchResults: SearchResult[] = [];
      
      if (searchType() === 'all') {
        searchResults = [
          ...mockResults.products,
          ...mockResults.customers,
          ...mockResults.bookings,
        ];
      } else if (searchType() === 'products') {
        searchResults = mockResults.products;
      } else if (searchType() === 'customers') {
        searchResults = mockResults.customers;
      } else if (searchType() === 'bookings') {
        searchResults = mockResults.bookings;
      }
      
      // Filter results based on search query
      searchResults = searchResults.filter(item => 
        item.title.toLowerCase().includes(searchQuery().toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery().toLowerCase())
      );
      
      setResults(searchResults);
      setLoading(false);
    }, 800);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return Plane;
      case 'customer': return Users;
      case 'booking': return Calendar;
      case 'agent': return Users;
      default: return Search;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main class="min-h-screen bg-gray-50">
      <Title>Search - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Universal Search</h1>
              <p class="text-gray-600">Search across all your data - products, customers, bookings, and more</p>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Interface */}
        <Card class="mb-8">
          <CardContent class="p-6">
            <div class="space-y-4">
              {/* Search Input */}
              <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products, customers, bookings..."
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.currentTarget.value)}
                  onKeyPress={(e) => e.key === 'Enter' && performSearch()}
                  class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <Button 
                  onClick={performSearch}
                  class="absolute right-2 top-1/2 transform -translate-y-1/2"
                  disabled={!searchQuery().trim() || loading()}
                >
                  {loading() ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {/* Search Type Tabs */}
              <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {searchTypes.map((type) => (
                  <button
                    onClick={() => setSearchType(type.id)}
                    class={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      searchType() === type.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <type.icon class="h-4 w-4" />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>

              {/* Advanced Filters */}
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div>
                  {/* eslint-disable-next-line sonarjs/no-duplicate-string, typescript:S6853 */}
                  <label for="priceRange" class="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <select id="priceRange" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Any Price</option>
                    <option value="0-5000000">Under Rp 5M</option>
                    <option value="5000000-20000000">Rp 5M - 20M</option>
                    <option value="20000000-50000000">Rp 20M - 50M</option>
                    <option value="50000000+">Above Rp 50M</option>
                  </select>
                </div>
                <div>
                  {/* eslint-disable-next-line sonarjs/no-duplicate-string, typescript:S6853 */}
                  <label for="locationInput" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    id="locationInput"
                    type="text"
                    placeholder="Enter location"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  {/* eslint-disable-next-line sonarjs/no-duplicate-string, typescript:S6853 */}
                  <label for="categorySelect" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select id="categorySelect" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Categories</option>
                    <option value="umroh">Umroh</option>
                    <option value="haji">Haji</option>
                    <option value="travel">Travel</option>
                    <option value="hotel">Hotel</option>
                  </select>
                </div>
                <div>
                  {/* eslint-disable-next-line sonarjs/no-duplicate-string, typescript:S6853 */}
                  <label for="dateRange" class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <input
                    id="dateRange"
                    type="date"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {results().length > 0 && (
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">
                Search Results ({results().length} found)
              </h2>
              <div class="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Funnel class="h-4 w-4 mr-2" />
                  More Filters
                </Button>
                <select class="border border-gray-200 rounded-lg px-3 py-2 text-sm">
                  <option>Sort by Relevance</option>
                  <option>Sort by Date</option>
                  <option>Sort by Price</option>
                  <option>Sort by Rating</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {results().map((result) => {
                const TypeIcon = getTypeIcon(result.type);
                return (
                  <Card class="hover:shadow-md transition-shadow">
                    <CardContent class="p-6">
                      <div class="flex items-start space-x-4">
                        {result.image && (
                          <img
                            src={result.image}
                            alt={result.title}
                            class="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        {!result.image && (
                          <div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <TypeIcon class="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                        
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center justify-between mb-2">
                            <h3 class="font-semibold text-gray-900 truncate">{result.title}</h3>
                            <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                              {result.type}
                            </span>
                          </div>
                          
                          <p class="text-sm text-gray-600 mb-2">{result.subtitle}</p>
                          <p class="text-sm text-gray-500 mb-3 line-clamp-2">{result.description}</p>
                          
                          <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-4 text-sm text-gray-600">
                              {result.price && (
                                <span class="font-semibold text-gray-900">{formatCurrency(result.price)}</span>
                              )}
                              {result.amount && (
                                <span class="font-semibold text-gray-900">{formatCurrency(result.amount)}</span>
                              )}
                              {result.rating && (
                                <div class="flex items-center">
                                  <Star class="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                  <span>{result.rating}</span>
                                </div>
                              )}
                              {result.status && (
                                <span class={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                                  {result.status}
                                </span>
                              )}
                              {result.location && (
                                <div class="flex items-center">
                                  <MapPin class="h-4 w-4 mr-1" />
                                  <span>{result.location}</span>
                                </div>
                              )}
                              {result.duration && (
                                <div class="flex items-center">
                                  <Clock class="h-4 w-4 mr-1" />
                                  <span>{result.duration}</span>
                                </div>
                              )}
                            </div>
                            
                            <div class="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye class="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                <Bookmark class="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* No Results */}
        {results().length === 0 && searchQuery() && !loading() && (
          <Card>
            <CardContent class="p-12 text-center">
              <Search class="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p class="text-gray-600 mb-4">
                We couldn't find anything matching "{searchQuery()}". Try adjusting your search terms or filters.
              </p>
              <div class="space-y-2 text-sm text-gray-500">
                <p>Search suggestions:</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Check your spelling</li>
                  <li>Try more general terms</li>
                  <li>Use different keywords</li>
                  <li>Remove some filters</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Tips */}
        {!searchQuery() && (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle class="flex items-center space-x-2">
                  <Plane class="h-5 w-5 text-blue-600" />
                  <span>Search Products</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-gray-600 text-sm mb-3">
                  Find travel packages, hotels, Umroh/Haji packages by name, destination, or features.
                </p>
                <div class="space-y-1 text-xs text-gray-500">
                  <p>Examples: "Bali", "Umroh Premium", "5-star hotel"</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="flex items-center space-x-2">
                  <Users class="h-5 w-5 text-green-600" />
                  <span>Search Customers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-gray-600 text-sm mb-3">
                  Find customers by name, email, phone number, or booking history.
                </p>
                <div class="space-y-1 text-xs text-gray-500">
                  <p>Examples: "Ahmad", "VIP customer", "jakarta"</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle class="flex items-center space-x-2">
                  <Calendar class="h-5 w-5 text-purple-600" />
                  <span>Search Bookings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p class="text-gray-600 text-sm mb-3">
                  Find bookings by booking number, customer name, or travel dates.
                </p>
                <div class="space-y-1 text-xs text-gray-500">
                  <p>Examples: "TH-2024", "confirmed", "February"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}