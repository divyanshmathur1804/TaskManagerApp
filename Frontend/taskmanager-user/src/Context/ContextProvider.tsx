import { ReactNode, useEffect, useState } from "react";
import { TaskManagerContext, AppContextType } from "./TaskManagerContext";

interface AppProviderProps {
    children: ReactNode;
  }
  
 export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // Example auth check (can be replaced with API/token validation)
      const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  
      
  
      
    }, []);
    const contextValue: AppContextType = {
      isAuthenticated,
      setIsAuthenticated,
      loading,
      setLoading,
    };
    return (
        <TaskManagerContext.Provider value={contextValue}>
          {children}
        </TaskManagerContext.Provider>
      );
  }