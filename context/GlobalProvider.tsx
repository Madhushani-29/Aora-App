import { getCurrentUser } from "@/lib/appwrite";
import { GlobalProviderProps } from "@/types/component-prop-types";
import { GlobalContextType, UserType } from "@/types/Types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res as UserType);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
