import React from 'react';
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Plane,
  Hotel,
  MapPin,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'Rp 2.4B',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Bookings',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Customers',
      value: '12,845',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 850, bookings: 234 },
    { month: 'Feb', revenue: 920, bookings: 267 },
    { month: 'Mar', revenue: 1100, bookings: 312 },
    { month: 'Apr', revenue: 980, bookings: 298 },
    { month: 'May', revenue: 1250, bookings: 356 },
    { month: 'Jun', revenue: 1400, bookings: 398 },
  ];

  const productData = [
    { name: 'Regular Travel', value: 45, color: '#3b82f6' },
    { name: 'Hotels', value: 30, color: '#f59e0b' },
    { name: 'Umroh/Haji', value: 25, color: '#00a86b' },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: 'Ahmad Wijaya',
      package: 'Umroh Premium 12 Hari',
      amount: 'Rp 35,000,000',
      status: 'confirmed',
      date: '2024-01-15',
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      package: 'Bali Honeymoon Package',
      amount: 'Rp 8,500,000',
      status: 'pending',
      date: '2024-01-14',
    },
    {
      id: 3,
      customer: 'Muhammad Ali',
      package: 'Hotel Jakarta 3N',
      amount: 'Rp 2,100,000',
      status: 'confirmed',
      date: '2024-01-13',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your travel agency.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Add Booking
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Product Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {productData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">View all</button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium text-gray-900">{booking.customer}</h4>
                  <p className="text-sm text-gray-600">{booking.package}</p>
                  <p className="text-xs text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{booking.amount}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors group">
              <Plane className="h-8 w-8 text-gray-400 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Add Travel Package</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors group">
              <Hotel className="h-8 w-8 text-gray-400 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Add Hotel</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-islamic-green hover:border-islamic-green transition-colors group">
              <MapPin className="h-8 w-8 text-gray-400 group-hover:text-white mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-white">Umroh Package</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors group">
              <Star className="h-8 w-8 text-gray-400 group-hover:text-primary-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">Customer Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;