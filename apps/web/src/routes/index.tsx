import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Button } from "@travel-agency/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";

export default function Home() {
  const [stats, setStats] = createSignal({
    totalBookings: 0,
    revenue: 0,
    customers: 0,
    packages: 0
  });

  onMount(() => {
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalBookings: 1247,
        revenue: 2400000000,
        customers: 12845,
        packages: 156
      });
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
      <Title>TravelHub Pro - Dashboard</Title>
      
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
                <h1 class="text-2xl font-bold text-gray-900">TravelHub Pro</h1>
                <p class="text-sm text-gray-600">All-in-One Travel Agency SaaS</p>
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
              <CardTitle class="text-sm font-medium">Revenue</CardTitle>
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

        {/* Feature Showcase */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>🕌 Umroh & Haji Management</CardTitle>
              <CardDescription>
                Specialized tools for religious tourism with Islamic compliance
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span class="text-green-600 text-sm">📅</span>
                </div>
                <div>
                  <p class="font-medium text-green-900">Jadwal Sholat Otomatis</p>
                  <p class="text-sm text-green-700">Real-time prayer times for jamaah</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 text-sm">📍</span>
                </div>
                <div>
                  <p class="font-medium text-blue-900">Live Tracking Jamaah</p>
                  <p class="text-sm text-blue-700">Monitor group location in real-time</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span class="text-purple-600 text-sm">💰</span>
                </div>
                <div>
                  <p class="font-medium text-purple-900">Cicilan Syariah</p>
                  <p class="text-sm text-purple-700">Mudharabah compliant payment plans</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🚀 Advanced Features</CardTitle>
              <CardDescription>
                Production-ready tools for modern travel agencies
              </CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span class="text-orange-600 text-sm">🎨</span>
                </div>
                <div>
                  <p class="font-medium text-orange-900">Website Builder</p>
                  <p class="text-sm text-orange-700">Drag & drop custom landing pages</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span class="text-indigo-600 text-sm">📊</span>
                </div>
                <div>
                  <p class="font-medium text-indigo-900">Real-time Analytics</p>
                  <p class="text-sm text-indigo-700">Performance insights & predictions</p>
                </div>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                <div class="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <span class="text-pink-600 text-sm">⚡</span>
                </div>
                <div>
                  <p class="font-medium text-pink-900">Multi-Channel Booking</p>
                  <p class="text-sm text-pink-700">Online, offline & mobile integration</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack Info */}
        <Card class="mt-8">
          <CardHeader>
            <CardTitle>🏗️ Production-Grade Architecture</CardTitle>
            <CardDescription>
              Built with modern tech stack for scalability and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-2">⚡</div>
                <p class="font-medium">SolidStart</p>
                <p class="text-sm text-gray-600">Frontend SSR</p>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-2">🚀</div>
                <p class="font-medium">NestJS</p>
                <p class="text-sm text-gray-600">Backend API</p>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-2">🗄️</div>
                <p class="font-medium">PostgreSQL</p>
                <p class="text-sm text-gray-600">Database</p>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl mb-2">📦</div>
                <p class="font-medium">Turborepo</p>
                <p class="text-sm text-gray-600">Monorepo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}