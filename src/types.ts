export interface UserProfile {
  username: string;
  name: string;
  profession: string;
  bio: string;
  avatarUrl: string;
  pricePerSession: number;
  currency: string;
  slotDuration: number; // in minutes (e.g. 30, 45, 60)
  workingHours: {
    start: string; // "HH:MM"
    end: string; // "HH:MM"
  };
  workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarColor: string;
  totalBookings: number;
  totalSpent: number;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
  duration: number; // in minutes
  status: 'confirmed' | 'cancelled' | 'pending';
  notes?: string;
  createdAt: string;
  price: number;
}

export interface DailySlot {
  time: string; // "HH:MM"
  isAvailable: boolean;
  booking?: Booking;
}

