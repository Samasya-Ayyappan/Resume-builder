"use client";

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updatePersonalInfo } from '@/lib/store/slices/resumeSlice';
import { Input } from '@/components/ui/Input';
import { isValidEmail } from '@/lib/utils/validation';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export const PersonalInfoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.resume.personalInfo);

  const emailError = info.email && !isValidEmail(info.email) ? 'Please enter a valid email address' : undefined;

  const handleChange = (field: keyof typeof info, value: string) => {
    dispatch(updatePersonalInfo({ [field]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="e.g. Jordan Taylor"
          required
          leftIcon={<User className="w-4 h-4" />}
          value={info.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
        />
        <Input
          label="Target Role / Headline"
          placeholder="e.g. Full Stack Engineer"
          required
          leftIcon={<Briefcase className="w-4 h-4" />}
          value={info.jobTitle}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="jordan.taylor@example.com"
          required
          leftIcon={<Mail className="w-4 h-4" />}
          value={info.email}
          error={emailError}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 019-2834"
          leftIcon={<Phone className="w-4 h-4" />}
          value={info.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <Input
        label="Location (City, State / Country)"
        placeholder="San Francisco, CA"
        leftIcon={<MapPin className="w-4 h-4" />}
        value={info.location}
        onChange={(e) => handleChange('location', e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <Input
          label="LinkedIn Profile"
          placeholder="linkedin.com/in/username"
          leftIcon={<Link2 className="w-4 h-4" />}
          value={info.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
        />
        <Input
          label="GitHub Profile"
          placeholder="github.com/username"
          leftIcon={<Link2 className="w-4 h-4" />}
          value={info.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
        />
        <Input
          label="Personal Portfolio / Website"
          placeholder="jordantaylor.dev"
          leftIcon={<Globe className="w-4 h-4" />}
          value={info.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>
    </div>
  );
};
