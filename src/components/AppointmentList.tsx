import React from 'react';
import { Calendar, Clock, Video, MessageCircle, MapPin, MoreVertical } from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentListProps {
  appointments: Appointment[];
  onReschedule: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onJoinCall: (appointment: Appointment) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({
  appointments,
  onReschedule,
  onCancel,
  onJoinCall
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'chat':
        return MessageCircle;
      case 'in-person':
        return MapPin;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
        <p className="text-gray-600">Your upcoming appointments will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const TypeIcon = getTypeIcon(appointment.type);
        
        return (
          <div
            key={appointment.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <TypeIcon className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {appointment.doctorName}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{appointment.time}</span>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {appointment.status === 'upcoming' && (
                  <>
                    {appointment.type === 'video' && (
                      <button
                        onClick={() => onJoinCall(appointment)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Join Call
                      </button>
                    )}
                    <button
                      onClick={() => onReschedule(appointment)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Reschedule
                    </button>
                  </>
                )}
                
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentList;