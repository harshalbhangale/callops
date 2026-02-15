'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Phone, Sparkles, Zap, Rocket, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import GoogleSignIn from '@/components/auth/GoogleSignIn'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/20 via-white to-secondary/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="mb-8"
          >
            <Image
              src="/logo.png"
              alt="Callops Logo"
              width={120}
              height={120}
              className="drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Build Apps with
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Voice
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl"
          >
            Call our AI, describe your app idea, and get a deployed link sent directly to your WhatsApp in minutes.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <GoogleSignIn />
          </motion.div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-5xl mt-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">1. Call Our AI</div>
                <p className="text-gray-600">
                  Simply dial our AI phone number and tell us what you want to build
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-8 h-8 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">2. AI Builds It</div>
                <p className="text-gray-600">
                  Our AI generates beautiful, production-ready code tailored to your needs
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Rocket className="w-8 h-8 text-accent" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">3. Get Live Link</div>
                <p className="text-gray-600">
                  Receive a deployed link on WhatsApp. Your app is live and ready to share!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-3xl mt-20"
          >
            <div className="bg-white rounded-2xl p-8 shadow-card">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Callops?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Lightning Fast</div>
                    <div className="text-gray-600 text-sm">Apps deployed in under 3 minutes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">No Coding Required</div>
                    <div className="text-gray-600 text-sm">Just speak naturally to our AI</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Production Ready</div>
                    <div className="text-gray-600 text-sm">Optimized, secure, and scalable</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">WhatsApp Updates</div>
                    <div className="text-gray-600 text-sm">Real-time progress on your phone</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-20 mb-10"
          >
            <p className="text-gray-500 mb-4">Ready to build your next app?</p>
            <GoogleSignIn />
          </motion.div>
        </div>
      </div>
    </main>
  )
}
