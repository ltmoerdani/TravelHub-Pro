import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createSignal, createEffect } from "solid-js";
import { Card, CardContent, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";

export default function BookingDetails() {
  const params = useParams();
  const [booking, setBooking] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    // Simulate API call to fetch booking details
    setTimeout(() => {
      setBooking({
        id: params.id,
        bookingNumber: `TH-2024-${params.id}`,
        status: 'confirmed',
        customerName: 'Ahmad Wijaya',
        customerEmail: 'ahmad.wijaya@email.com',
        customerPhone: '+62 812-3456-7890',
        productName: 'Umroh Premium 12 Hari',
        productType: 'umroh',
        amount: 35000000,
        bookingDate: '2024-01-15',
        travelDate: '2024-02-20',
        paxCount: 2,
        paymentStatus: 'paid',
        participants: [
          {
            name: 'Ahmad Wijaya',
            gender: 'male',
            dateOfBirth: '1980-05-15',
            passportNumber: 'A1234567',
            passportExpiry: '2028-05-15'
          },
          {
            name: 'Siti Wijaya',
            gender: 'female',
            dateOfBirth: '1985-08-20',
            passportNumber: 'A7654321',
            passportExpiry: '2027-08-20'
          }
        ],
        islamicRequirements: {
          mahramRelation: 'husband-wife',
          dietaryRestrictions: 'halal-only',
          prayerAccommodation: true
        },
        itinerary: [
          { day: 1, location: 'Jakarta - Jeddah', activities: ['Departure from CGK', 'Arrival in Jeddah', 'Transfer to Makkah'] },
          { day: 2, location: 'Makkah', activities: ['Check-in hotel', 'Umroh guidance', 'First Umroh'] },
          { day: 3, location: 'Makkah', activities: ['Tawaf', 'Sai', 'Islamic guidance'] }
        ]
      });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
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

  const bookingData = booking();
  if (!bookingData) {
    return (
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h1>
          <p class="text-gray-600">The booking you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main class="min-h-screen bg-gray-50">
      <Title>Booking Details - {bookingData.bookingNumber}</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Booking Details</h1>
              <p class="text-gray-600">{bookingData.bookingNumber}</p>
            </div>
            <div class="flex items-center space-x-3">
              <span class={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bookingData.status)}`}>
                {bookingData.status.toUpperCase()}
              </span>
              <Button variant="outline">Download Voucher</Button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div class="lg:col-span-2 space-y-6">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3">Product Details</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Package:</span>
                        <span class="font-medium">{bookingData.productName}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Type:</span>
                        <span class="font-medium capitalize">{bookingData.productType}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Travel Date:</span>
                        <span class="font-medium">{new Date(bookingData.travelDate).toLocaleDateString()}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Passengers:</span>
                        <span class="font-medium">{bookingData.paxCount} people</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="font-medium text-gray-900 mb-3">Payment Information</h4>
                    <div class="space-y-2 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Total Amount:</span>
                        <span class="font-bold text-lg">{formatCurrency(bookingData.amount)}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Payment Status:</span>
                        <span class={`font-medium ${
                          bookingData.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {bookingData.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Booking Date:</span>
                        <span class="font-medium">{new Date(bookingData.bookingDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  {bookingData.participants.map((participant, index) => (
                    <div class="border border-gray-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-3">
                        <h4 class="font-medium text-gray-900">Participant {index + 1}</h4>
                        <span class="text-sm text-gray-500 capitalize">{participant.gender}</span>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span class="text-gray-600">Name:</span>
                          <span class="ml-2 font-medium">{participant.name}</span>
                        </div>
                        <div>
                          <span class="text-gray-600">Date of Birth:</span>
                          <span class="ml-2 font-medium">{new Date(participant.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span class="text-gray-600">Passport:</span>
                          <span class="ml-2 font-medium">{participant.passportNumber}</span>
                        </div>
                        <div>
                          <span class="text-gray-600">Passport Expiry:</span>
                          <span class="ml-2 font-medium">{new Date(participant.passportExpiry).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Islamic Requirements (for Umroh/Haji) */}
            {bookingData.productType === 'umroh' && (
              <Card>
                <CardHeader>
                  <CardTitle class="flex items-center space-x-2">
                    <span>🕌</span>
                    <span>Islamic Requirements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-600">Mahram Relation:</span>
                      <span class="ml-2 font-medium capitalize">{bookingData.islamicRequirements.mahramRelation}</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Dietary:</span>
                      <span class="ml-2 font-medium">{bookingData.islamicRequirements.dietaryRestrictions}</span>
                    </div>
                    <div>
                      <span class="text-gray-600">Prayer Accommodation:</span>
                      <span class="ml-2 font-medium">{bookingData.islamicRequirements.prayerAccommodation ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  {bookingData.itinerary.map((day) => (
                    <div class="border-l-4 border-blue-500 pl-4">
                      <div class="flex items-center space-x-2 mb-2">
                        <span class="bg-blue-500 text-white text-xs px-2 py-1 rounded">Day {day.day}</span>
                        <span class="font-medium text-gray-900">{day.location}</span>
                      </div>
                      <ul class="text-sm text-gray-600 space-y-1">
                        {day.activities.map((activity) => (
                          <li class="flex items-center">
                            <span class="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div class="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="space-y-3 text-sm">
                  <div>
                    <span class="text-gray-600">Name:</span>
                    <div class="font-medium">{bookingData.customerName}</div>
                  </div>
                  <div>
                    <span class="text-gray-600">Email:</span>
                    <div class="font-medium">{bookingData.customerEmail}</div>
                  </div>
                  <div>
                    <span class="text-gray-600">Phone:</span>
                    <div class="font-medium">{bookingData.customerPhone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <Button class="w-full" variant="outline">
                  📧 Send Email Update
                </Button>
                <Button class="w-full" variant="outline">
                  📱 Send WhatsApp
                </Button>
                <Button class="w-full" variant="outline">
                  📄 Download Invoice
                </Button>
                <Button class="w-full" variant="outline">
                  🎫 Download Voucher
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="text-sm text-gray-600 space-y-2">
                  <p>Contact our customer support for any questions about your booking.</p>
                  <div class="space-y-1">
                    <div>📞 +62 21 1234 5678</div>
                    <div>📧 support@travelhub.com</div>
                    <div>💬 WhatsApp: +62 812 3456 7890</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}