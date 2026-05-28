// types.ts

export type TimeString = string // "HH:MM"
export type DateString = string // "YYYY-MM-DD"

export type BookingStatus =
  | 'confirmed'
  | 'cancelled'
  | 'pending'

export interface WorkingHours {
  start: TimeString
  end: TimeString
}

export interface UserProfile {
  username: string
  name: string
  profession: string
  bio: string
  avatarUrl: string

  pricePerSession: number
  currency: string

  slotDuration: number // minutes

  workingHours: WorkingHours
  workingDays: number[]
}

export interface Client {
  id: string
  name: string
  email: string

  phone?: string

  avatarColor: string

  totalBookings: number
  totalSpent: number
}

export interface Booking {
  id: string

  clientId: string
  clientName: string
  clientEmail: string
  clientPhone?: string

  date: DateString
  time: TimeString

  duration: number
  status: BookingStatus

  notes?: string

  createdAt: string
  price: number
}

export interface DailySlot {
  time: TimeString
  isAvailable: boolean
  booking?: Booking
}