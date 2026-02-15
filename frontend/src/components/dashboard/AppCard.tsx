'use client'

import { App } from '@/types'
import { ExternalLink, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface AppCardProps {
  app: App
}

export default function AppCard({ app }: AppCardProps) {
  const typeColors = {
    marketplace: 'bg-purple-100 text-purple-700',
    todo: 'bg-blue-100 text-blue-700',
    portfolio: 'bg-pink-100 text-pink-700',
    blog: 'bg-green-100 text-green-700',
    other: 'bg-gray-100 text-gray-700',
  }

  const statusConfig = {
    building: {
      icon: Loader2,
      color: 'text-blue-600 bg-blue-50',
      label: 'Building',
      animate: true,
    },
    deployed: {
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50',
      label: 'Deployed',
      animate: false,
    },
    failed: {
      icon: XCircle,
      color: 'text-red-600 bg-red-50',
      label: 'Failed',
      animate: false,
    },
  }

  const config = statusConfig[app.status]
  const StatusIcon = config.icon

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${typeColors[app.type]}`}>
              {app.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {app.description}
          </p>
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
          <StatusIcon className={`w-3 h-3 ${config.animate ? 'animate-spin' : ''}`} />
          {config.label}
        </div>

        {app.deployedUrl && app.status === 'deployed' && (
          <a
            href={app.deployedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors tap-target"
            onClick={(e) => e.stopPropagation()}
          >
            Open
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}
