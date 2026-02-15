'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/dashboard/Header'
import BottomNav from '@/components/dashboard/BottomNav'

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
      <Header user={session?.user} title="Calls" />
      <main className="max-w-lg mx-auto px-4 py-6">
        <p className="text-gray-600 text-center">Calls page coming soon...</p>
      </main>
      <BottomNav />
    </div>
  )
}
