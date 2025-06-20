import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SpecialtyGrid from './components/SpecialtyGrid';
import DoctorCard from './components/DoctorCard';
import BookingModal from './components/BookingModal';
import ChatInterface from './components/ChatInterface';
import AppointmentList from './components/AppointmentList';
import { Doctor, Appointment } from './types';
import { doctors } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [chatDoctor, setChatDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSpecialtySelect = (specialty: string) => {
    const filtered = doctors.filter(doctor => doctor.specialization === specialty);
    setFilteredDoctors(filtered);
    setCurrentView('doctors');
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleStartChat = (doctor: Doctor) => {
    setChatDoctor(doctor);
    setCurrentView('chat');
  };

  const handleBookingSubmit = (booking: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...booking,
      id: Date.now().toString()
    };
    setAppointments([...appointments, newAppointment]);
    setIsBookingModalOpen(false);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view === 'doctors') {
      setFilteredDoctors(doctors);
    }
    if (view !== 'chat') {
      setChatDoctor(null);
    }
  };

  const renderCurrentView = () => {
    if (currentView === 'chat' && chatDoctor) {
      return (
        <ChatInterface
          doctor={chatDoctor}
          onBack={() => setCurrentView('doctors')}
        />
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentView={currentView} onViewChange={handleViewChange} />
        
        {currentView === 'home' && (
          <>
            <Hero onFindDoctors={() => setCurrentView('doctors')} />
            <SpecialtyGrid onSpecialtySelect={handleSpecialtySelect} />
          </>
        )}

        {currentView === 'doctors' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Doctor</h1>
              <p className="text-gray-600">Browse our network of qualified healthcare professionals</p>
            </div>
            
            <div className="grid gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookAppointment={handleBookAppointment}
                  onStartChat={handleStartChat}
                  onViewProfile={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'appointments' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">My Appointments</h1>
              <p className="text-gray-600">Manage your upcoming and past appointments</p>
            </div>
            
            <AppointmentList
              appointments={appointments}
              onReschedule={() => {}}
              onCancel={() => {}}
              onJoinCall={() => {}}
            />
          </div>
        )}

        {currentView === 'messages' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
              <p className="text-gray-600">Your conversations with doctors will appear here</p>
            </div>
          </div>
        )}

        <BookingModal
          doctor={selectedDoctor}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBooking={handleBookingSubmit}
        />
      </div>
    );
  };

  return renderCurrentView();
}

export default App;