import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  Edit,
  Trash2,
  Eye,
  Plane,
  Hotel,
  Compass,
} from 'lucide-react';

const Products = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Bali Paradise 5D4N',
      type: 'travel',
      category: 'Regular Travel',
      price: 'Rp 4,500,000',
      duration: '5 days',
      capacity: 25,
      bookings: 18,
      rating: 4.8,
      status: 'active',
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Bali, Indonesia'
    },
    {
      id: 2,
      name: 'Umroh Premium 12 Hari',
      type: 'umroh',
      category: 'Umroh/Haji',
      price: 'Rp 35,000,000',
      duration: '12 days',
      capacity: 40,
      bookings: 32,
      rating: 4.9,
      status: 'active',
      image: 'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Makkah & Madinah'
    },
    {
      id: 3,
      name: 'Grand Hyatt Jakarta',
      type: 'hotel',
      category: 'Hotel',
      price: 'Rp 1,200,000',
      duration: 'per night',
      capacity: 100,
      bookings: 67,
      rating: 4.7,
      status: 'active',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Jakarta, Indonesia'
    },
    {
      id: 4,
      name: 'Yogyakarta Cultural Tour',
      type: 'travel',
      category: 'Regular Travel',
      price: 'Rp 2,800,000',
      duration: '3 days',
      capacity: 30,
      bookings: 12,
      rating: 4.6,
      status: 'active',
      image: 'https://images.pexels.com/photos/2265876/pexels-photo-2265876.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Yogyakarta, Indonesia'
    },
    {
      id: 5,
      name: 'Haji Plus 2024',
      type: 'haji',
      category: 'Umroh/Haji',
      price: 'Rp 85,000,000',
      duration: '35 days',
      capacity: 200,
      bookings: 145,
      rating: 4.9,
      status: 'limited',
      image: 'https://images.pexels.com/photos/12419667/pexels-photo-12419667.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Makkah & Madinah'
    },
    {
      id: 6,
      name: 'Lombok Beach Resort',
      type: 'hotel',
      category: 'Hotel',
      price: 'Rp 850,000',
      duration: 'per night',
      capacity: 80,
      bookings: 45,
      rating: 4.5,
      status: 'active',
      image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Lombok, Indonesia'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'travel', label: 'Travel Packages', count: products.filter(p => p.type === 'travel').length },
    { id: 'hotel', label: 'Hotels', count: products.filter(p => p.type === 'hotel').length },
    { id: 'umroh', label: 'Umroh', count: products.filter(p => p.type === 'umroh').length },
    { id: 'haji', label: 'Haji', count: products.filter(p => p.type === 'haji').length },
  ];

  const filteredProducts = products.filter(product => {
    const matchesTab = activeTab === 'all' || product.type === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'travel': return Plane;
      case 'hotel': return Hotel;
      case 'umroh':
      case 'haji': return Compass;
      default: return Plane;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'limited': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your travel packages, hotels, and religious tours</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const TypeIcon = getTypeIcon(product.type);
          return (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white rounded-full p-2 shadow-sm">
                    <TypeIcon className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.location}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {product.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {product.bookings}/{product.capacity}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                    {product.rating}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    {product.type === 'hotel' && (
                      <span className="text-sm text-gray-600 ml-1">/ night</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-600">{product.category}</span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Products;