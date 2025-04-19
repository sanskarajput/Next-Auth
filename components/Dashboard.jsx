"use client";
import React from 'react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Bell, Settings, Search, Users, Activity, DollarSign, TrendingUp, BarChart } from 'lucide-react';
import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const areaData = [
  { name: 'Mon', users: 2400, sessions: 4000 },
  { name: 'Tue', users: 1398, sessions: 3000 },
  { name: 'Wed', users: 9800, sessions: 2000 },
  { name: 'Thu', users: 3908, sessions: 2780 },
  { name: 'Fri', users: 4800, sessions: 1890 },
  { name: 'Sat', users: 3800, sessions: 2390 },
  { name: 'Sun', users: 4300, sessions: 3490 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <header className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 mb-6 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="glass-input px-4 py-2 pl-10 rounded-lg text-white bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="glass-button p-2 rounded-lg">
              <Bell className="h-5 w-5 text-gray-200" />
            </button>
            <button className="glass-button p-2 rounded-lg">
            <SignedIn>
              <UserButton appearance={{
                elements: {
                  userButtonAvatarBox: 'border border-white border-[1px]',
                },
              }} />
            </SignedIn>
              </button>
            {/* <button className="glass-button p-2 rounded-lg">
              <Settings className="h-5 w-5 text-gray-200" />
            </button> */}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-blue-400" />
              <span className="glass-badge px-2 py-1 rounded-full text-green-800 bg-green-300 text-sm">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2,847</h3>
            <p className="text-gray-400">Total Users</p>
          </div>
          <div className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <Activity className="h-8 w-8 text-green-400" />
              <span className="glass-badge px-2 py-1 rounded-full text-green-800 bg-green-300 text-sm">+8.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">28.4k</h3>
            <p className="text-gray-400">Sessions</p>
          </div>
          <div className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-8 w-8 text-yellow-400" />
              <span className="glass-badge px-2 py-1 rounded-full text-green-800 bg-green-300 text-sm">+17.8%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">$45.2k</h3>
            <p className="text-gray-400">Revenue</p>
          </div>
          <div className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <span className="glass-badge px-2 py-1 rounded-full text-green-800 bg-green-300 text-sm">+22.4%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">89.2%</h3>
            <p className="text-gray-400">Conversion Rate</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Revenue Trend</h2>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: 'rgba(17, 25, 40, 0.8)', border: 'none' }} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={false}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white/10 border border-white/70 transition ease-in-out duration-300 transform shadow-xs hover:shadow-md shadow-white/80 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">User Activity</h2>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: 'rgba(17, 25, 40, 0.8)', border: 'none' }} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.2}
                    animationDuration={2000}
                  />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stackId="1"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.2}
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;