import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API functions
export const apiClient = {
  // Calls
  getCalls: async (userId: string) => {
    const response = await api.get(`/api/calls?userId=${userId}`)
    return response.data
  },
  
  getCall: async (id: string) => {
    const response = await api.get(`/api/calls/${id}`)
    return response.data
  },

  // Apps
  getApps: async (userId: string) => {
    const response = await api.get(`/api/apps?userId=${userId}`)
    return response.data
  },

  getApp: async (id: string) => {
    const response = await api.get(`/api/apps/${id}`)
    return response.data
  },

  // Stats
  getStats: async (userId: string) => {
    const response = await api.get(`/api/stats?userId=${userId}`)
    return response.data
  },
}
