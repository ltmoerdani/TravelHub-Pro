import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";
import {
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-solid";

export default function Reports() {
  const [selectedReport, setSelectedReport] = createSignal('revenue');
  const [dateRange, setDateRange] = createSignal('last_month');
  const [loading, setLoading] = createSignal(false);

  const reportTypes = [
    {
      id: 'revenue',
      name: 'Revenue Report',
      description: 'Detailed revenue analysis by products and time periods',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'bookings',
      name: 'Booking Analysis',
      description: 'Booking trends, conversion rates, and customer behavior',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'customers',
      name: 'Customer Report',
      description: 'Customer segmentation, loyalty, and lifetime value',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'agents',
      name: 'Agent Performance',
      description: 'Sales agent productivity, commissions, and targets',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'umroh',
      name: 'Umroh/Haji Analytics',
      description: 'Religious tourism specific metrics and insights',
      icon: BarChart3,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'financial',
      name: 'Financial Statement',
      description: 'Comprehensive financial reports for accounting',
      icon: FileText,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const sampleData = {
    revenue: {
      totalRevenue: 2400000000,
      growth: 18.2,
      breakdown: [
        { category: 'Umroh Packages', amount: 890000000, percentage: 37.1 },
        { category: 'Haji Packages', amount: 720000000, percentage: 30.0 },
        { category: 'Regular Travel', amount: 450000000, percentage: 18.8 },
        { category: 'Hotels', amount: 340000000, percentage: 14.1 },
      ],
    },
    bookings: {
      totalBookings: 1247,
      conversionRate: 24.8,
      averageValue: 1925000,
      channels: [
        { channel: 'Online Website', bookings: 561, percentage: 45.0 },
        { channel: 'Office Counter', bookings: 374, percentage: 30.0 },
        { channel: 'Mobile App', bookings: 187, percentage: 15.0 },
        { channel: 'Phone Booking', bookings: 125, percentage: 10.0 },
      ],
    },
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const generateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate report generation
      console.log(`Generating ${selectedReport()} report for ${dateRange()}`);
    }, 2000);
  };

  const exportReport = (format: string) => {
    console.log(`Exporting ${selectedReport()} report as ${format}`);
    // Implement export functionality
  };

  return (
    <main class="min-h-screen bg-gray-50">
      <Title>Reports & Analytics - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p class="text-gray-600">Generate comprehensive business reports and insights</p>
            </div>
            <div class="flex items-center space-x-3">
              <Button variant="outline" onClick={() => exportReport('pdf')}>
                <Download class="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={() => exportReport('excel')}>
                <Download class="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Report Selection */}
          <div class="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Report Types</CardTitle>
                <CardDescription>Select the type of report to generate</CardDescription>
              </CardHeader>
              <CardContent class="p-0">
                <div class="space-y-1">
                  {reportTypes.map((report) => (
                    <button
                      onClick={() => setSelectedReport(report.id)}
                      class={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedReport() === report.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                      }`}
                    >
                      <div class="flex items-center space-x-3">
                        <div class={`p-2 rounded-lg ${report.bgColor}`}>
                          <report.icon class={`h-5 w-5 ${report.color}`} />
                        </div>
                        <div class="flex-1 min-w-0">
                          <div class="font-medium text-gray-900 text-sm">{report.name}</div>
                          <div class="text-xs text-gray-600 mt-1">{report.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card class="mt-6">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={dateRange()}
                    onChange={(e) => setDateRange(e.currentTarget.value)}
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="last_week">Last Week</option>
                    <option value="last_month">Last Month</option>
                    <option value="last_quarter">Last Quarter</option>
                    <option value="last_year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                  <select class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Products</option>
                    <option value="umroh">Umroh Packages</option>
                    <option value="haji">Haji Packages</option>
                    <option value="travel">Regular Travel</option>
                    <option value="hotel">Hotels</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Agent</label>
                  <select class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Agents</option>
                    <option value="sarah">Sarah Wilson</option>
                    <option value="ahmad">Ahmad Rahman</option>
                    <option value="siti">Siti Nurhaliza</option>
                  </select>
                </div>

                <Button 
                  onClick={generateReport} 
                  class="w-full"
                  disabled={loading()}
                >
                  {loading() ? 'Generating...' : 'Generate Report'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Report Content */}
          <div class="lg:col-span-3">
            {selectedReport() === 'revenue' && (
              <div class="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Total revenue and growth analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-3xl font-bold text-green-600">{formatCurrency(sampleData.revenue.totalRevenue)}</div>
                        <div class="text-sm text-green-700">Total Revenue</div>
                      </div>
                      <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-3xl font-bold text-blue-600">+{sampleData.revenue.growth}%</div>
                        <div class="text-sm text-blue-700">Growth Rate</div>
                      </div>
                      <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <div class="text-3xl font-bold text-purple-600">{formatCurrency(1925000)}</div>
                        <div class="text-sm text-purple-700">Average Order</div>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <h4 class="font-medium text-gray-900">Revenue by Category</h4>
                      {sampleData.revenue.breakdown.map((item) => (
                        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 bg-blue-500 rounded"></div>
                            <span class="font-medium text-gray-900">{item.category}</span>
                          </div>
                          <div class="text-right">
                            <div class="font-bold text-gray-900">{formatCurrency(item.amount)}</div>
                            <div class="text-sm text-gray-600">{item.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <div class="text-center text-gray-500">
                        <LineChart class="h-12 w-12 mx-auto mb-2" />
                        <p>Revenue trend chart would be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedReport() === 'bookings' && (
              <div class="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Analytics</CardTitle>
                    <CardDescription>Booking performance and channel analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div class="text-center p-4 bg-blue-50 rounded-lg">
                        <div class="text-3xl font-bold text-blue-600">{sampleData.bookings.totalBookings}</div>
                        <div class="text-sm text-blue-700">Total Bookings</div>
                      </div>
                      <div class="text-center p-4 bg-green-50 rounded-lg">
                        <div class="text-3xl font-bold text-green-600">{sampleData.bookings.conversionRate}%</div>
                        <div class="text-sm text-green-700">Conversion Rate</div>
                      </div>
                      <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <div class="text-3xl font-bold text-purple-600">{formatCurrency(sampleData.bookings.averageValue)}</div>
                        <div class="text-sm text-purple-700">Average Value</div>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <h4 class="font-medium text-gray-900">Bookings by Channel</h4>
                      {sampleData.bookings.channels.map((channel) => (
                        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 bg-green-500 rounded"></div>
                            <span class="font-medium text-gray-900">{channel.channel}</span>
                          </div>
                          <div class="text-right">
                            <div class="font-bold text-gray-900">{channel.bookings} bookings</div>
                            <div class="text-sm text-gray-600">{channel.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedReport() === 'umroh' && (
              <Card>
                <CardHeader>
                  <CardTitle>🕌 Umroh/Haji Analytics</CardTitle>
                  <CardDescription>Religious tourism specific insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                      <h4 class="font-medium text-gray-900">Package Performance</h4>
                      <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <span class="text-green-900">Umroh Premium 12 Days</span>
                          <span class="font-bold text-green-600">156 bookings</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span class="text-blue-900">Haji Plus 2024</span>
                          <span class="font-bold text-blue-600">89 bookings</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span class="text-purple-900">Umroh Express 9 Days</span>
                          <span class="font-bold text-purple-600">67 bookings</span>
                        </div>
                      </div>
                    </div>

                    <div class="space-y-4">
                      <h4 class="font-medium text-gray-900">Key Metrics</h4>
                      <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <span class="text-gray-700">Average Package Value</span>
                          <span class="font-bold">{formatCurrency(42000000)}</span>
                        </div>
                        <div class="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <span class="text-gray-700">Visa Approval Rate</span>
                          <span class="font-bold text-green-600">98.5%</span>
                        </div>
                        <div class="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                          <span class="text-gray-700">Customer Satisfaction</span>
                          <span class="font-bold text-blue-600">4.8/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Default placeholder for other report types */}
            {!['revenue', 'bookings', 'umroh'].includes(selectedReport()) && (
              <Card>
                <CardHeader>
                  <CardTitle>{reportTypes.find(r => r.id === selectedReport())?.name}</CardTitle>
                  <CardDescription>Report content will be displayed here</CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div class="text-center text-gray-500">
                      <BarChart3 class="h-12 w-12 mx-auto mb-2" />
                      <p>Report data visualization will be shown here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Insights */}
        <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Quick Insights</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Top Performing Month</h4>
              <p class="text-sm text-gray-600">December showed highest revenue with 25% growth in Umroh bookings</p>
            </div>
            <div class="bg-white rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Customer Trend</h4>
              <p class="text-sm text-gray-600">70% of customers prefer online booking, mobile usage increased 40%</p>
            </div>
            <div class="bg-white rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Agent Performance</h4>
              <p class="text-sm text-gray-600">Top agents exceed targets by 150%, commission payouts on track</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}