import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCurrentUser } from "@/lib/appwrite";

type User = { [key: string]: any } | null;

const defaultValues = {
  isLoggedIn: false,
  user: null as User,
  isLoading: true,
  setIsLoggedIn: (loggedIn: boolean) => {},
  setUser: (user: any) => {},
};

const GlobalContext = createContext(defaultValues);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultValues.isLoggedIn);
  const [user, setUser] = useState<User>(defaultValues.user);
  const [isLoading, setIsLoading] = useState(defaultValues.isLoading);

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();

        if (user) {
          setIsLoggedIn(true);
          setUser(user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoggedIn,
        setUser,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
