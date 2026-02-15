'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/dashboard/Header'
import BottomNav from '@/components/dashboard/BottomNav'
import { ExternalLink, Code, Rocket, Zap, Globe, Github } from 'lucide-react'

const mockApps = [
  {
    id: 1,
    name: 'Coffee Marketplace',
    description: 'E-commerce platform for coffee products',
    url: 'https://coffee-shop-xyz.vercel.app',
    status: 'live',
    tech: ['Next.js', 'Tailwind', 'Stripe'],
    deployedAt: '2 hours ago'
  },
  {
    id: 2,
    name: 'Todo Master',
    description: 'Modern task management app',
    url: 'https://todo-master-abc.vercel.app',
    status: 'live',
    tech: ['React', 'Node.js', 'MongoDB'],
    deployedAt: '1 day ago'
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    description: 'Real-time weather information',
    url: 'https://weather-dash-def.vercel.app',
    status: 'building',
    tech: ['Vue.js', 'OpenWeather API'],
    deployedAt: 'Building...'
  },
  {
    id: 4,
    name: 'Portfolio Site',
    description: 'Personal portfolio with blog',
    url: 'https://portfolio-ghi.vercel.app',
    status: 'live',
    tech: ['Gatsby', 'GraphQL', 'MDX'],
    deployedAt: '3 days ago'
  }
]

export default function AppsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header user={session?.user} title="My Apps" subtitle={`${mockApps.filter(a => a.status === 'live').length} live apps`} />
      
      <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {mockApps.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900">{app.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    app.status === 'live' ? 'bg-green-100 text-green-700' :
                    app.status === 'building' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {app.status === 'live' ? '● Live' : 'Building...'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{app.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {app.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">{app.deployedAt}</span>
              <div className="flex gap-2">
                {app.status === 'live' && (
                  <>
                    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-1">
                      <Code className="w-4 h-4" />
                      View Code
                    </button>
                    <a 
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
      
      <BottomNav />
    </div>
  )
}
