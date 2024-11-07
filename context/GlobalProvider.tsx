import { getCurrentUser } from "@/lib/appwrite";
import { GlobalProviderProps } from "@/types/component-prop-types";
import { GlobalContextType, UserType } from "@/types/Types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// create the context that holds states
// that can access from anywhere of application
// it hold globalcontecttype data or undefined
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// custom hook that can use to access the contect states
// it uses useContect to get values instead of Consumer
export const useGlobalContext = () => useContext(GlobalContext);

// GlobalProvider component is a context provider that manages the global state
// get components as children which cunsume these contexts
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // when loading get the values and set to states
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

  // provide states with provider
  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
