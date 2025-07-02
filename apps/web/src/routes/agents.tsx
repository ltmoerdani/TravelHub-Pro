import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";
import { Component } from "solid-js";

const Agents: Component = () => {
  const [agents, setAgents] = createSignal([]);
  const [selectedAgent, setSelectedAgent] = createSignal(null);
  const [activeTab, setActiveTab] = createSignal('overview');
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate API call
    setTimeout(() => {
      setAgents([
        {
          id: 'AGT001',
          name: 'Sarah Wilson',
          email: 'sarah@travelhub.com',
          agentCode: 'AG001',
          agentLevel: 'senior',
          territory: 'Jakarta',
          baseCommissionRate: 7.5,
          bonusCommissionRate: 2.0,
          totalSales: 125000000,
          totalCommission: 9375000,
          monthlyTarget: 50000000,
          specializations: ['umroh', 'travel'],
          languages: ['Indonesian', 'English', 'Arabic'],
          isActive: true,
          joinDate: '2023-01-15',
          lastActiveAt: '2024-01-15T10:30:00Z',
          performance: {
            salesAchievement: 250,
            bookingsCount: 45,
            conversionRate: 24.5,
            customerSatisfaction: 4.8,
            ranking: 2,
          },
          tasks: [
            {
              id: 'TASK001',
              title: 'Follow up with Ahmad Wijaya',
              description: 'Check on Umroh preparation progress',
              priority: 'high',
              dueDate: '2024-01-20',
              status: 'pending',
            },
            {
              id: 'TASK002',
              title: 'Collect passport copy from Sarah',
              description: 'Need passport copy for visa processing',
              priority: 'medium',
              dueDate: '2024-01-18',
              status: 'in_progress',
            },
          ],
        },
        {
          id: 'AGT002',
          name: 'Ahmad Rahman',
          email: 'ahmad@travelhub.com',
          agentCode: 'AG002',
          agentLevel: 'junior',
          territory: 'Surabaya',
          baseCommissionRate: 5.0,
          bonusCommissionRate: 1.0,
          totalSales: 75000000,
          totalCommission: 3750000,
          monthlyTarget: 30000000,
          specializations: ['hotel', 'travel'],
          languages: ['Indonesian', 'English'],
          isActive: true,
          joinDate: '2023-06-01',
          lastActiveAt: '2024-01-15T09:15:00Z',
          performance: {
            salesAchievement: 180,
            bookingsCount: 28,
            conversionRate: 18.2,
            customerSatisfaction: 4.6,
            ranking: 5,
          },
          tasks: [
            {
              id: 'TASK003',
              title: 'Prepare hotel quotation',
              description: 'Create quotation for corporate client',
              priority: 'medium',
              dueDate: '2024-01-17',
              status: 'pending',
            },
          ],
        },
      ]);
      setSelectedAgent(agents()[0]);
      setLoading(false);
    }, 1000);
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'senior': return 'bg-purple-100 text-purple-700';
      case 'junior': return 'bg-blue-100 text-blue-700';
      case 'supervisor': return 'bg-green-100 text-green-700';
      case 'manager': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading()) {
    return (
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div class="space-y-6">
      <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Agent Management
            </h2>
            </div>
          <div class="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add New Agent
            </button>
          </div>
        </div>
      </div>

          {/* Agent List */}
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Active Agents</h3>
        </div>
        <ul class="divide-y divide-gray-200">
          <li>
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="sm:flex">
                  <p class="text-sm font-medium text-blue-600 truncate">Ahmad Fauzi</p>
                  <div class="mt-2 flex sm:mt-0 sm:ml-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Senior Agent
                          </span>
                        </div>
                </div>
                <div class="ml-5 flex-shrink-0">
                  <span class="text-sm text-gray-600">Joined 2 years ago</span>
                </div>
                          </div>
              <div class="mt-2">
                <div class="sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      156 bookings
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Rp 450,000,000 revenue
                    </p>
                          </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    4.8 rating
                            </div>
                          </div>
                        </div>
                          </div>
          </li>

          <li>
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="sm:flex">
                  <p class="text-sm font-medium text-blue-600 truncate">Sarah Wijaya</p>
                  <div class="mt-2 flex sm:mt-0 sm:ml-4">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Junior Agent
                              </span>
                          </div>
                        </div>
                <div class="ml-5 flex-shrink-0">
                  <span class="text-sm text-gray-600">Joined 6 months ago</span>
                          </div>
                        </div>
              <div class="mt-2">
                <div class="sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center text-sm text-gray-500">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      45 bookings
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Rp 120,000,000 revenue
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    4.5 rating
                              </div>
                            </div>
                          </div>
                        </div>
          </li>
        </ul>
                  </div>

      {/* Quick Stats */}
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                      </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Agents</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">2</div>
                  </dd>
                </dl>
                              </div>
                            </div>
                          </div>
                        </div>
                        
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">201</div>
                  </dd>
                </dl>
                              </div>
                            </div>
                          </div>
                        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                      </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">Rp 570,000,000</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;