'use client'

import { Call } from '@/types'
import { Phone, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface CallCardProps {
  call: Call
}

export default function CallCard({ call }: CallCardProps) {
  const statusConfig = {
    processing: {
      icon: Loader2,
      color: 'text-blue-600 bg-blue-50',
      label: 'Processing',
      animate: true,
    },
    completed: {
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50',
      label: 'Completed',
      animate: false,
    },
    failed: {
      icon: XCircle,
      color: 'text-red-600 bg-red-50',
      label: 'Failed',
      animate: false,
    },
  }

  const config = statusConfig[call.status]
  const StatusIcon = config.icon

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Link href={`/calls/${call.id}`}>
      <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 active:scale-[0.98]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                {formatDistanceToNow(new Date(call.createdAt), { addSuffix: true })}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(call.duration)}
              </div>
            </div>
          </div>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
            <StatusIcon className={`w-3 h-3 ${config.animate ? 'animate-spin' : ''}`} />
            {config.label}
          </div>
        </div>

        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
          {call.transcription || 'No transcription available'}
        </p>

        {call.appId && (
          <div className="text-xs text-primary font-medium">
            → View Generated App
          </div>
        )}
      </div>
    </Link>
  )
}
