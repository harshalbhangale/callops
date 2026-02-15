'use client'

import { Phone as PhoneIcon } from 'lucide-react'

export default function CallButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_AI_PHONE_NUMBER || '+447458081879'

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Ready to Build?</h3>
            <p className="text-white/90">Call our AI and describe your app</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur flex-shrink-0">
            <PhoneIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm text-white/80 mb-2">AI Phone Number</div>
          <a
            href={`tel:${phoneNumber}`}
            className="text-3xl font-bold tracking-tight active:opacity-80 transition-opacity block"
          >
            {phoneNumber}
          </a>
        </div>

        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white text-primary rounded-2xl font-bold shadow-lg active:scale-95 transition-transform tap-target"
        >
          <PhoneIcon className="w-5 h-5" />
          Call Now
        </a>
      </div>
    </div>
  )
}
