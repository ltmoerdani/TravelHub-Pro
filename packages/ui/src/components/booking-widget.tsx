import { Component, JSX, splitProps, createSignal } from "solid-js";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

interface BookingWidgetProps extends JSX.HTMLAttributes<HTMLDivElement> {
  productType?: 'travel' | 'hotel' | 'umroh' | 'haji';
  productName?: string;
  price?: number;
  currency?: string;
}

export const BookingWidget: Component<BookingWidgetProps> = (props) => {
  const [local, others] = splitProps(props, [
    "class", 
    "productType", 
    "productName", 
    "price", 
    "currency"
  ]);

  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    paxCount: 1,
    specialRequests: ''
  });

  const formatCurrency = (amount: number, currency: string = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log('Booking submitted:', formData());
    // Handle booking submission
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card class={cn("w-full max-w-md", local.class)} {...others}>
      <CardHeader>
        <CardTitle class="flex items-center space-x-2">
          <span class="text-lg">
            {local.productType === 'umroh' || local.productType === 'haji' ? '🕌' : 
             local.productType === 'hotel' ? '🏨' : '✈️'}
          </span>
          <span>Book Now</span>
        </CardTitle>
        {local.productName && (
          <div class="text-sm text-gray-600">{local.productName}</div>
        )}
        {local.price && (
          <div class="text-lg font-bold text-green-600">
            {formatCurrency(local.price, local.currency)}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData().name}
              onInput={(e) => updateFormData('name', e.currentTarget.value)}
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData().email}
              onInput={(e) => updateFormData('email', e.currentTarget.value)}
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData().phone}
              onInput={(e) => updateFormData('phone', e.currentTarget.value)}
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+62 812-3456-7890"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {local.productType === 'hotel' ? 'Check-in Date' : 'Travel Date'} *
            </label>
            <input
              type="date"
              required
              value={formData().travelDate}
              onInput={(e) => updateFormData('travelDate', e.currentTarget.value)}
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {local.productType === 'hotel' ? 'Guests' : 'Passengers'} *
            </label>
            <select
              value={formData().paxCount}
              onChange={(e) => updateFormData('paxCount', parseInt(e.currentTarget.value))}
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <option value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Special Requests
            </label>
            <textarea
              value={formData().specialRequests}
              onInput={(e) => updateFormData('specialRequests', e.currentTarget.value)}
              rows={3}
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any special requirements..."
            />
          </div>

          {(local.productType === 'umroh' || local.productType === 'haji') && (
            <div class="p-3 bg-green-50 rounded-lg">
              <div class="text-sm text-green-800">
                <strong>Islamic Requirements:</strong>
                <ul class="mt-1 text-xs space-y-1">
                  <li>• Valid passport (6+ months)</li>
                  <li>• Vaccination certificate</li>
                  <li>• Mahram documentation (for women under 45)</li>
                </ul>
              </div>
            </div>
          )}

          <Button type="submit" class="w-full">
            Submit Booking Request
          </Button>

          <div class="text-xs text-gray-500 text-center">
            By submitting, you agree to our terms and conditions
          </div>
        </form>
      </CardContent>
    </Card>
  );
};