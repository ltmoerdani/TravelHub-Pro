import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { PrayerTimes, QiblaCompass, IslamicCalendar, BookingWidget, PaymentCalculator } from "@travel-agency/ui";
import { Component } from "solid-js";

const Umroh: Component = () => {
  const [packages, setPackages] = createSignal([
    {
      id: 1,
      name: "Umroh Premium 12 Hari",
      price: 35000000,
      duration: "12 days",
      departure: "Jakarta (CGK)",
      makkahHotel: "Hilton Makkah Convention",
      madinahHotel: "Pullman Zamzam Madina",
      inclusions: [
        "Tiket pesawat PP",
        "Visa Umroh",
        "Hotel bintang 5",
        "Makan 3x sehari",
        "Muthawif berpengalaman",
        "Transportasi AC",
        "Manasik Umroh",
        "Perlengkapan Umroh"
      ],
      features: {
        groupSize: 40,
        muthawifLanguage: "Indonesian",
        prayerGuidance: true,
        islamicGuidance: true
      },
      image: "https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      name: "Umroh Express 9 Hari",
      price: 28000000,
      duration: "9 days",
      departure: "Jakarta (CGK)",
      makkahHotel: "Swissotel Makkah",
      madinahHotel: "Madinah Hilton",
      inclusions: [
        "Tiket pesawat PP",
        "Visa Umroh",
        "Hotel bintang 4",
        "Makan 3x sehari",
        "Muthawif berpengalaman",
        "Transportasi AC",
        "Manasik Umroh"
      ],
      features: {
        groupSize: 45,
        muthawifLanguage: "Indonesian",
        prayerGuidance: true,
        islamicGuidance: true
      },
      image: "https://images.pexels.com/photos/12419667/pexels-photo-12419667.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ]);

  const [selectedPackage, setSelectedPackage] = createSignal(packages()[0]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Title>Paket Umroh - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center">
            <div class="text-6xl mb-4">🕌</div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Paket Umroh Terpercaya
            </h1>
            <p class="text-xl text-green-100 max-w-2xl mx-auto">
              Wujudkan impian spiritual Anda dengan paket Umroh berkualitas tinggi, 
              bimbingan islami, dan pelayanan terbaik
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Islamic Features Section */}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <PrayerTimes />
          <QiblaCompass />
          <IslamicCalendar />
        </div>

        {/* Package Selection */}
        <div class="mb-12">
          <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">
            Pilih Paket Umroh Anda
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packages().map((pkg) => (
              <Card 
                class={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedPackage().id === pkg.id ? 'ring-2 ring-green-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedPackage(pkg)}
              >
                <div class="relative">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    class="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div class="absolute top-4 left-4">
                    <span class="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.duration}
                    </span>
                  </div>
                  <div class="absolute top-4 right-4">
                    <span class="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                      {formatCurrency(pkg.price)}
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle class="text-xl text-gray-900">{pkg.name}</CardTitle>
                  <CardDescription>
                    Keberangkatan dari {pkg.departure}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-2">
                      <div class="flex items-center text-sm">
                        <span class="font-medium text-gray-700 w-20">Makkah:</span>
                        <span class="text-gray-600">{pkg.makkahHotel}</span>
                      </div>
                      <div class="flex items-center text-sm">
                        <span class="font-medium text-gray-700 w-20">Madinah:</span>
                        <span class="text-gray-600">{pkg.madinahHotel}</span>
                      </div>
                    </div>
                    
                    <div class="border-t pt-4">
                      <h4 class="font-medium text-gray-900 mb-2">Fasilitas Utama:</h4>
                      <div class="grid grid-cols-2 gap-1 text-sm text-gray-600">
                        {pkg.inclusions.slice(0, 6).map((inclusion) => (
                          <div class="flex items-center">
                            <span class="text-green-500 mr-1">✓</span>
                            {inclusion}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div class="bg-green-50 rounded-lg p-3">
                      <div class="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span class="font-medium text-green-800">Grup:</span>
                          <span class="text-green-700 ml-1">{pkg.features.groupSize} jamaah</span>
                        </div>
                        <div>
                          <span class="font-medium text-green-800">Muthawif:</span>
                          <span class="text-green-700 ml-1">{pkg.features.muthawifLanguage}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking and Payment Section */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BookingWidget
            productType="umroh"
            productName={selectedPackage().name}
            price={selectedPackage().price}
            currency="IDR"
          />
          
          <PaymentCalculator
            totalAmount={selectedPackage().price}
            currency="IDR"
            isShariahCompliant={true}
          />
        </div>

        {/* Islamic Guidance Section */}
        <div class="mt-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            🕌 Panduan Persiapan Umroh
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="text-center p-6 bg-green-50 rounded-lg">
              <div class="text-3xl mb-3">📋</div>
              <h4 class="font-semibold text-gray-900 mb-2">Persyaratan Dokumen</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Paspor min. 6 bulan</li>
                <li>• Sertifikat vaksin</li>
                <li>• Surat keterangan sehat</li>
                <li>• Dokumen mahram (wanita)</li>
              </ul>
            </div>
            
            <div class="text-center p-6 bg-blue-50 rounded-lg">
              <div class="text-3xl mb-3">🎒</div>
              <h4 class="font-semibold text-gray-900 mb-2">Perlengkapan Umroh</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Kain ihram</li>
                <li>• Sandal jepit</li>
                <li>• Tas pinggang</li>
                <li>• Buku doa & manasik</li>
              </ul>
            </div>
            
            <div class="text-center p-6 bg-purple-50 rounded-lg">
              <div class="text-3xl mb-3">🤲</div>
              <h4 class="font-semibold text-gray-900 mb-2">Persiapan Spiritual</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Belajar manasik umroh</li>
                <li>• Memperbanyak dzikir</li>
                <li>• Meminta maaf keluarga</li>
                <li>• Niat yang ikhlas</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div class="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            ⭐ Testimoni Jamaah
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg p-6 shadow-sm">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span class="text-green-600 font-bold">AW</span>
                </div>
                <div class="ml-3">
                  <h4 class="font-semibold text-gray-900">Ahmad Wijaya</h4>
                  <div class="flex text-yellow-400">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p class="text-gray-600 text-sm">
                "Alhamdulillah, pelayanan sangat memuaskan. Muthawif sangat berpengalaman 
                dan hotel dekat dengan Masjidil Haram. Terima kasih TravelHub Pro!"
              </p>
            </div>
            
            <div class="bg-white rounded-lg p-6 shadow-sm">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span class="text-blue-600 font-bold">SN</span>
                </div>
                <div class="ml-3">
                  <h4 class="font-semibold text-gray-900">Siti Nurhaliza</h4>
                  <div class="flex text-yellow-400">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
              <p class="text-gray-600 text-sm">
                "Paket umroh yang sangat berkualitas. Semua fasilitas sesuai janji, 
                dan bimbingan ibadah sangat membantu. Recommended!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Umroh;