import React, { useState } from 'react';
import {
  Globe,
  Palette,
  Layout,
  Image,
  Type,
  Settings,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  Save,
  Share,
} from 'lucide-react';

const WebsiteBuilder = () => {
  const [activeTemplate, setActiveTemplate] = useState('travel');
  const [previewDevice, setPreviewDevice] = useState('desktop');

  const templates = [
    {
      id: 'travel',
      name: 'Travel Explorer',
      category: 'Travel Agency',
      preview: 'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Destination Showcase', 'Package Booking', 'Travel Blog', 'Customer Reviews'],
    },
    {
      id: 'hotel',
      name: 'Luxury Hotels',
      category: 'Hotel Booking',
      preview: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Room Gallery', 'Online Booking', 'Amenities Display', 'Location Map'],
    },
    {
      id: 'umroh',
      name: 'Islamic Journey',
      category: 'Umroh/Haji',
      preview: 'https://images.pexels.com/photos/4009401/pexels-photo-4009401.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Package Details', 'Prayer Times', 'Islamic Calendar', 'Guidance Articles'],
    },
  ];

  const customizationOptions = [
    {
      category: 'Design',
      icon: Palette,
      options: [
        { name: 'Primary Color', value: '#3b82f6', type: 'color' },
        { name: 'Secondary Color', value: '#f59e0b', type: 'color' },
        { name: 'Font Family', value: 'Inter', type: 'select', choices: ['Inter', 'Roboto', 'Open Sans'] },
        { name: 'Logo Upload', type: 'file' },
      ],
    },
    {
      category: 'Layout',
      icon: Layout,
      options: [
        { name: 'Header Style', value: 'transparent', type: 'select', choices: ['transparent', 'solid', 'gradient'] },
        { name: 'Navigation Position', value: 'top', type: 'select', choices: ['top', 'side'] },
        { name: 'Footer Style', value: 'minimal', type: 'select', choices: ['minimal', 'detailed'] },
      ],
    },
    {
      category: 'Content',
      icon: Type,
      options: [
        { name: 'Company Name', value: 'TravelHub Pro', type: 'text' },
        { name: 'Tagline', value: 'Your Journey Begins Here', type: 'text' },
        { name: 'Phone Number', value: '+62 21 1234 5678', type: 'text' },
        { name: 'Email', value: 'info@travelhub.com', type: 'email' },
        { name: 'Address', value: 'Jakarta, Indonesia', type: 'text' },
      ],
    },
  ];

  const mockWebsiteContent = {
    travel: {
      hero: 'Discover Amazing Destinations',
      subtitle: 'Create unforgettable memories with our carefully curated travel packages',
      packages: ['Bali Paradise', 'Yogyakarta Cultural', 'Raja Ampat Diving'],
    },
    hotel: {
      hero: 'Luxury Accommodations',
      subtitle: 'Experience comfort and elegance in our premium hotel properties',
      packages: ['Executive Suite', 'Family Room', 'Presidential Suite'],
    },
    umroh: {
      hero: 'Sacred Journey to Holy Land',
      subtitle: 'Fulfill your spiritual pilgrimage with our trusted Umroh and Haji packages',
      packages: ['Umroh Premium 12 Days', 'Haji Plus 2024', 'Umroh Express 9 Days'],
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Builder</h1>
          <p className="text-gray-600">Create your custom travel agency website with drag-and-drop simplicity</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Save className="h-4 w-4 mr-2" />
            Save & Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Selection & Customization Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Template Selection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h3>
            <div className="space-y-3">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setActiveTemplate(template.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    activeTemplate === template.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                  <p className="text-xs text-gray-600">{template.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Options */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customize</h3>
            <div className="space-y-4">
              {customizationOptions.map((section) => (
                <div key={section.category}>
                  <div className="flex items-center mb-3">
                    <section.icon className="h-4 w-4 text-gray-400 mr-2" />
                    <h4 className="text-sm font-medium text-gray-700">{section.category}</h4>
                  </div>
                  <div className="space-y-2 ml-6">
                    {section.options.map((option, idx) => (
                      <div key={idx} className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">{option.name}</label>
                        {option.type === 'color' && (
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-6 h-6 rounded border border-gray-200"
                              style={{ backgroundColor: option.value }}
                            ></div>
                            <input
                              type="color"
                              value={option.value}
                              className="w-6 h-6 rounded border-0 cursor-pointer"
                            />
                          </div>
                        )}
                        {option.type === 'text' && (
                          <input
                            type="text"
                            value={option.value}
                            className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          />
                        )}
                        {option.type === 'select' && (
                          <select className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
                            {option.choices?.map((choice) => (
                              <option key={choice} value={choice}>{choice}</option>
                            ))}
                          </select>
                        )}
                        {option.type === 'file' && (
                          <input
                            type="file"
                            accept="image/*"
                            className="text-xs border border-gray-200 rounded px-2 py-1"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Preview Controls */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Preview:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-2 rounded ${
                      previewDevice === 'desktop' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('tablet')}
                    className={`p-2 rounded ${
                      previewDevice === 'tablet' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Tablet className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-2 rounded ${
                      previewDevice === 'mobile' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-3 py-1 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  <Share className="h-3 w-3 mr-1" />
                  Share Preview
                </button>
              </div>
            </div>

            {/* Mock Website Preview */}
            <div className={`bg-white ${
              previewDevice === 'mobile' ? 'max-w-sm mx-auto' :
              previewDevice === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'
            } transition-all duration-300`}>
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-6 w-6" />
                    <span className="font-bold text-lg">TravelHub Pro</span>
                  </div>
                  <nav className="hidden md:flex space-x-6 text-sm">
                    <a href="#" className="hover:text-blue-200">Home</a>
                    <a href="#" className="hover:text-blue-200">Packages</a>
                    <a href="#" className="hover:text-blue-200">About</a>
                    <a href="#" className="hover:text-blue-200">Contact</a>
                  </nav>
                </div>
              </div>

              {/* Hero Section */}
              <div 
                className="relative h-64 bg-cover bg-center flex items-center justify-center"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${templates.find(t => t.id === activeTemplate)?.preview})` 
                }}
              >
                <div className="text-center text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {mockWebsiteContent[activeTemplate as keyof typeof mockWebsiteContent]?.hero}
                  </h1>
                  <p className="text-lg opacity-90">
                    {mockWebsiteContent[activeTemplate as keyof typeof mockWebsiteContent]?.subtitle}
                  </p>
                  <button className="mt-4 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    Explore Packages
                  </button>
                </div>
              </div>

              {/* Featured Packages */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockWebsiteContent[activeTemplate as keyof typeof mockWebsiteContent]?.packages.map((pkg, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="h-32 bg-gray-200 rounded mb-3"></div>
                      <h3 className="font-semibold text-gray-900 mb-2">{pkg}</h3>
                      <p className="text-sm text-gray-600 mb-3">Discover amazing experiences...</p>
                      <button className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition-colors">
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-800 text-white p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Contact Info</h4>
                    <p>Phone: +62 21 1234 5678</p>
                    <p>Email: info@travelhub.com</p>
                    <p>Address: Jakarta, Indonesia</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <p>About Us</p>
                    <p>Our Services</p>
                    <p>Terms & Conditions</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Follow Us</h4>
                    <p>Facebook | Instagram | Twitter</p>
                  </div>
                </div>
                <div className="text-center mt-4 pt-4 border-t border-gray-700">
                  <p>&copy; 2024 TravelHub Pro. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-primary-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Website Builder Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Drag & Drop</h4>
            <p className="text-sm text-gray-600">Easy visual editing with no coding required</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Mobile Responsive</h4>
            <p className="text-sm text-gray-600">Automatically optimized for all devices</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">SEO Optimized</h4>
            <p className="text-sm text-gray-600">Built-in SEO tools for better visibility</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Booking Integration</h4>
            <p className="text-sm text-gray-600">Seamless integration with your booking system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;