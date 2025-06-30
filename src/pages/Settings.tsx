import React, { useState } from 'react';
import {
  User,
  Building,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Database,
  Mail,
  Smartphone,
  Save,
  Upload,
  Key,
  Users,
  Settings as SettingsIcon,
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: Building },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'users', label: 'User Management', icon: Users },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue="TravelHub Pro"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Travel Agency</option>
                    <option>Tour Operator</option>
                    <option>Hotel Booking</option>
                    <option>Religious Tourism</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+62 21 1234 5678"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="info@travelhub.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                  <textarea
                    rows={3}
                    defaultValue="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10270, Indonesia"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Logo & Branding */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo & Branding</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload your logo (PNG, JPG up to 2MB)</p>
                    <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Choose File
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Colors</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <label className="text-sm text-gray-600 w-20">Primary:</label>
                      <input type="color" defaultValue="#3b82f6" className="w-12 h-8 rounded border" />
                      <span className="text-sm text-gray-500">#3b82f6</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <label className="text-sm text-gray-600 w-20">Secondary:</label>
                      <input type="color" defaultValue="#f59e0b" className="w-12 h-8 rounded border" />
                      <span className="text-sm text-gray-500">#f59e0b</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Documents */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Documents</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business License</label>
                    <input type="file" className="w-full border border-gray-200 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SIUP/NIB Number</label>
                    <input
                      type="text"
                      placeholder="Enter business registration number"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ASITA Membership</label>
                    <input type="file" className="w-full border border-gray-200 rounded-lg px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Haji/Umroh License (PPIU)</label>
                    <input type="file" className="w-full border border-gray-200 rounded-lg px-3 py-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
              <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-200">
                <div>
                  <h4 className="font-semibold text-primary-900">Professional Plan</h4>
                  <p className="text-sm text-primary-700">Up to 1000 bookings/month • All features included</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-900">Rp 2,500,000</p>
                  <p className="text-sm text-primary-700">per month</p>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-4">
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Upgrade Plan
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  View All Plans
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 1234</p>
                      <p className="text-sm text-gray-600">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Edit
                  </button>
                </div>
                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                  + Add Payment Method
                </button>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Description</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3">Jan 1, 2024</td>
                      <td className="py-3">Professional Plan - Monthly</td>
                      <td className="py-3">Rp 2,500,000</td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Paid</span>
                      </td>
                      <td className="py-3">
                        <button className="text-primary-600 hover:text-primary-700">Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Dec 1, 2023</td>
                      <td className="py-3">Professional Plan - Monthly</td>
                      <td className="py-3">Rp 2,500,000</td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Paid</span>
                      </td>
                      <td className="py-3">
                        <button className="text-primary-600 hover:text-primary-700">Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { title: 'New Bookings', desc: 'Get notified when customers make new bookings' },
                  { title: 'Payment Confirmations', desc: 'Receive alerts for successful payments' },
                  { title: 'Booking Cancellations', desc: 'Be informed about cancellation requests' },
                  { title: 'Customer Reviews', desc: 'New customer reviews and feedback' },
                  { title: 'System Updates', desc: 'Important system maintenance and updates' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Notifications</h3>
              <div className="space-y-4">
                {[
                  { title: 'Urgent Booking Issues', desc: 'Critical issues requiring immediate attention' },
                  { title: 'Payment Failures', desc: 'Failed payment transactions' },
                  { title: 'Emergency Notifications', desc: 'System downtime and security alerts' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            {/* Password Security */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <h4 className="font-medium text-yellow-900">2FA Not Enabled</h4>
                  <p className="text-sm text-yellow-700">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>

            {/* API Keys */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Keys</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Production API Key</h4>
                    <p className="text-sm text-gray-600 font-mono">sk_live_****************************</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-primary-600 hover:text-primary-700 text-sm">Regenerate</button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm">Copy</button>
                  </div>
                </div>
                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
                  + Generate New API Key
                </button>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            {/* Payment Gateways */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Gateways</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Midtrans', status: 'connected', logo: '💳' },
                  { name: 'Xendit', status: 'disconnected', logo: '🏦' },
                  { name: 'DOKU', status: 'disconnected', logo: '💰' },
                  { name: 'OVO', status: 'connected', logo: '📱' },
                ].map((gateway, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{gateway.logo}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{gateway.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          gateway.status === 'connected' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {gateway.status}
                        </span>
                      </div>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      gateway.status === 'connected'
                        ? 'text-red-600 hover:text-red-700'
                        : 'text-primary-600 hover:text-primary-700'
                    }`}>
                      {gateway.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Third-party Services */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Third-party Services</h3>
              <div className="space-y-4">
                {[
                  { name: 'WhatsApp Business API', desc: 'Send booking confirmations via WhatsApp', status: 'connected' },
                  { name: 'Google Analytics', desc: 'Track website performance and user behavior', status: 'connected' },
                  { name: 'Mailchimp', desc: 'Email marketing and customer newsletters', status: 'disconnected' },
                  { name: 'Amadeus GDS', desc: 'Flight booking and inventory management', status: 'disconnected' },
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.desc}</p>
                    </div>
                    <button className={`px-3 py-1 rounded text-sm ${
                      service.status === 'connected'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    }`}>
                      {service.status === 'connected' ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            {/* User Management */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Invite User
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Last Active</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3">John Doe</td>
                      <td className="py-3">john@travelhub.com</td>
                      <td className="py-3">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Admin</span>
                      </td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span>
                      </td>
                      <td className="py-3">2 hours ago</td>
                      <td className="py-3">
                        <button className="text-primary-600 hover:text-primary-700 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-700">Remove</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3">Sarah Wilson</td>
                      <td className="py-3">sarah@travelhub.com</td>
                      <td className="py-3">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Agent</span>
                      </td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Active</span>
                      </td>
                      <td className="py-3">1 day ago</td>
                      <td className="py-3">
                        <button className="text-primary-600 hover:text-primary-700 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-700">Remove</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Role Permissions */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
              <div className="space-y-4">
                {[
                  { role: 'Admin', permissions: ['Full Access', 'User Management', 'Settings', 'Billing'] },
                  { role: 'Manager', permissions: ['View Analytics', 'Manage Bookings', 'Customer Support'] },
                  { role: 'Agent', permissions: ['Create Bookings', 'View Customers', 'Basic Reports'] },
                ].map((role, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{role.role}</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, pidx) => (
                        <span key={pidx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className={`mr-3 h-4 w-4 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;