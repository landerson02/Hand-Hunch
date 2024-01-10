import React, { createContext, useState } from "react";
import { StatsObject } from "@/objects/stats";

type StatsContextType = {
  stats: StatsObject;
  setStats: (value: StatsObject) => void;
}

export const StatsContext =
  createContext<StatsContextType>({
    stats: new StatsObject(),
    setStats: () => {},
  } as StatsContextType);

type statsProviderProps = {
  children: React.ReactNode;
}

const StatsProvider: React.FC<statsProviderProps> = ({children}) => {
  const [stats, setStats] = useState<StatsObject>(new StatsObject());

  return (
    <StatsContext.Provider value={{stats, setStats}}>
      {children}
    </StatsContext.Provider>
  );
}

export default StatsProvider;
