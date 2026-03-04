'use client';

import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

// Sample analytics data – replace with real data from your DB/analytics
const contactData = [
  { month: 'Aug', contacts: 4 },
  { month: 'Sep', contacts: 7 },
  { month: 'Oct', contacts: 12 },
  { month: 'Nov', contacts: 9 },
  { month: 'Dec', contacts: 6 },
  { month: 'Jan', contacts: 14 },
  { month: 'Feb', contacts: 18 },
  { month: 'Mar', contacts: 21 },
];

const careerData = [
  { month: 'Aug', applications: 2 },
  { month: 'Sep', applications: 3 },
  { month: 'Oct', applications: 5 },
  { month: 'Nov', applications: 4 },
  { month: 'Dec', applications: 2 },
  { month: 'Jan', applications: 6 },
  { month: 'Feb', applications: 9 },
  { month: 'Mar', applications: 11 },
];

const chartColors = {
  teal: '#06b6d4',
  tealLight: 'rgba(6,182,212,0.15)',
  grid: 'rgba(255,255,255,0.06)',
  text: '#94a3b8',
};

const TooltipStyle = {
  contentStyle: {
    background: '#0f172a',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#f1f5f9',
    fontSize: '13px',
  },
  cursor: { fill: 'rgba(6,182,212,0.06)' },
};

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <Card glow className="p-8 text-center">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
              <p className="mt-2 text-sm text-text-secondary">
                Kiran K &amp; Associates — Internal Portal
              </p>
            </div>
            <Button size="lg" className="w-full" onClick={() => signIn()}>
              Sign In
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
            <p className="mt-1 text-text-secondary">Welcome back, {session.user?.name ?? 'Admin'}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Contacts', value: '91', change: '+21 this month' },
            { label: 'Applications', value: '42', change: '+11 this month' },
            { label: 'Blog Posts', value: '3', change: 'via Sanity CMS' },
            { label: 'Response Rate', value: '100%', change: 'All replied' },
          ].map((kpi) => (
            <Card key={kpi.label} className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">{kpi.label}</p>
              <p className="mt-2 text-3xl font-bold text-teal-400">{kpi.value}</p>
              <p className="mt-1 text-xs text-text-secondary">{kpi.change}</p>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-text-secondary">
              Contact Enquiries (Monthly)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={contactData} margin={{ left: -20 }}>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: chartColors.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartColors.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...TooltipStyle} />
                <Bar dataKey="contacts" fill={chartColors.teal} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wide text-text-secondary">
              Career Applications (Monthly)
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={careerData} margin={{ left: -20 }}>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: chartColors.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartColors.text, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip {...TooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke={chartColors.teal}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: chartColors.teal, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quick Links */}
        <Card className="mt-6 p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Quick Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={() => window.open('/studio', '_blank')}>
              Open Sanity Studio
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.open('https://vercel.com/dashboard', '_blank')}>
              Vercel Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.open('https://www.icai.org/', '_blank')}>
              ICAI Portal
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
