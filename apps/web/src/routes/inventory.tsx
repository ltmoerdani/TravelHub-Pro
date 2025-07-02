import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";
import { Component } from "solid-js";

const Inventory: Component = () => {
  const [inventory, setInventory] = createSignal([]);
  const [selectedType, setSelectedType] = createSignal('all');
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate API call
    setTimeout(() => {
      setInventory([
        {
          id: 'INV001',
          productName: 'Grand Hyatt Jakarta',
          inventoryType: 'hotel_room',
          totalCapacity: 50,
          availableCapacity: 32,
          reservedCapacity: 18,
          basePrice: 1200000,
          currentPrice: 1320000,
          roomType: 'Deluxe Room',
          status: 'active',
          lastUpdated: '2024-01-15T10:30:00Z',
          occupancyRate: 64,
        },
        {
          id: 'INV002',
          productName: 'Jakarta - Jeddah Flight',
          inventoryType: 'flight_seat',
          totalCapacity: 180,
          availableCapacity: 45,
          reservedCapacity: 135,
          basePrice: 8500000,
          currentPrice: 11050000,
          flightNumber: 'GA865',
          status: 'active',
          lastUpdated: '2024-01-15T09:15:00Z',
          occupancyRate: 75,
        },
        {
          id: 'INV003',
          productName: 'Bali Cultural Tour',
          inventoryType: 'tour_slot',
          totalCapacity: 30,
          availableCapacity: 12,
          reservedCapacity: 18,
          basePrice: 750000,
          currentPrice: 825000,
          tourGuide: 'Made Sutrisna',
          status: 'active',
          lastUpdated: '2024-01-15T08:45:00Z',
          occupancyRate: 60,
        },
      ]);
      setLoading(false);
    }, 1000);
  });

  const inventoryTypes = [
    { id: 'all', label: 'All Inventory', count: inventory().length },
    { id: 'hotel_room', label: 'Hotel Rooms', count: inventory().filter(i => i.inventoryType === 'hotel_room').length },
    { id: 'flight_seat', label: 'Flight Seats', count: inventory().filter(i => i.inventoryType === 'flight_seat').length },
    { id: 'tour_slot', label: 'Tour Slots', count: inventory().filter(i => i.inventoryType === 'tour_slot').length },
  ];

  const filteredInventory = () => {
    if (selectedType() === 'all') return inventory();
    return inventory().filter(item => item.inventoryType === selectedType());
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'low_stock': return 'bg-yellow-100 text-yellow-700';
      case 'sold_out': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel_room': return '🏨';
      case 'flight_seat': return '✈️';
      case 'tour_slot': return '🎯';
      default: return '📦';
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
              Inventory Management
            </h2>
          </div>
          <div class="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add New Item
            </button>
          </div>
        </div>
      </div>

      {/* Inventory List */}
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li>
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <div class="flex text-sm">
                    <p class="font-medium text-blue-600 truncate">Economy Umroh Package</p>
                    <p class="ml-1 flex-shrink-0 font-normal text-gray-500">in Packages</p>
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm text-gray-500">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Available until Dec 2024
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex-shrink-0 sm:mt-0">
                  <div class="flex -space-x-1 overflow-hidden">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available: 50
                    </span>
                  </div>
                </div>
              </div>
              <div class="ml-5 flex-shrink-0">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </li>

          <li>
            <div class="px-4 py-4 flex items-center sm:px-6">
              <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <div class="flex text-sm">
                    <p class="font-medium text-blue-600 truncate">Premium Umroh Package</p>
                    <p class="ml-1 flex-shrink-0 font-normal text-gray-500">in Packages</p>
                  </div>
                  <div class="mt-2 flex">
                    <div class="flex items-center text-sm text-gray-500">
                      <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Available until Dec 2024
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex-shrink-0 sm:mt-0">
                  <div class="flex -space-x-1 overflow-hidden">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Available: 15
                    </span>
                  </div>
                </div>
              </div>
              <div class="ml-5 flex-shrink-0">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Packages</dt>
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Available Slots</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">65</div>
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Utilization Rate</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">75%</div>
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

export default Inventory;