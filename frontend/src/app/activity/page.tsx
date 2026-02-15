'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/dashboard/Header'
import BottomNav from '@/components/dashboard/BottomNav'
import { Phone, Rocket, CheckCircle, Code, Zap, MessageSquare } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'deployment',
    title: 'App Deployed Successfully',
    description: 'Coffee Marketplace is now live',
    time: '2 hours ago',
    icon: Rocket,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    type: 'call',
    title: 'New Call Received',
    description: 'You requested a Todo List app',
    time: '1 day ago',
    icon: Phone,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    type: 'whatsapp',
    title: 'WhatsApp Update',
    description: 'Link sent to your WhatsApp',
    time: '1 day ago',
    icon: MessageSquare,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 4,
    type: 'build',
    title: 'Build Started',
    description: 'Weather Dashboard build in progress',
    time: '2 days ago',
    icon: Code,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 5,
    type: 'completed',
    title: 'App Built Successfully',
    description: 'Todo Master is ready to deploy',
    time: '2 days ago',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 6,
    type: 'deployment',
    title: 'App Deployed',
    description: 'Portfolio Site went live',
    time: '3 days ago',
    icon: Zap,
    color: 'bg-yellow-100 text-yellow-600'
  }
]

export default function ActivityPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header user={session?.user} title="Activity Feed" subtitle="Recent updates" />
      
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Activities */}
          <div className="space-y-6">
            {activities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="relative flex gap-4">
                  {/* Icon */}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl ${activity.color} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  )
}
