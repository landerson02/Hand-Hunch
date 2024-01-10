import React, { createContext } from 'react';

type AuthContextType = {
  isSignInOpen: boolean;
  setIsSignInOpen: (value: boolean) => void;
  isSignUpOpen: boolean;
  setIsSignUpOpen: (value: boolean) => void;
};

export const AuthContext =
  createContext<AuthContextType>({
    isSignInOpen: false,
    isSignUpOpen: false,
    setIsSignInOpen: () => {},
    setIsSignUpOpen: () => {},
    } as AuthContextType);


type authProviderProps = {
  children: React.ReactNode;
}

const AuthProvider: React.FC<authProviderProps> = ({children}) => {
  const [isSignInOpen, setIsSignInOpen] = React.useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{isSignInOpen, setIsSignInOpen, isSignUpOpen, setIsSignUpOpen}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
