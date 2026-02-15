'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Phone, Sparkles, Zap, Rocket, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import GoogleSignIn from '@/components/auth/GoogleSignIn'
import PhoneSignIn from '@/components/auth/PhoneSignIn'

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
    <main className="min-h-screen bg-gradient-to-br from-primary/20 via-white to-secondary/20 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              duration: 0.8,
              bounce: 0.5 
            }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse" />
            <Image
              src="/logo.png"
              alt="Callops Logo"
              width={140}
              height={140}
              className="drop-shadow-2xl relative z-10"
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
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
              Your Voice
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl leading-relaxed"
          >
            Call our AI, describe your app idea, and get a deployed link sent directly to your WhatsApp in minutes.
          </motion.p>

          {/* Auth Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md mb-16 space-y-6"
          >
            <GoogleSignIn />
            
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            
            <PhoneSignIn />
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Fast Deploy</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">AI Powered</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
              <Rocket className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Production Ready</span>
            </div>
          </motion.div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-5xl mt-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 mb-12 text-lg">Three simple steps to bring your ideas to life</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-transform duration-300">
                  <Phone className="w-10 h-10 text-primary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">Call Our AI</div>
                <p className="text-gray-600 leading-relaxed">
                  Simply dial our AI phone number and tell us what you want to build
                </p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-secondary/20"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-3xl flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="w-10 h-10 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">AI Builds It</div>
                <p className="text-gray-600 leading-relaxed">
                  Our AI generates beautiful, production-ready code tailored to your needs
                </p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-3xl p-8 shadow-card hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-accent/20"
              >
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  3
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-3xl flex items-center justify-center mb-6 mx-auto transform hover:rotate-12 transition-transform duration-300">
                  <Rocket className="w-10 h-10 text-accent" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-3">Get Live Link</div>
                <p className="text-gray-600 leading-relaxed">
                  Receive a deployed link on WhatsApp. Your app is live and ready to share!
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-full max-w-4xl mt-20"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 shadow-2xl border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Callops?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-2 text-lg">Lightning Fast</div>
                    <div className="text-gray-600">Apps deployed in under 3 minutes</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-2 text-lg">No Coding Required</div>
                    <div className="text-gray-600">Just speak naturally to our AI</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-2 text-lg">Production Ready</div>
                    <div className="text-gray-600">Optimized, secure, and scalable</div>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-2 text-lg">WhatsApp Updates</div>
                    <div className="text-gray-600">Real-time progress on your phone</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 mb-10 w-full max-w-md"
          >
            <p className="text-gray-600 mb-6 text-lg font-medium">Ready to build your next app?</p>
            <GoogleSignIn />
            
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>
            
            <PhoneSignIn />
          </motion.div>
        </div>
      </div>
    </main>
  )
}
