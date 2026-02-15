'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Phone, Rocket, TrendingUp, Sparkles, Zap, Users } from 'lucide-react'
import Header from '@/components/dashboard/Header'
import BottomNav from '@/components/dashboard/BottomNav'
import StatsCard from '@/components/dashboard/StatsCard'
import CallButton from '@/components/dashboard/CallButton'
import CallCard from '@/components/dashboard/CallCard'
import AppCard from '@/components/dashboard/AppCard'
import { Call, App } from '@/types'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [calls, setCalls] = useState<Call[]>([])
  const [apps, setApps] = useState<App[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for both Google OAuth and phone auth
    const phoneToken = typeof window !== 'undefined' ? localStorage.getItem('phone-auth-token') : null
    
    if (status === 'unauthenticated' && !phoneToken) {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    // Mock data for now - will be replaced with API calls
    const mockCalls: Call[] = [
      {
        id: '1',
        userId: session?.user?.id || '',
        phoneNumber: '+1234567890',
        transcription: 'I want to build a marketplace for my coffee shop where customers can browse and order products online.',
        status: 'completed',
        duration: 45,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        appId: '1',
      },
      {
        id: '2',
        userId: session?.user?.id || '',
        phoneNumber: '+1234567890',
        transcription: 'Create a simple todo app with categories and priorities.',
        status: 'processing',
        duration: 32,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ]

    const mockApps: App[] = [
      {
        id: '1',
        userId: session?.user?.id || '',
        name: 'Coffee Shop Marketplace',
        type: 'marketplace',
        description: 'A beautiful marketplace where customers can browse products, add to cart, and checkout.',
        deployedUrl: 'https://coffee-shop-demo.vercel.app',
        status: 'deployed',
        createdFrom: '1',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ]

    setCalls(mockCalls)
    setApps(mockApps)
    setLoading(false)
  }, [session])

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = {
    totalCalls: 2,
    appsGenerated: 1,
    successRate: 50,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        user={session?.user} 
        title="Dashboard"
        subtitle={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      />

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-28 safe-bottom">
        {/* Hero Call Button */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl"></div>
          <CallButton />
        </div>

        {/* Stats Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Overview</h2>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <StatsCard
              title="Total Calls"
              value={stats.totalCalls}
              icon={Phone}
              color="primary"
            />
            <StatsCard
              title="Apps Built"
              value={stats.appsGenerated}
              icon={Rocket}
              color="secondary"
            />
            <StatsCard
              title="Success"
              value={`${stats.successRate}%`}
              icon={TrendingUp}
              color="accent"
            />
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Build Time</p>
              <p className="text-3xl font-bold">3:45</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90 mb-1">Avg Response</p>
              <p className="text-2xl font-bold">2 min</p>
            </div>
            <Zap className="w-12 h-12 opacity-80" />
          </div>
        </div>

        {/* Recent Calls */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Calls</h2>
            {calls.length > 2 && (
              <button 
                onClick={() => router.push('/calls')}
                className="text-sm text-primary font-semibold hover:underline"
              >
                View All →
              </button>
            )}
          </div>
          <div className="space-y-3">
            {calls.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <p className="text-gray-900 font-semibold mb-2">No calls yet</p>
                <p className="text-gray-600 text-sm">Call our AI to get started building amazing apps!</p>
              </div>
            ) : (
              calls.slice(0, 3).map((call) => (
                <CallCard key={call.id} call={call} />
              ))
            )}
          </div>
        </div>

        {/* My Apps */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">My Apps</h2>
            {apps.length > 2 && (
              <button 
                onClick={() => router.push('/apps')}
                className="text-sm text-primary font-semibold hover:underline"
              >
                View All →
              </button>
            )}
          </div>
          <div className="space-y-3">
            {apps.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-gray-900 font-semibold mb-2">No apps yet</p>
                <p className="text-gray-600 text-sm">Your first app will appear here after your call!</p>
              </div>
            ) : (
              apps.slice(0, 3).map((app) => (
                <AppCard key={app.id} app={app} />
              ))
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
