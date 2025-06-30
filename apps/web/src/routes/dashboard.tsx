import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui";

interface Booking {
  id: string;
  customer: string;
  package: string;
  amount: string;
  status: string;
  date: string;
}

export default function Dashboard() {
  const [stats, setStats] = createSignal({
    totalBookings: 0,
    revenue: 0,
    customers: 0,
    packages: 0
  });

  const [recentBookings, setRecentBookings] = createSignal<Booking[]>([]);

  onMount(async () => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        totalBookings: 1247,
        revenue: 2400000000,
        customers: 12845,
        packages: 156
      });

      setRecentBookings([
        {
          id: 'BK001',
          customer: 'Ahmad Wijaya',
          package: 'Umroh Premium 12 Hari',
          amount: 'Rp 35,000,000',
          status: 'confirmed',
          date: '2024-01-15',
        },
        {
          id: 'BK002',
          customer: 'Sarah Johnson',
          package: 'Bali Honeymoon Package',
          amount: 'Rp 8,500,000',
          status: 'pending',
          date: '2024-01-14',
        },
        {
          id: 'BK003',
          customer: 'Muhammad Ali',
          package: 'Hotel Jakarta 3N',
          amount: 'Rp 2,100,000',
          status: 'confirmed',
          date: '2024-01-13',
        },
      ]);
    }, 1000);
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Title>Dashboard - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p class="text-sm text-gray-600">Welcome back! Here's what's happening with your travel agency.</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <Button variant="outline">Settings</Button>
              <Button>Add Booking</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{formatCurrency(stats().revenue)}</div>
              <p class="text-xs text-muted-foreground">+18.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Bookings</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{stats().totalBookings.toLocaleString()}</div>
              <p class="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Customers</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{stats().customers.toLocaleString()}</div>
              <p class="text-xs text-muted-foreground">+15.3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Active Packages</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{stats().packages}</div>
              <p class="text-xs text-muted-foreground">+8 new this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest customer bookings and reservations</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              {recentBookings().map((booking) => (
                <div class="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <h4 class="font-medium text-gray-900">{booking.customer}</h4>
                    <p class="text-sm text-gray-600">{booking.package}</p>
                    <p class="text-xs text-gray-500">{booking.date}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-900">{booking.amount}</p>
                    <span class={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🕌 Islamic Tourism Features</CardTitle>
              <CardDescription>Specialized tools for Umroh and Haji management</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span class="text-green-600 text-sm">🕐</span>
                </div>
                <div>
                  <p class="font-medium text-green-900">Prayer Times Integration</p>
                  <p class="text-sm text-green-700">Real-time prayer schedules for jamaah</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 text-sm">🧭</span>
                </div>
                <div>
                  <p class="font-medium text-blue-900">Qibla Direction</p>
                  <p class="text-sm text-blue-700">GPS-based Qibla finder</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span class="text-purple-600 text-sm">💰</span>
                </div>
                <div>
                  <p class="font-medium text-purple-900">Shariah-Compliant Payments</p>
                  <p class="text-sm text-purple-700">Mudharabah installment plans</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}