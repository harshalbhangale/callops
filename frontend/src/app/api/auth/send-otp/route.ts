import { NextApiRequest, NextApiResponse } from 'next'

// Simple in-memory OTP storage (use Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { phoneNumber } = req.body

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' })
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  // Store OTP (expires in 5 minutes)
  otpStore.set(phoneNumber, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000
  })

  // In production, send SMS via Twilio
  // For now, just log it (you can see it in the console)
  console.log(`📱 OTP for ${phoneNumber}: ${otp}`)

  // For development: return OTP in response (REMOVE IN PRODUCTION!)
  if (process.env.NODE_ENV === 'development') {
    return res.status(200).json({ 
      success: true, 
      message: 'OTP sent',
      otp // Remove this in production!
    })
  }

  // TODO: Send SMS via Twilio
  // const twilio = require('twilio')(
  //   process.env.TWILIO_ACCOUNT_SID,
  //   process.env.TWILIO_AUTH_TOKEN
  // )
  // await twilio.messages.create({
  //   body: `Your Callops OTP is: ${otp}`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: phoneNumber
  // })

  return res.status(200).json({ 
    success: true, 
    message: 'OTP sent successfully'
  })
}
