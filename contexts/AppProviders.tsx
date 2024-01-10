import React from "react";
import AuthProvider from "@/contexts/AuthContext";
import SettingsProvider from "@/contexts/SettingsContext";
import UserProvider from "@/contexts/userContext";


type AppProvidersProps = {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({children}) => {

  return (
    <UserProvider>
      <AuthProvider>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </AuthProvider>
    </UserProvider>
  )
}


export default AppProviders;