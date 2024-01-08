import { createContext } from "react";

type SettingsContextType = {
  bgColor: string;
  setBgColor: (value: string) => void;
  lockedIn: boolean;
  setLockedIn: (value: boolean) => void;
}

export const SettingsContext =
  createContext<SettingsContextType | undefined>(undefined);