import {AuthContext} from "@/contexts/AuthContext";
import React from "react";
import {SettingsContext} from "@/contexts/SettingsContext";


type AppProvidersProps = {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({children}) => {
  const [isSignInOpen, setIsSignInOpen] = React.useState<boolean>(true);
  const [isUserSignedIn, setIsUserSignedIn] = React.useState<boolean>(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState<boolean>(false);
  const [bgColor, setBgColor] = React.useState<string>('bg-green-700');
  const [lockedIn, setLockedIn] = React.useState<boolean>(true);

  return (
    <SettingsContext.Provider value={{bgColor, setBgColor, lockedIn, setLockedIn}}>
      <AuthContext.Provider value={{isSignInOpen, setIsSignInOpen, isUserSignedIn, setIsUserSignedIn, isSignUpOpen, setIsSignUpOpen}}>
        {children}
      </AuthContext.Provider>
    </SettingsContext.Provider>
  )
}


export default AppProviders;