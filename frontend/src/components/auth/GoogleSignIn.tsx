'use client'

import { signIn } from 'next-auth/react'
import { Chrome } from 'lucide-react'

export default function GoogleSignIn() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
      className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 tap-target"
    >
      <Chrome className="w-6 h-6" />
      Sign in with Google
    </button>
  )
}
