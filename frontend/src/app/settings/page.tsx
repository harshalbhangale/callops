'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Header from '@/components/dashboard/Header'
import BottomNav from '@/components/dashboard/BottomNav'
import { LogOut, Bell, Shield, HelpCircle, User, CreditCard, Globe, Moon, ChevronRight } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router])

  const accountSettings = [
    { icon: User, label: 'Profile Settings', description: 'Edit your personal information' },
    { icon: Bell, label: 'Notifications', description: 'Manage notification preferences' },
    { icon: Globe, label: 'Language', description: 'English (US)' },
  ]

  const appSettings = [
    { icon: Moon, label: 'Dark Mode', description: 'Currently off' },
    { icon: Shield, label: 'Privacy & Security', description: 'Manage your privacy' },
    { icon: CreditCard, label: 'Billing', description: 'View plans and usage' },
  ]

  const supportSettings = [
    { icon: HelpCircle, label: 'Help & Support', description: 'Get help with Callops' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header user={session?.user} title="Settings" subtitle="Manage your account" />
      
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Account Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">Account</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {accountSettings.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    index !== accountSettings.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>
              )
            })}
          </div>
        </div>

        {/* App Settings Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">App Settings</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {appSettings.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    index !== appSettings.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">Support</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {supportSettings.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="font-semibold text-red-600">Sign Out</span>
        </button>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500 pt-4">
          Callops v1.0.0
        </div>
      </main>
      
      <BottomNav />
    </div>
  )
}
