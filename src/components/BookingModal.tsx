import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MessageCircle, MapPin } from 'lucide-react';
import { Doctor } from '../types';

interface BookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBooking: (booking: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onBooking
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'chat' | 'in-person'>('video');
  const [notes, setNotes] = useState('');

  if (!isOpen || !doctor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const booking = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: selectedDate,
      time: selectedTime,
      type: consultationType,
      notes: notes || undefined,
      status: 'upcoming' as const
    };

    onBooking(booking);
    onClose();
    
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setConsultationType('video');
    setNotes('');
  };

  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-blue-600 text-sm">{doctor.specialization}</p>
              <p className="text-gray-600 text-sm">${doctor.consultationFee} consultation fee</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Consultation Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'video' as const, icon: Video, label: 'Video Call' },
                { type: 'chat' as const, icon: MessageCircle, label: 'Chat' },
                { type: 'in-person' as const, icon: MapPin, label: 'In-Person' }
              ].map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setConsultationType(option.type)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    consultationType === option.type
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <option.icon className="w-5 h-5 mx-auto mb-1" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              min={today}
              max={nextWeek}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-2 gap-2">
              {doctor.availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedTime === slot
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-1" />
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe your symptoms or concerns..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedDate || !selectedTime}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;