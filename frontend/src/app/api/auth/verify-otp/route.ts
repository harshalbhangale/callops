import { NextApiRequest, NextApiResponse } from 'next'
import { SignJWT } from 'jose'

// Simple in-memory OTP storage (same as send-otp)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { phoneNumber, otp } = req.body

  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: 'Phone number and OTP are required' })
  }

  const storedOtp = otpStore.get(phoneNumber)

  if (!storedOtp) {
    return res.status(400).json({ error: 'No OTP found. Please request a new one.' })
  }

  if (Date.now() > storedOtp.expiresAt) {
    otpStore.delete(phoneNumber)
    return res.status(400).json({ error: 'OTP expired. Please request a new one.' })
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' })
  }

  // OTP is valid, delete it
  otpStore.delete(phoneNumber)

  // Create JWT token
  const secret = new TextEncoder().encode(
    process.env.NEXTAUTH_SECRET || 'fallback-secret'
  )

  const token = await new SignJWT({ 
    phoneNumber,
    type: 'phone-auth' 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

  return res.status(200).json({
    success: true,
    token,
    user: {
      phoneNumber,
      id: phoneNumber // Use phone as user ID
    }
  })
}
