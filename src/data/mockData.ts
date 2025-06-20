import { Doctor, Specialty } from '../types';

export const specialties: Specialty[] = [
  {
    id: '1',
    name: 'Cardiology',
    icon: 'Heart',
    description: 'Heart and cardiovascular system specialists',
    doctorCount: 24
  },
  {
    id: '2',
    name: 'Dermatology',
    icon: 'Sparkles',
    description: 'Skin, hair, and nail condition experts',
    doctorCount: 18
  },
  {
    id: '3',
    name: 'Neurology',
    icon: 'Brain',
    description: 'Brain and nervous system specialists',
    doctorCount: 15
  },
  {
    id: '4',
    name: 'Orthopedics',
    icon: 'Bone',
    description: 'Bone, joint, and muscle specialists',
    doctorCount: 22
  },
  {
    id: '5',
    name: 'Pediatrics',
    icon: 'Baby',
    description: 'Children\'s health and development',
    doctorCount: 19
  },
  {
    id: '6',
    name: 'Ophthalmology',
    icon: 'Eye',
    description: 'Eye and vision care specialists',
    doctorCount: 12
  }
];

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    experience: 12,
    rating: 4.9,
    reviewCount: 156,
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200',
    qualifications: ['MD', 'FACC', 'Board Certified'],
    languages: ['English', 'Spanish'],
    consultationFee: 150,
    availableSlots: ['09:00', '10:30', '14:00', '15:30'],
    bio: 'Dr. Johnson is a leading cardiologist with over 12 years of experience in treating heart conditions. She specializes in preventive cardiology and has published numerous research papers.',
    isOnline: true
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    experience: 15,
    rating: 4.8,
    reviewCount: 203,
    avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200',
    qualifications: ['MD', 'PhD', 'Board Certified'],
    languages: ['English', 'Mandarin'],
    consultationFee: 180,
    availableSlots: ['08:30', '11:00', '13:30', '16:00'],
    bio: 'Dr. Chen is a renowned neurologist specializing in movement disorders and stroke treatment. He has been recognized for his innovative treatment approaches.',
    isOnline: false
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatology',
    experience: 8,
    rating: 4.7,
    reviewCount: 98,
    avatar: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=200',
    qualifications: ['MD', 'Board Certified', 'Dermatopathology'],
    languages: ['English', 'Spanish', 'Portuguese'],
    consultationFee: 120,
    availableSlots: ['09:30', '12:00', '14:30', '17:00'],
    bio: 'Dr. Rodriguez specializes in medical and cosmetic dermatology with a focus on skin cancer prevention and treatment.',
    isOnline: true
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    experience: 18,
    rating: 4.9,
    reviewCount: 287,
    avatar: 'https://images.pexels.com/photos/5452207/pexels-photo-5452207.jpeg?auto=compress&cs=tinysrgb&w=200',
    qualifications: ['MD', 'Fellowship Sports Medicine', 'Board Certified'],
    languages: ['English'],
    consultationFee: 200,
    availableSlots: ['08:00', '10:00', '13:00', '15:00'],
    bio: 'Dr. Wilson is an experienced orthopedic surgeon specializing in sports medicine and joint replacement surgery.',
    isOnline: true
  }
];