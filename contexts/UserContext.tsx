import { createContext, useState, ReactNode, FC } from "react";
import {StatsObject} from "@/objects/stats";

type userContext_t = {
  isLoggedIn: boolean,
  username: string,
  password: string,
  userStats: StatsObject,
  setIsLoggedIn: (isLoggedIn: boolean) => void,
  setUsername: (username: string) => void,
  setPassword: (password: string) => void,
  setUserStats: (stats: StatsObject) => void,
}

export const UserContext =
  createContext<userContext_t>({
    isLoggedIn: false,
    username: '',
    password: '',
    userStats: new StatsObject(),
    setIsLoggedIn: () => {},
    setUsername: () => {},
    setPassword: () => {},
    setUserStats: () => {},
  } as userContext_t);

type userProviderProps = {
  children: ReactNode;
}

const UserProvider: FC<userProviderProps> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userStats, setUserStats] = useState<StatsObject>(new StatsObject());

  return (
    <UserContext.Provider
      value={{isLoggedIn, setIsLoggedIn, username, setUsername, password, setPassword, userStats, setUserStats}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

