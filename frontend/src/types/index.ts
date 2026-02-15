export interface Call {
  id: string
  userId: string
  phoneNumber: string
  transcription: string
  status: 'processing' | 'completed' | 'failed'
  duration: number
  createdAt: string
  appId?: string
}

export interface App {
  id: string
  userId: string
  name: string
  type: 'marketplace' | 'todo' | 'portfolio' | 'blog' | 'other'
  description: string
  deployedUrl?: string
  status: 'building' | 'deployed' | 'failed'
  createdFrom?: string // call ID
  createdAt: string
  updatedAt: string
}

export interface Stats {
  totalCalls: number
  appsGenerated: number
  successRate: number
  lastCall?: string
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}
