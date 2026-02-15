'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PhoneSignIn() {
  const router = useRouter()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [devOtp, setDevOtp] = useState('') // For development

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      // In development, show the OTP
      if (data.otp) {
        setDevOtp(data.otp)
      }

      setStep('otp')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP')
      }

      // Store token
      localStorage.setItem('auth-token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {step === 'phone' ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7DD3C0] focus:border-transparent"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter with country code (e.g., +1 for US)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7DD3C0] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#6BC3AF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-[#7DD3C0] focus:border-transparent"
              maxLength={6}
              required
            />
            {devOtp && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Development Mode:</strong> Your OTP is <strong>{devOtp}</strong>
                </p>
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500">
              OTP sent to {phoneNumber}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7DD3C0] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#6BC3AF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>

          <button
            type="button"
            onClick={() => { setStep('phone'); setError(''); setOtp(''); }}
            className="w-full text-gray-600 text-sm hover:text-gray-800"
          >
            ← Back to phone number
          </button>
        </form>
      )}
    </div>
  )
}
