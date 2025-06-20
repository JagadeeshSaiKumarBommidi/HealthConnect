import React from 'react';
import { Star, MapPin, Clock, MessageCircle, Calendar, Video } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
  onStartChat: (doctor: Doctor) => void;
  onViewProfile: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBookAppointment,
  onStartChat,
  onViewProfile
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {doctor.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                <span className="text-sm text-gray-500">({doctor.reviewCount})</span>
              </div>
              <div className="text-lg font-bold text-gray-900">${doctor.consultationFee}</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{doctor.experience} years experience</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Available today: {doctor.availableSlots[0]}, {doctor.availableSlots[1]}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {doctor.languages.map((language, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => onBookAppointment(doctor)}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
            >
              <Calendar className="w-4 h-4" />
              <span>Book</span>
            </button>
            <button
              onClick={() => onStartChat(doctor)}
              className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => onViewProfile(doctor)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;