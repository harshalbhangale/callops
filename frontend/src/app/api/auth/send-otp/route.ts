import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhone = process.env.TWILIO_PHONE_NUMBER

// In-memory OTP storage (use Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json()

    if (!phoneNumber || !/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Use E.164 format (e.g., +1234567890)' },
        { status: 400 }
      )
    }

    // Demo OTP for testing - always use 123456 for +917028167389
    const isDemoNumber = phoneNumber === '+917028167389'
    const otp = isDemoNumber ? '123456' : Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes

    // Store OTP
    otpStore.set(phoneNumber, { otp, expiresAt })

    // Clean up expired OTPs
    for (const [phone, data] of otpStore.entries()) {
      if (data.expiresAt < Date.now()) {
        otpStore.delete(phone)
      }
    }

    // Send OTP via Twilio (skip for demo number)
    if (!isDemoNumber && accountSid && authToken && twilioPhone) {
      const client = twilio(accountSid, authToken)
      
      try {
        await client.messages.create({
          body: `Your Callops verification code is: ${otp}. Valid for 5 minutes.`,
          from: twilioPhone,
          to: phoneNumber,
        })
        console.log(`✅ OTP sent to ${phoneNumber}`)
      } catch (twilioError: any) {
        console.error('Twilio error:', twilioError.message)
        // Continue anyway for development
      }
    } else {
      console.log(`📱 ${isDemoNumber ? 'DEMO NUMBER' : 'DEV MODE'}: OTP for ${phoneNumber} is ${otp}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: isDemoNumber ? 'Demo OTP: Use code 123456' : 'OTP sent successfully',
      // Show OTP for demo number or in development
      ...((isDemoNumber || process.env.NODE_ENV === 'development') && { otp })
    })
  } catch (error: any) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}
