import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";
import {
  Bell,
  Check,
  X,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Users,
  Settings,
  Filter,
  Search,
} from "lucide-solid";

interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'document' | 'system' | 'marketing' | 'agent';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  relatedId: string | null;
  relatedType: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = createSignal<Notification[]>([]);
  const [filter, setFilter] = createSignal<string>('all');
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications([
        {
          id: 'NOTIF001',
          type: 'booking',
          priority: 'high',
          title: 'New Umroh Booking',
          message: 'Ahmad Wijaya has booked Umroh Premium 12 Days package for Rp 35,000,000',
          timestamp: '2024-01-15T10:30:00Z',
          isRead: false,
          actionRequired: true,
          relatedId: 'BK001',
          relatedType: 'booking',
        },
        {
          id: 'NOTIF002',
          type: 'payment',
          priority: 'medium',
          title: 'Payment Received',
          message: 'Payment of Rp 2,500,000 received for booking TH-2024-002',
          timestamp: '2024-01-15T09:15:00Z',
          isRead: false,
          actionRequired: false,
          relatedId: 'PAY002',
          relatedType: 'payment',
        },
        {
          id: 'NOTIF003',
          type: 'document',
          priority: 'high',
          title: 'Document Expiring Soon',
          message: 'Passport for Sarah Johnson expires in 30 days',
          timestamp: '2024-01-15T08:45:00Z',
          isRead: true,
          actionRequired: true,
          relatedId: 'DOC003',
          relatedType: 'document',
        },
        {
          id: 'NOTIF004',
          type: 'system',
          priority: 'low',
          title: 'System Backup Completed',
          message: 'Daily backup completed successfully at 2:00 AM',
          timestamp: '2024-01-15T02:00:00Z',
          isRead: true,
          actionRequired: false,
          relatedId: null,
          relatedType: 'system',
        },
        {
          id: 'NOTIF005',
          type: 'marketing',
          priority: 'medium',
          title: 'Campaign Performance Update',
          message: 'Ramadan Umroh Special campaign achieved 50% open rate',
          timestamp: '2024-01-14T16:20:00Z',
          isRead: false,
          actionRequired: false,
          relatedId: 'CAM001',
          relatedType: 'campaign',
        },
        {
          id: 'NOTIF006',
          type: 'agent',
          priority: 'medium',
          title: 'Agent Target Achievement',
          message: 'Sarah Wilson exceeded monthly target by 150%',
          timestamp: '2024-01-14T14:30:00Z',
          isRead: true,
          actionRequired: false,
          relatedId: 'AGT001',
          relatedType: 'agent',
        },
      ]);
      setLoading(false);
    }, 1000);
  });

  const filterTypes = [
    { id: 'all', label: 'All Notifications', count: notifications().length },
    { id: 'unread', label: 'Unread', count: notifications().filter(n => !n.isRead).length },
    { id: 'booking', label: 'Bookings', count: notifications().filter(n => n.type === 'booking').length },
    { id: 'payment', label: 'Payments', count: notifications().filter(n => n.type === 'payment').length },
    { id: 'document', label: 'Documents', count: notifications().filter(n => n.type === 'document').length },
    { id: 'system', label: 'System', count: notifications().filter(n => n.type === 'system').length },
  ];

  const filteredNotifications = () => {
    if (filter() === 'all') return notifications();
    if (filter() === 'unread') return notifications().filter(n => !n.isRead);
    return notifications().filter(n => n.type === filter());
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'payment': return DollarSign;
      case 'document': return AlertTriangle;
      case 'system': return Settings;
      case 'marketing': return Bell;
      case 'agent': return Users;
      default: return Info;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  if (loading()) {
    return (
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <main class="min-h-screen bg-gray-50">
      <Title>Notifications - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
              <p class="text-gray-600">Stay updated with important events and activities</p>
            </div>
            <div class="flex items-center space-x-3">
              <Button variant="outline" onClick={markAllAsRead}>
                <CheckCircle class="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline">
                <Settings class="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div class="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filter Notifications</CardTitle>
              </CardHeader>
              <CardContent class="p-0">
                <nav class="space-y-1">
                  {filterTypes.map((type) => (
                    <button
                      onClick={() => setFilter(type.id)}
                      class={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                        filter() === type.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{type.label}</span>
                      <span class={`px-2 py-1 rounded-full text-xs ${
                        filter() === type.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {type.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card class="mt-6">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Unread</span>
                  <span class="font-bold text-red-600">{notifications().filter(n => !n.isRead).length}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Action Required</span>
                  <span class="font-bold text-orange-600">{notifications().filter(n => n.actionRequired).length}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Today</span>
                  <span class="font-bold text-blue-600">{notifications().filter(n => {
                    const today = new Date().toDateString();
                    return new Date(n.timestamp).toDateString() === today;
                  }).length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <div class="lg:col-span-3">
            <div class="space-y-4">
              {filteredNotifications().map((notification) => {
                const TypeIcon = getTypeIcon(notification.type);
                return (
                  <Card class={`transition-all duration-200 hover:shadow-md ${
                    !notification.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                  }`}>
                    <CardContent class="p-6">
                      <div class="flex items-start space-x-4">
                        <div class={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                          <TypeIcon class="h-5 w-5" />
                        </div>
                        
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center justify-between mb-2">
                            <h3 class={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            <div class="flex items-center space-x-2">
                              <span class="text-xs text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                              {!notification.isRead && (
                                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          
                          <p class="text-gray-600 text-sm mb-3">{notification.message}</p>
                          
                          <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                              <span class={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                {notification.priority.toUpperCase()}
                              </span>
                              <span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                {notification.type}
                              </span>
                              {notification.actionRequired && (
                                <span class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                                  Action Required
                                </span>
                              )}
                            </div>
                            
                            <div class="flex items-center space-x-2">
                              {!notification.isRead && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check class="h-3 w-3 mr-1" />
                                  Mark Read
                                </Button>
                              )}
                              {notification.actionRequired && (
                                <Button size="sm">
                                  Take Action
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X class="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredNotifications().length === 0 && (
                <Card>
                  <CardContent class="p-12 text-center">
                    <Bell class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 class="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                    <p class="text-gray-600">You're all caught up! No new notifications to show.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}