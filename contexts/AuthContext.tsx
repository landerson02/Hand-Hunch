import React from 'react';

type AuthContextType = {
  isSignInOpen: boolean;
  setIsSignInOpen: (value: boolean) => void;
  isSignUpOpen: boolean;
  setIsSignUpOpen: (value: boolean) => void;
  isUserSignedIn: boolean;
  setIsUserSignedIn: (value: boolean) => void;
};

export const AuthContext =
  React.createContext<AuthContextType | undefined>(undefined);