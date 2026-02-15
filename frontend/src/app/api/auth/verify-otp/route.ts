import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

// Same in-memory store as send-otp (in production, use Redis)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, otp } = await req.json()

    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      )
    }

    // Demo number bypass - always accept 123456
    const isDemoNumber = phoneNumber === '+917028167389'
    if (isDemoNumber && otp === '123456') {
      const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')
      const token = await new SignJWT({ phoneNumber, type: 'phone' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)

      return NextResponse.json({
        success: true,
        token,
        user: {
          phoneNumber,
          name: phoneNumber,
        }
      })
    }

    const stored = otpStore.get(phoneNumber)

    if (!stored) {
      return NextResponse.json(
        { error: 'No OTP found for this number. Please request a new one.' },
        { status: 400 }
      )
    }

    if (stored.expiresAt < Date.now()) {
      otpStore.delete(phoneNumber)
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    if (stored.otp !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP' },
        { status: 400 }
      )
    }

    // OTP is valid, delete it
    otpStore.delete(phoneNumber)

    // Create a session token
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')
    const token = await new SignJWT({ phoneNumber, type: 'phone' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret)

    return NextResponse.json({
      success: true,
      token,
      user: {
        phoneNumber,
        name: phoneNumber,
      }
    })
  } catch (error: any) {
    console.error('Verify OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    )
  }
}
