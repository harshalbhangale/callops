'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Header from '@/components/dashboard/Header'
import BottomNav from '@/components/dashboard/BottomNav'
import { LogOut, Bell, Shield, HelpCircle } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const settingsItems = [
    { icon: Bell, label: 'Notifications', href: '#' },
    { icon: Shield, label: 'Privacy & Security', href: '#' },
    { icon: HelpCircle, label: 'Help & Support', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header user={session?.user} title="Settings" />
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="space-y-3">
          {settingsItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                className="w-full bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center justify-between tap-target"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="font-semibold text-gray-900">{item.label}</span>
                </div>
              </button>
            )
          })}

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full bg-red-50 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center justify-between tap-target"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-semibold text-red-600">Sign Out</span>
            </div>
          </button>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
