'use client'

import { useState } from 'react'
import { 
  Users, 
  Building2, 
  TrendingUp, 
  AlertTriangle,
  Server,
  Database,
  Shield,
  Activity
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats] = useState({
    totalAgencies: 1247,
    activeUsers: 8934,
    systemUptime: '99.9%',
    monthlyRevenue: 2400000000,
    pendingApprovals: 23,
    systemAlerts: 3
  })

  const recentActivities = [
    { id: 1, type: 'agency_signup', message: 'New agency registered: Bali Travel Pro', time: '2 hours ago' },
    { id: 2, type: 'payment', message: 'Payment processed: Rp 2,500,000', time: '3 hours ago' },
    { id: 3, type: 'system', message: 'Database backup completed successfully', time: '6 hours ago' },
    { id: 4, type: 'alert', message: 'High CPU usage detected on server-02', time: '8 hours ago' },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">TravelHub Pro - Internal Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">System Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-blue-50">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalAgencies.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Total Agencies</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-green-50">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+8.2%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</h3>
              <p className="text-gray-600 text-sm">Active Users</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-purple-50">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+18.7%</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(stats.monthlyRevenue)}</h3>
              <p className="text-gray-600 text-sm">Monthly Revenue</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-lg bg-green-50">
                <Server className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">{stats.systemUptime}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">Operational</h3>
              <p className="text-gray-600 text-sm">System Status</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Health */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Database className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Database</p>
                    <p className="text-sm text-green-700">All connections healthy</p>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">99.9%</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Server className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">API Services</p>
                    <p className="text-sm text-green-700">All endpoints responding</p>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">100%</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-900">Payment Gateway</p>
                    <p className="text-sm text-yellow-700">Minor latency detected</p>
                  </div>
                </div>
                <div className="text-yellow-600 font-semibold">97.2%</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Security</p>
                    <p className="text-sm text-green-700">No threats detected</p>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">Secure</div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'alert' ? 'bg-red-500' :
                    activity.type === 'system' ? 'bg-blue-500' :
                    activity.type === 'payment' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {stats.systemAlerts > 0 && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">System Alerts ({stats.systemAlerts})</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-gray-900">High memory usage on payment-processor-01</span>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">Investigate</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-gray-900">SSL certificate expires in 7 days</span>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">Renew</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm text-gray-900">Database backup failed for agency-db-03</span>
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">Retry</button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🛠️ Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">Agency Approvals</h4>
              <p className="text-sm text-gray-600">{stats.pendingApprovals} pending reviews</p>
            </button>
            <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">System Maintenance</h4>
              <p className="text-sm text-gray-600">Schedule maintenance window</p>
            </button>
            <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">Backup Management</h4>
              <p className="text-sm text-gray-600">View backup status</p>
            </button>
            <button className="bg-white rounded-lg p-4 text-left hover:shadow-md transition-shadow">
              <h4 className="font-medium text-gray-900 mb-2">User Support</h4>
              <p className="text-sm text-gray-600">Handle support tickets</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}