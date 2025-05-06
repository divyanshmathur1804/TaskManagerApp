import { ReactNode, useState } from "react";
import { TaskManagerContext } from "./TaskManagerContext";

interface AppProviderProps {
    children: ReactNode;
  }

 export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    return (
        <TaskManagerContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          {children}
        </TaskManagerContext.Provider>
      );
  }