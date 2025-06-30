import React, { useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Star,
  Eye,
  Edit,
  MoreVertical,
  Heart,
  Plane,
} from 'lucide-react';
import { format } from 'date-fns';

const Customers = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: 'Ahmad Wijaya',
      email: 'ahmad.wijaya@email.com',
      phone: '+62 812-3456-7890',
      address: 'Jakarta Selatan, Indonesia',
      joinDate: '2023-03-15',
      lastBooking: '2024-01-15',
      totalBookings: 3,
      totalSpent: 75000000,
      preferredType: 'umroh',
      status: 'vip',
      rating: 4.9,
      notes: 'Regular umroh customer, prefers premium packages',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+62 813-9876-5432',
      address: 'Bali, Indonesia',
      joinDate: '2023-06-20',
      lastBooking: '2024-01-14',
      totalBookings: 2,
      totalSpent: 15500000,
      preferredType: 'travel',
      status: 'regular',
      rating: 4.7,
      notes: 'Loves beach destinations, honeymooner',
    },
    {
      id: 3,
      name: 'Muhammad Ali',
      email: 'm.ali@email.com',
      phone: '+62 814-5555-1234',
      address: 'Surabaya, Indonesia',
      joinDate: '2023-08-10',
      lastBooking: '2024-01-13',
      totalBookings: 5,
      totalSpent: 25000000,
      preferredType: 'hotel',
      status: 'regular',
      rating: 4.5,
      notes: 'Business traveler, prefers luxury hotels',
    },
    {
      id: 4,
      name: 'Siti Nurhaliza',
      email: 'siti.nur@email.com',
      phone: '+62 815-7777-8888',
      address: 'Bandung, Indonesia',
      joinDate: '2022-12-05',
      lastBooking: '2024-01-12',
      totalBookings: 1,
      totalSpent: 85000000,
      preferredType: 'haji',
      status: 'vip',
      rating: 5.0,
      notes: 'First-time haji, requires medical assistance',
    },
    {
      id: 5,
      name: 'David Chen',
      email: 'david.chen@email.com',
      phone: '+62 816-2222-3333',
      address: 'Medan, Indonesia',
      joinDate: '2023-11-18',
      lastBooking: '2024-01-11',
      totalBookings: 1,
      totalSpent: 2800000,
      preferredType: 'travel',
      status: 'new',
      rating: 4.2,
      notes: 'Interested in cultural tours, vegetarian',
    },
    {
      id: 6,
      name: 'Fatimah Zahra',
      email: 'fatimah.z@email.com',
      phone: '+62 817-1111-2222',
      address: 'Yogyakarta, Indonesia',
      joinDate: '2023-01-30',
      lastBooking: '2023-12-20',
      totalBookings: 4,
      totalSpent: 120000000,
      preferredType: 'umroh',
      status: 'vip',
      rating: 4.8,
      notes: 'Group organizer, brings family and friends',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Customers', count: customers.length },
    { id: 'vip', label: 'VIP', count: customers.filter(c => c.status === 'vip').length },
    { id: 'regular', label: 'Regular', count: customers.filter(c => c.status === 'regular').length },
    { id: 'new', label: 'New', count: customers.filter(c => c.status === 'new').length },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesTab = activeTab === 'all' || customer.status === activeTab;
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-gold-100 text-gold-700';
      case 'regular': return 'bg-blue-100 text-blue-700';
      case 'new': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPreferredTypeIcon = (type: string) => {
    switch (type) {
      case 'umroh':
      case 'haji': return '🕌';
      case 'travel': return '✈️';
      case 'hotel': return '🏨';
      default: return '📍';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships and build loyalty</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VIP Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.filter(c => c.status === 'vip').length}</p>
            </div>
            <div className="p-3 bg-gold-100 rounded-lg">
              <Star className="h-6 w-6 text-gold-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.7</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">Rp 323M</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Plane className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search customers..."
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

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {customer.status.toUpperCase()}
                    </span>
                    <span className="text-sm">
                      {getPreferredTypeIcon(customer.preferredType)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {customer.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {customer.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {customer.address}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Bookings</p>
                  <p className="font-semibold text-gray-900">{customer.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <p className="font-semibold text-gray-900">{customer.rating}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last booking</span>
                <span className="text-gray-900">{format(new Date(customer.lastBooking), 'MMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Member since</span>
                <span className="text-gray-900">{format(new Date(customer.joinDate), 'MMM yyyy')}</span>
              </div>
            </div>

            {customer.notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{customer.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <User className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No customers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Customers;