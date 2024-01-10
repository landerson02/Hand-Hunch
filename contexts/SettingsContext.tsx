import React, { createContext, useState } from "react";

type SettingsContextType = {
  bgColor: string;
  setBgColor: (value: string) => void;
  lockedIn: boolean;
  setLockedIn: (value: boolean) => void;
}

export const SettingsContext =
  createContext<SettingsContextType>({
    bgColor: 'bg-green-700',
    lockedIn: true,
    setBgColor: () => {},
    setLockedIn: () => {},
  } as SettingsContextType);

type settingsProviderProps = {
  children: React.ReactNode;
}

const SettingsProvider: React.FC<settingsProviderProps> = ({children}) => {
  const [bgColor, setBgColor] = useState<string>('bg-green-700');
  const [lockedIn, setLockedIn] = useState<boolean>(true);

  return (
    <SettingsContext.Provider value={{bgColor, setBgColor, lockedIn, setLockedIn}}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
