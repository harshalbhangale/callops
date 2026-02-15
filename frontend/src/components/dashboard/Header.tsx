'use client'

import { signOut } from 'next-auth/react'
import { Bell, LogOut } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  title: string
  subtitle?: string
}

export default function Header({ user, title, subtitle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Callops"
            width={32}
            height={32}
            className="flex-shrink-0"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="tap-target p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          {user?.image && (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="tap-target"
            >
              <Image
                src={user.image}
                alt={user.name || 'User'}
                width={36}
                height={36}
                className="rounded-full ring-2 ring-gray-200"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
