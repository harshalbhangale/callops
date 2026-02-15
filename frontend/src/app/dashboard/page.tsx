'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Phone, Rocket, TrendingUp, Clock } from 'lucide-react'
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
    if (status === 'unauthenticated') {
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const stats = {
    totalCalls: calls.length,
    appsGenerated: apps.length,
    successRate: calls.length > 0 ? Math.round((apps.length / calls.length) * 100) : 0,
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        user={session?.user} 
        title="Dashboard"
        subtitle={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      />

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Call AI Button */}
        <CallButton />

        {/* Stats */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
          <div className="grid grid-cols-3 gap-4">
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

        {/* Recent Calls */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Calls</h2>
            {calls.length > 2 && (
              <button 
                onClick={() => router.push('/calls')}
                className="text-sm text-primary font-semibold"
              >
                View All
              </button>
            )}
          </div>
          <div className="space-y-3">
            {calls.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-card">
                <Phone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No calls yet. Call our AI to get started!</p>
              </div>
            ) : (
              calls.slice(0, 3).map((call) => (
                <CallCard key={call.id} call={call} />
              ))
            )}
          </div>
        </div>

        {/* My Apps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">My Apps</h2>
            {apps.length > 2 && (
              <button 
                onClick={() => router.push('/apps')}
                className="text-sm text-primary font-semibold"
              >
                View All
              </button>
            )}
          </div>
          <div className="space-y-3">
            {apps.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-card">
                <Rocket className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No apps yet. Your first app will appear here!</p>
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
