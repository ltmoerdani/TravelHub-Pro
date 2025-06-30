import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6months');

  // Sample data
  const revenueData = [
    { month: 'Jul', revenue: 850000000, bookings: 234, customers: 189 },
    { month: 'Aug', revenue: 920000000, bookings: 267, customers: 203 },
    { month: 'Sep', revenue: 1100000000, bookings: 312, customers: 245 },
    { month: 'Oct', revenue: 980000000, bookings: 298, customers: 231 },
    { month: 'Nov', revenue: 1250000000, bookings: 356, customers: 278 },
    { month: 'Dec', revenue: 1400000000, bookings: 398, customers: 312 },
  ];

  const productPerformance = [
    { name: 'Regular Travel', revenue: 450000000, bookings: 145, growth: 12.5 },
    { name: 'Hotels', revenue: 320000000, bookings: 98, growth: -2.3 },
    { name: 'Umroh Packages', revenue: 890000000, bookings: 67, growth: 18.7 },
    { name: 'Haji Packages', revenue: 1200000000, bookings: 23, growth: 25.4 },
  ];

  const customerSegments = [
    { name: 'VIP Customers', value: 35, color: '#f59e0b', amount: 1200000000 },
    { name: 'Regular Customers', value: 45, color: '#3b82f6', amount: 850000000 },
    { name: 'New Customers', value: 20, color: '#10b981', amount: 320000000 },
  ];

  const bookingChannels = [
    { channel: 'Online Website', bookings: 45, color: '#3b82f6' },
    { channel: 'Mobile App', bookings: 25, color: '#10b981' },
    { channel: 'Office Counter', bookings: 20, color: '#f59e0b' },
    { channel: 'Phone Booking', bookings: 10, color: '#ef4444' },
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: 'Rp 6.4B',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Bookings',
      value: '2,145',
      change: '+12.8%',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'New Customers',
      value: '847',
      change: '+24.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Website Traffic',
      value: '12.4K',
      change: '-3.1%',
      trend: 'down',
      icon: Globe,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(0)}M`;
    }
    return `Rp ${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track performance and gain insights into your business</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & Bookings Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue & Bookings Trend</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Bookings</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'revenue') {
                    return [formatCurrency(value as number), 'Revenue'];
                  }
                  return [value, 'Bookings'];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
              <Area 
                type="monotone" 
                dataKey="bookings" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorBookings)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Performance & Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Performance</h3>
          <div className="space-y-4">
            {productPerformance.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.bookings} bookings</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                  <div className={`flex items-center text-sm ${
                    product.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.growth >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(product.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Segments</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-3">
            {customerSegments.map((segment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{segment.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">{segment.value}%</span>
                  <p className="text-xs text-gray-500">{formatCurrency(segment.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Channels */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Booking Channels</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingChannels} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="channel" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Best Performing Month</h4>
            <p className="text-sm text-gray-600">December showed the highest revenue with Rp 1.4B, driven by holiday season bookings.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Growing Segment</h4>
            <p className="text-sm text-gray-600">Haji packages show 25.4% growth, indicating strong demand for religious tourism.</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Channel Performance</h4>
            <p className="text-sm text-gray-600">Online bookings account for 70% of total reservations, showing digital transformation success.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;