import React from 'react';
import { ArrowRight, Shield, Clock, Users } from 'lucide-react';

interface HeroProps {
  onFindDoctors: () => void;
}

const Hero: React.FC<HeroProps> = ({ onFindDoctors }) => {
  const stats = [
    { icon: Users, label: 'Trusted Doctors', value: '500+' },
    { icon: Shield, label: 'Secure Platform', value: '100%' },
    { icon: Clock, label: 'Quick Booking', value: '24/7' }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="text-blue-600"> Our Priority</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Connect with certified doctors, book appointments instantly, and get personalized healthcare from the comfort of your home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onFindDoctors}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                Find a Doctor
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-200">
                Emergency Care
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm mb-3 inline-block">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Doctor consultation"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-full shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-500 text-white p-4 rounded-full shadow-lg">
              <Clock className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;