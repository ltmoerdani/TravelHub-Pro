import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";

export default function AdminDashboard() {
  const [systemStats, setSystemStats] = createSignal({
    totalAgencies: 1247,
    activeUsers: 8934,
    systemUptime: '99.9%',
    monthlyRevenue: 2400000000,
    pendingApprovals: 23,
    systemAlerts: 3,
    databaseSize: '2.4TB',
    apiCalls: 1250000,
    avgResponseTime: '120ms'
  });

  const [recentActivities, setRecentActivities] = createSignal([
    { id: 1, type: 'agency_signup', message: 'New agency registered: Bali Travel Pro', time: '2 hours ago', severity: 'info' },
    { id: 2, type: 'payment', message: 'Payment processed: Rp 2,500,000', time: '3 hours ago', severity: 'success' },
    { id: 3, type: 'system', message: 'Database backup completed successfully', time: '6 hours ago', severity: 'info' },
    { id: 4, type: 'alert', message: 'High CPU usage detected on server-02', time: '8 hours ago', severity: 'warning' },
    { id: 5, type: 'error', message: 'Payment gateway timeout - Midtrans', time: '12 hours ago', severity: 'error' },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <main class="min-h-screen bg-gray-50">
      <Title>Admin Dashboard - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">System Administration</h1>
                <p class="text-sm text-gray-600">TravelHub Pro - Platform Management</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2 text-sm">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-gray-600">All Systems Operational</span>
              </div>
              <Button variant="outline">System Maintenance</Button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Critical Alerts */}
        {systemStats().systemAlerts > 0 && (
          <div class="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div class="flex items-center space-x-3 mb-4">
              <svg class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 class="text-lg font-semibold text-red-900">Critical System Alerts ({systemStats().systemAlerts})</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-white rounded-lg p-4 border border-red-200">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-900">High memory usage on payment-processor-01</span>
                  <Button size="sm" variant="destructive">Investigate</Button>
                </div>
              </div>
              <div class="bg-white rounded-lg p-4 border border-red-200">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-900">SSL certificate expires in 7 days</span>
                  <Button size="sm" variant="destructive">Renew</Button>
                </div>
              </div>
              <div class="bg-white rounded-lg p-4 border border-red-200">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-900">Database backup failed for agency-db-03</span>
                  <Button size="sm" variant="destructive">Retry</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Metrics */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Total Agencies</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{systemStats().totalAgencies.toLocaleString()}</div>
              <p class="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Active Users</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{systemStats().activeUsers.toLocaleString()}</div>
              <p class="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Monthly Revenue</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{formatCurrency(systemStats().monthlyRevenue)}</div>
              <p class="text-xs text-muted-foreground">+18.7% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">System Uptime</CardTitle>
              <svg class="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold text-green-600">{systemStats().systemUptime}</div>
              <p class="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Health */}
          <div class="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>System Health Monitor</CardTitle>
                <CardDescription>Real-time system performance and health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p class="font-medium text-green-900">Database Cluster</p>
                            <p class="text-sm text-green-700">All connections healthy</p>
                          </div>
                        </div>
                        <div class="text-green-600 font-semibold">99.9%</div>
                      </div>
                    </div>

                    <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p class="font-medium text-green-900">API Gateway</p>
                            <p class="text-sm text-green-700">All endpoints responding</p>
                          </div>
                        </div>
                        <div class="text-green-600 font-semibold">100%</div>
                      </div>
                    </div>

                    <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div>
                            <p class="font-medium text-yellow-900">Payment Gateways</p>
                            <p class="text-sm text-yellow-700">Minor latency detected</p>
                          </div>
                        </div>
                        <div class="text-yellow-600 font-semibold">97.2%</div>
                      </div>
                    </div>

                    <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <p class="font-medium text-green-900">Security Systems</p>
                            <p class="text-sm text-green-700">No threats detected</p>
                          </div>
                        </div>
                        <div class="text-green-600 font-semibold">Secure</div>
                      </div>
                    </div>
                  </div>

                  <div class="border-t pt-4">
                    <h4 class="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                    <div class="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div class="text-2xl font-bold text-blue-600">{systemStats().apiCalls.toLocaleString()}</div>
                        <div class="text-sm text-gray-600">API Calls/Month</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-green-600">{systemStats().avgResponseTime}</div>
                        <div class="text-sm text-gray-600">Avg Response Time</div>
                      </div>
                      <div>
                        <div class="text-2xl font-bold text-purple-600">{systemStats().databaseSize}</div>
                        <div class="text-sm text-gray-600">Database Size</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>System Activities</CardTitle>
                <CardDescription>Recent system events and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-3">
                  {recentActivities().map((activity) => (
                    <div class={`p-3 rounded-lg border ${getSeverityColor(activity.severity)}`}>
                      <div class="flex items-start space-x-3">
                        <div class={`w-2 h-2 rounded-full mt-2 ${
                          activity.severity === 'error' ? 'bg-red-500' :
                          activity.severity === 'warning' ? 'bg-yellow-500' :
                          activity.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <div class="flex-1">
                          <p class="text-sm font-medium">{activity.message}</p>
                          <p class="text-xs opacity-75">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">🛠️ System Administration</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" class="h-auto p-4 flex flex-col items-start">
              <div class="font-medium text-gray-900 mb-1">Agency Approvals</div>
              <div class="text-sm text-gray-600">{systemStats().pendingApprovals} pending reviews</div>
            </Button>
            <Button variant="outline" class="h-auto p-4 flex flex-col items-start">
              <div class="font-medium text-gray-900 mb-1">System Maintenance</div>
              <div class="text-sm text-gray-600">Schedule maintenance window</div>
            </Button>
            <Button variant="outline" class="h-auto p-4 flex flex-col items-start">
              <div class="font-medium text-gray-900 mb-1">Backup Management</div>
              <div class="text-sm text-gray-600">Monitor backup status</div>
            </Button>
            <Button variant="outline" class="h-auto p-4 flex flex-col items-start">
              <div class="font-medium text-gray-900 mb-1">User Support</div>
              <div class="text-sm text-gray-600">Handle support tickets</div>
            </Button>
          </div>
        </div>

        {/* Platform Statistics */}
        <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Platform Growth</CardTitle>
              <CardDescription>Monthly growth metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div class="font-medium text-blue-900">New Agencies</div>
                    <div class="text-sm text-blue-700">This month</div>
                  </div>
                  <div class="text-2xl font-bold text-blue-600">+156</div>
                </div>
                <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div class="font-medium text-green-900">Revenue Growth</div>
                    <div class="text-sm text-green-700">Month over month</div>
                  </div>
                  <div class="text-2xl font-bold text-green-600">+18.7%</div>
                </div>
                <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div class="font-medium text-purple-900">User Engagement</div>
                    <div class="text-sm text-purple-700">Daily active users</div>
                  </div>
                  <div class="text-2xl font-bold text-purple-600">89.2%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support & Maintenance</CardTitle>
              <CardDescription>System maintenance and support overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div class="font-medium text-gray-900">Open Support Tickets</div>
                    <div class="text-sm text-gray-600">Requires attention</div>
                  </div>
                  <div class="text-2xl font-bold text-orange-600">23</div>
                </div>
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div class="font-medium text-gray-900">Scheduled Maintenance</div>
                    <div class="text-sm text-gray-600">Next window</div>
                  </div>
                  <div class="text-sm font-medium text-gray-900">Jan 25, 02:00</div>
                </div>
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <div class="font-medium text-gray-900">System Updates</div>
                    <div class="text-sm text-gray-600">Available updates</div>
                  </div>
                  <div class="text-2xl font-bold text-blue-600">3</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}