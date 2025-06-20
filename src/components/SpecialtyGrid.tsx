import React from 'react';
import { Heart, Sparkles, Brain, Bone, Baby, Eye, ArrowRight } from 'lucide-react';
import { specialties } from '../data/mockData';

interface SpecialtyGridProps {
  onSpecialtySelect: (specialty: string) => void;
}

const iconMap = {
  Heart,
  Sparkles,
  Brain,
  Bone,
  Baby,
  Eye
};

const SpecialtyGrid: React.FC<SpecialtyGridProps> = ({ onSpecialtySelect }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse by Specialty
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the right doctor for your specific health needs from our comprehensive list of medical specialties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty) => {
            const IconComponent = iconMap[specialty.icon as keyof typeof iconMap];
            
            return (
              <div
                key={specialty.id}
                onClick={() => onSpecialtySelect(specialty.name)}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {specialty.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {specialty.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {specialty.doctorCount} doctors available
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpecialtyGrid;