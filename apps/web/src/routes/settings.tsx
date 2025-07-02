import { Title } from "@solidjs/meta";
import { createSignal } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";
import {
  Building,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Users,
  Save,
  Upload,
  Key,
  Mail,
  Smartphone,
  Database,
  Settings as SettingsIcon,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = createSignal('company');
  const [loading, setLoading] = createSignal(false);

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: Building },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System Settings', icon: SettingsIcon },
  ];

  const saveSettings = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Settings saved successfully');
    }, 1000);
  };

  const renderTabContent = () => {
    switch (activeTab()) {
      case 'company':
        return (
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic information about your travel agency</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value="TravelHub Pro"
                      class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                    <select class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Travel Agency</option>
                      <option>Tour Operator</option>
                      <option>Hotel Booking</option>
                      <option>Religious Tourism</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value="+62 21 1234 5678"
                      class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value="info@travelhub.com"
                      class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                  <textarea
                    rows={3}
                    value="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10270, Indonesia"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Documents</CardTitle>
                <CardDescription>Upload your business licenses and certifications</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Business License</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload class="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p class="text-sm text-gray-600">Upload business license</p>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">ASITA Membership</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload class="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p class="text-sm text-gray-600">Upload ASITA certificate</p>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">PPIU License (Umroh/Haji)</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload class="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p class="text-sm text-gray-600">Upload PPIU license</p>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tax Registration (NPWP)</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload class="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p class="text-sm text-gray-600">Upload tax certificate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'billing':
        return (
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your subscription plan and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-semibold text-blue-900">Professional Plan</h3>
                      <p class="text-blue-700">Up to 1000 bookings/month • All features included</p>
                      <p class="text-sm text-blue-600 mt-2">Next billing: January 15, 2024</p>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-blue-900">Rp 2,500,000</div>
                      <div class="text-blue-700">per month</div>
                    </div>
                  </div>
                  <div class="mt-4 flex space-x-3">
                    <Button>Upgrade Plan</Button>
                    <Button variant="outline">View All Plans</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Current month usage and limits</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700">Bookings</span>
                    <span class="font-medium">247 / 1000</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style={{ width: '24.7%' }}></div>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700">API Calls</span>
                    <span class="font-medium">12,450 / 50,000</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style={{ width: '24.9%' }}></div>
                  </div>
                </div>
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-700">Storage</span>
                    <span class="font-medium">2.1 GB / 10 GB</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <div class="font-medium">**** **** **** 1234</div>
                        <div class="text-sm text-gray-600">Expires 12/25</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" class="w-full">
                  + Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'integrations':
        return (
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateways</CardTitle>
                <CardDescription>Connect your payment processing services</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                {[
                  { name: 'Midtrans', status: 'connected', logo: '💳', description: 'Indonesian payment gateway' },
                  { name: 'Xendit', status: 'disconnected', logo: '🏦', description: 'Multi-payment platform' },
                  { name: 'DOKU', status: 'disconnected', logo: '💰', description: 'Digital payment solutions' },
                  { name: 'OVO', status: 'connected', logo: '📱', description: 'E-wallet integration' },
                ].map((gateway) => (
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <span class="text-2xl">{gateway.logo}</span>
                      <div>
                        <div class="font-medium text-gray-900">{gateway.name}</div>
                        <div class="text-sm text-gray-600">{gateway.description}</div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <span class={`px-2 py-1 rounded-full text-xs font-medium ${
                        gateway.status === 'connected' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {gateway.status}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        class={gateway.status === 'connected' ? 'text-red-600' : 'text-blue-600'}
                      >
                        {gateway.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>External APIs</CardTitle>
                <CardDescription>Third-party service integrations</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                {[
                  { name: 'Amadeus GDS', desc: 'Flight booking and inventory', status: 'disconnected' },
                  { name: 'WhatsApp Business', desc: 'Customer communication', status: 'connected' },
                  { name: 'Google Analytics', desc: 'Website analytics', status: 'connected' },
                  { name: 'Mailchimp', desc: 'Email marketing', status: 'disconnected' },
                ].map((service) => (
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div class="font-medium text-gray-900">{service.name}</div>
                      <div class="text-sm text-gray-600">{service.desc}</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      class={service.status === 'connected' ? 'bg-green-50 text-green-700' : ''}
                    >
                      {service.status === 'connected' ? 'Connected' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case 'system':
        return (
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Core system settings and preferences</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
                    <select class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="IDR">Indonesian Rupiah (IDR)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                      <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                      <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <select class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="id">Bahasa Indonesia</option>
                      <option value="en">English</option>
                      <option value="ar">العربية (Arabic)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup & Maintenance</CardTitle>
                <CardDescription>Data backup and system maintenance settings</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div class="font-medium text-gray-900">Automatic Backup</div>
                    <div class="text-sm text-gray-600">Daily backup at 2:00 AM</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div class="font-medium text-gray-900">Maintenance Mode</div>
                    <div class="text-sm text-gray-600">Enable during system updates</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex space-x-3">
                  <Button variant="outline">Download Backup</Button>
                  <Button variant="outline">System Health Check</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your system settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-gray-600">Select a settings category from the sidebar.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <main class="min-h-screen bg-gray-50">
      <Title>Settings - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
              <p class="text-gray-600">Manage your account and system preferences</p>
            </div>
            <Button onClick={saveSettings} disabled={loading()}>
              <Save class="h-4 w-4 mr-2" />
              {loading() ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div class="lg:col-span-1">
            <Card>
              <CardContent class="p-0">
                <nav class="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      class={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab() === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon class={`mr-3 h-4 w-4 ${activeTab() === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div class="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </main>
  );
}