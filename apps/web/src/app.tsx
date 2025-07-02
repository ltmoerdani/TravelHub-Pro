import { Component, lazy } from "solid-js";
import { Routes, Route, A } from "@solidjs/router";
import "./app.css";

// Lazy load route components
const Dashboard = lazy(() => import("./routes/dashboard"));
const Umroh = lazy(() => import("./routes/umroh"));
const Booking = lazy(() => import("./routes/booking/[id]"));
const Inventory = lazy(() => import("./routes/inventory"));
const Marketing = lazy(() => import("./routes/marketing"));
const Agents = lazy(() => import("./routes/agents"));
const Reports = lazy(() => import("./routes/reports"));
const Settings = lazy(() => import("./routes/settings"));

const App: Component = () => {
  return (
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <span class="text-xl font-bold text-blue-600">TravelHub Pro</span>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <A href="/" class="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500">
                  Dashboard
                </A>
                <A href="/umroh" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                  Umroh
                </A>
                <A href="/inventory" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                  Inventory
                </A>
                <A href="/marketing" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                  Marketing
                </A>
                <A href="/agents" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                  Agents
                </A>
                <A href="/reports" class="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent">
                  Reports
                </A>
              </div>
            </div>
            <div class="flex items-center">
              <A href="/settings" class="text-gray-500 hover:text-gray-900">
                Settings
              </A>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" component={Dashboard} />
          <Route path="/umroh" component={Umroh} />
          <Route path="/booking/:id" component={Booking} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/marketing" component={Marketing} />
          <Route path="/agents" component={Agents} />
          <Route path="/reports" component={Reports} />
          <Route path="/settings" component={Settings} />
        </Routes>
      </main>
    </div>
  );
};

export default App;