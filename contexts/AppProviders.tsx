import React from "react";
import AuthProvider from "@/contexts/AuthContext";
import SettingsProvider from "@/contexts/SettingsContext";
import UserProvider from "@/contexts/userContext";
import StatsProvider from "@/contexts/StatsContext";


type AppProvidersProps = {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({children}) => {

  return (
    <UserProvider>
      <AuthProvider>
        <StatsProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </StatsProvider>
      </AuthProvider>
    </UserProvider>
  )
}


export default AppProviders;