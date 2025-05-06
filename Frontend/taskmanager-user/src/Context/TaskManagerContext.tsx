import { createContext, useContext } from "react";

export interface AppContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    // Add more shared state here as needed
  }

export const TaskManagerContext = createContext<AppContextType | undefined>(undefined);

export const useTaskManagerContext = (): AppContextType => {
    const context = useContext(TaskManagerContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
      }
      return context;
}