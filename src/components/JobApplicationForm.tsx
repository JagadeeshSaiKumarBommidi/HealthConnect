import React, { useState } from 'react';
import { User as UserIcon, Mail, Phone, Briefcase, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import { User } from '../types/auth';

interface JobApplicationFormProps {
  user: User;
  onLogout: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  employmentStatus: string;
  currentCompany: string;
  skills: string[];
  declaration: boolean;
}

interface FormErrors {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  employmentStatus: string;
  currentCompany: string;
  skills: string;
  declaration: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ user, onLogout }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: user.name || '',
    email: user.email || '',
    phone: '',
    experience: '',
    employmentStatus: '',
    currentCompany: '',
    skills: [],
    declaration: false
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    employmentStatus: '',
    currentCompany: '',
    skills: '',
    declaration: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const skillsList = ['React', 'Python', 'Java', 'SQL', 'AWS'];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: '',
      email: '',
      phone: '',
      experience: '',
      employmentStatus: '',
      currentCompany: '',
      skills: '',
      declaration: ''
    };

    // Validate Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate Phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Validate Experience
    if (!formData.experience.trim()) {
      newErrors.experience = 'Years of experience is required';
    } else if (parseInt(formData.experience) < 0) {
      newErrors.experience = 'Experience cannot be negative';
    }

    // Validate Employment Status
    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Please select your employment status';
    }

    // Validate Current Company (if employed)
    if (formData.employmentStatus === 'yes' && !formData.currentCompany.trim()) {
      newErrors.currentCompany = 'Current company name is required';
    }

    // Validate Skills
    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }

    // Validate Declaration
    if (!formData.declaration) {
      newErrors.declaration = 'You must confirm the declaration';
    }

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every(error => error === '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'skills') {
      const skill = value;
      setFormData(prev => ({
        ...prev,
        skills: checked 
          ? [...prev.skills, skill]
          : prev.skills.filter(s => s !== skill)
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form Data:', JSON.stringify(formData, null, 2));
      setIsSubmitted(true);
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: user.name || '',
          email: user.email || '',
          phone: '',
          experience: '',
          employmentStatus: '',
          currentCompany: '',
          skills: [],
          declaration: false
        });
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-4">Thank you for your application. We'll review it and get back to you soon.</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with User Info and Logout */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div>
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">Job Application Form</h1>
                  <p className="text-blue-100 flex items-center gap-2">
                    Welcome back, {user.name}!
                    {user.provider === 'google' && (
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Google</span>
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  Personal Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="1234567890"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Professional Information
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Employment Status *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="yes"
                        checked={formData.employmentStatus === 'yes'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Currently Employed</span>
                    </label>
                    <label className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="employmentStatus"
                        value="no"
                        checked={formData.employmentStatus === 'no'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Not Currently Employed</span>
                    </label>
                  </div>
                  {errors.employmentStatus && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.employmentStatus}
                    </p>
                  )}
                </div>
              </div>

              {/* Conditional Current Company Field */}
              {formData.employmentStatus === 'yes' && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <label htmlFor="currentCompany" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Company Name *
                  </label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.currentCompany ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your current company name"
                  />
                  {errors.currentCompany && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.currentCompany}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800">Skills *</h2>
                <p className="text-sm text-gray-600 mt-1">Select all that apply</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skillsList.map((skill) => (
                  <label
                    key={skill}
                    className="flex items-center cursor-pointer p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
                  >
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2 text-gray-700 font-medium">{skill}</span>
                  </label>
                ))}
              </div>
              {errors.skills && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.skills}
                </p>
              )}
            </div>

            {/* Declaration Section */}
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h2 className="text-xl font-semibold text-gray-800">Declaration</h2>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded mt-0.5 mr-3"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    I confirm that the above information is true and accurate to the best of my knowledge.
                    I understand that any false information may result in the rejection of my application.
                  </span>
                </label>
                {errors.declaration && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.declaration}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;