import React, { createContext, useContext, useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  updateProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const clearProfile = () => {
    setProfile(null);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}; 