'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/dashboard/Header'
import BottomNav from '@/components/dashboard/BottomNav'
import { Phone, Clock, CheckCircle, XCircle, PlayCircle } from 'lucide-react'

const mockCalls = [
  {
    id: 1,
    type: 'Coffee Shop App',
    time: '2 hours ago',
    duration: '3:45',
    status: 'completed',
    description: 'Marketplace for coffee products'
  },
  {
    id: 2,
    type: 'Todo List App',
    time: '1 day ago',
    duration: '2:30',
    status: 'completed',
    description: 'Simple task management system'
  },
  {
    id: 3,
    type: 'Weather Dashboard',
    time: '2 days ago',
    duration: '4:12',
    status: 'failed',
    description: 'Real-time weather information'
  },
  {
    id: 4,
    type: 'Portfolio Website',
    time: '3 days ago',
    duration: '5:20',
    status: 'completed',
    description: 'Personal portfolio with blog'
  }
]

export default function CallsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header user={session?.user} title="Call History" subtitle={`${mockCalls.length} total calls`} />
      
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {mockCalls.map((call) => (
          <div key={call.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  call.status === 'completed' ? 'bg-green-100' : 
                  call.status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {call.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : call.status === 'failed' ? (
                    <XCircle className="w-6 h-6 text-red-600" />
                  ) : (
                    <PlayCircle className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{call.type}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{call.description}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{call.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{call.duration}</span>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                call.status === 'completed' ? 'bg-green-100 text-green-700' :
                call.status === 'failed' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </main>
      
      <BottomNav />
    </div>
  )
}
