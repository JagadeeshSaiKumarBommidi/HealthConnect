export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  qualifications: string[];
  languages: string[];
  consultationFee: number;
  availableSlots: string[];
  bio: string;
  isOnline: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'video' | 'chat' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'doctor' | 'patient';
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
  doctorCount: number;
}