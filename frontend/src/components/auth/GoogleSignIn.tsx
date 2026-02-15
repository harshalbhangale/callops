'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function GoogleSignIn() {
  const router = useRouter()

  const handleDemoMode = () => {
    localStorage.setItem('demo-mode', 'true')
    router.push('/dashboard')
  }

  return (
    <div className="space-y-4">
      <motion.button
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-white text-gray-800 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 tap-target overflow-hidden w-full"
      >
        {/* Animated gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-red-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Google Logo SVG */}
        <svg className="w-7 h-7 relative z-10" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        
        {/* Button text with gradient on hover */}
        <span className="relative z-10 bg-gradient-to-r from-blue-600 via-red-600 to-yellow-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-red-700 group-hover:to-yellow-700 transition-all duration-300">
          Sign in with Google
        </span>
        
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.button>

      {/* Demo Mode Button */}
      <motion.button
        onClick={handleDemoMode}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
      >
        🎨 Try Demo Mode
      </motion.button>
      
      <p className="text-xs text-gray-500 text-center">
        Demo mode lets you explore the app without signing in
      </p>
    </div>
  )
}
