import { Title } from "@solidjs/meta";
import { createSignal, onMount } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@travel-agency/ui/card";
import { Button } from "@travel-agency/ui/button";
import {
  Users,
  MessageSquare,
  Calendar,
  FileText,
  Share2,
  Video,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
} from "lucide-solid";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  activeProjects: number;
  lastActivity: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  teamId: string;
  assignees: string[];
  dueDate: string;
  progress: number;
  tasks: number;
  completedTasks: number;
}

interface MessageSender {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  teamId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  type: string;
}

export default function Collaboration() {
  const [activeTab, setActiveTab] = createSignal<string>('teams');
  const [teams, setTeams] = createSignal<Team[]>([]);
  const [projects, setProjects] = createSignal<Project[]>([]);
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    // Simulate API calls
    setTimeout(() => {
      setTeams([
        {
          id: 'TEAM001',
          name: 'Umroh Operations',
          description: 'Team handling all Umroh and Haji operations',
          members: [
            { id: 'USR001', name: 'Sarah Wilson', role: 'Team Lead', avatar: 'SW', status: 'online' },
            { id: 'USR002', name: 'Ahmad Rahman', role: 'Agent', avatar: 'AR', status: 'online' },
            { id: 'USR003', name: 'Siti Nurhaliza', role: 'Agent', avatar: 'SN', status: 'away' },
          ],
          activeProjects: 3,
          lastActivity: '2024-01-15T10:30:00Z',
        },
        {
          id: 'TEAM002',
          name: 'Customer Support',
          description: 'Customer service and support team',
          members: [
            { id: 'USR004', name: 'David Chen', role: 'Support Lead', avatar: 'DC', status: 'online' },
            { id: 'USR005', name: 'Maya Sari', role: 'Support Agent', avatar: 'MS', status: 'offline' },
          ],
          activeProjects: 1,
          lastActivity: '2024-01-15T09:15:00Z',
        },
      ]);

      setProjects([
        {
          id: 'PROJ001',
          name: 'Ramadan Umroh Campaign',
          description: 'Marketing campaign for Ramadan Umroh packages',
          status: 'in_progress',
          priority: 'high',
          teamId: 'TEAM001',
          assignees: ['USR001', 'USR002'],
          dueDate: '2024-02-15',
          progress: 75,
          tasks: 12,
          completedTasks: 9,
        },
        {
          id: 'PROJ002',
          name: 'Customer Feedback System',
          description: 'Implement automated customer feedback collection',
          status: 'planning',
          priority: 'medium',
          teamId: 'TEAM002',
          assignees: ['USR004', 'USR005'],
          dueDate: '2024-03-01',
          progress: 25,
          tasks: 8,
          completedTasks: 2,
        },
      ]);

      setMessages([
        {
          id: 'MSG001',
          teamId: 'TEAM001',
          sender: { id: 'USR001', name: 'Sarah Wilson', avatar: 'SW' },
          content: 'Team meeting scheduled for tomorrow at 2 PM to discuss the Ramadan campaign progress.',
          timestamp: '2024-01-15T10:30:00Z',
          type: 'announcement',
        },
        {
          id: 'MSG002',
          teamId: 'TEAM001',
          sender: { id: 'USR002', name: 'Ahmad Rahman', avatar: 'AR' },
          content: 'I\'ve completed the visa documentation for the Jakarta group. All passports are ready for submission.',
          timestamp: '2024-01-15T09:45:00Z',
          type: 'update',
        },
        {
          id: 'MSG003',
          teamId: 'TEAM002',
          sender: { id: 'USR004', name: 'David Chen', avatar: 'DC' },
          content: 'Customer satisfaction scores for December: 4.8/5. Great improvement from last month!',
          timestamp: '2024-01-15T08:20:00Z',
          type: 'report',
        },
      ]);

      setLoading(false);
    }, 1000);
  });

  const tabs = [
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'planning': return 'bg-yellow-100 text-yellow-700';
      case 'on_hold': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
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
      <Title>Collaboration - TravelHub Pro</Title>
      
      {/* Header */}
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Team Collaboration</h1>
              <p class="text-gray-600">Coordinate with your team and manage projects efficiently</p>
            </div>
            <div class="flex items-center space-x-3">
              <Button variant="outline">
                <Video class="h-4 w-4 mr-2" />
                Start Meeting
              </Button>
              <Button>
                <Plus class="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div class="border-b border-gray-200 mb-8">
          <nav class="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                class={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab() === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div class="flex items-center space-x-2">
                  <tab.icon class="h-4 w-4" />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Teams Tab */}
        {activeTab() === 'teams' && (
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Teams</h2>
              <Button>
                <Plus class="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {teams().map((team) => (
                <Card class="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div class="flex items-center justify-between">
                      <CardTitle>{team.name}</CardTitle>
                      <Button variant="outline" size="sm">
                        <MoreVertical class="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{team.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="space-y-4">
                      {/* Team Members */}
                      <div>
                        <h4 class="font-medium text-gray-900 mb-3">Team Members</h4>
                        <div class="space-y-2">
                          {team.members.map((member) => (
                            <div class="flex items-center justify-between">
                              <div class="flex items-center space-x-3">
                                <div class="relative">
                                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span class="text-blue-600 font-medium text-sm">{member.avatar}</span>
                                  </div>
                                  <div class={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusIcon(member.status)}`}></div>
                                </div>
                                <div>
                                  <div class="font-medium text-gray-900 text-sm">{member.name}</div>
                                  <div class="text-xs text-gray-600">{member.role}</div>
                                </div>
                              </div>
                              <div class="flex items-center space-x-2">
                                <Button size="sm" variant="outline">
                                  <MessageSquare class="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Mail class="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Team Stats */}
                      <div class="border-t pt-4">
                        <div class="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div class="text-lg font-bold text-gray-900">{team.activeProjects}</div>
                            <div class="text-sm text-gray-600">Active Projects</div>
                          </div>
                          <div>
                            <div class="text-lg font-bold text-gray-900">{team.members.length}</div>
                            <div class="text-sm text-gray-600">Team Members</div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div class="flex space-x-2 pt-4">
                        <Button size="sm" class="flex-1">
                          <MessageSquare class="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" class="flex-1">
                          <Video class="h-3 w-3 mr-1" />
                          Meet
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab() === 'projects' && (
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Projects</h2>
              <div class="flex items-center space-x-3">
                <Button variant="outline">
                  <Filter class="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus class="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects().map((project) => (
                <Card class="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div class="flex items-center justify-between">
                      <CardTitle class="flex items-center space-x-2">
                        <span>{project.name}</span>
                        <span class={`text-sm ${getPriorityColor(project.priority)}`}>
                          ●
                        </span>
                      </CardTitle>
                      <span class={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status.replace('_', ' ')}
                      </span>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="space-y-4">
                      {/* Progress */}
                      <div>
                        <div class="flex justify-between text-sm mb-2">
                          <span class="text-gray-600">Progress</span>
                          <span class="font-medium">{project.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Tasks */}
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Tasks</span>
                        <span class="font-medium">{project.completedTasks}/{project.tasks} completed</span>
                      </div>

                      {/* Due Date */}
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Due Date</span>
                        <span class="font-medium">{new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>

                      {/* Assignees */}
                      <div>
                        <span class="text-sm text-gray-600 mb-2 block">Assignees</span>
                        <div class="flex -space-x-2">
                          {project.assignees.map((assigneeId) => {
                            const member = teams().flatMap(t => t.members).find(m => m.id === assigneeId);
                            return member ? (
                              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white">
                                <span class="text-blue-600 font-medium text-sm">{member.avatar}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>

                      {/* Actions */}
                      <div class="flex space-x-2 pt-4">
                        <Button size="sm" class="flex-1">View Details</Button>
                        <Button size="sm" variant="outline">
                          <Share2 class="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab() === 'messages' && (
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Team Messages</h2>
              <div class="flex items-center space-x-3">
                <div class="relative">
                  <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-4">
              {messages().map((message) => (
                <Card>
                  <CardContent class="p-4">
                    <div class="flex items-start space-x-3">
                      <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span class="text-blue-600 font-medium text-sm">{message.sender.avatar}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-2">
                          <div class="flex items-center space-x-2">
                            <span class="font-medium text-gray-900">{message.sender.name}</span>
                            <span class={`px-2 py-1 rounded-full text-xs font-medium ${
                              message.type === 'announcement' ? 'bg-blue-100 text-blue-700' :
                              message.type === 'update' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {message.type}
                            </span>
                          </div>
                          <span class="text-sm text-gray-500">{formatTimestamp(message.timestamp)}</span>
                        </div>
                        <p class="text-gray-700">{message.content}</p>
                        <div class="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                          <button class="hover:text-blue-600">Reply</button>
                          <button class="hover:text-blue-600">React</button>
                          <button class="hover:text-blue-600">Share</button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab() === 'calendar' && (
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Team Calendar</h2>
              <Button>
                <Plus class="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>

            <Card>
              <CardContent class="p-6">
                <div class="text-center py-12">
                  <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 class="text-lg font-medium text-gray-900 mb-2">Team Calendar</h3>
                  <p class="text-gray-600">Calendar integration will be displayed here</p>
                  <Button class="mt-4">Connect Calendar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}