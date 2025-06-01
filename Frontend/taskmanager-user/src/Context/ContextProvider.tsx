import { ReactNode, useEffect, useMemo, useState } from "react";
import { TaskManagerContext, AppContextType } from "./TaskManagerContext";
import { Loader } from "Components/Loader/Loader";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // Start as true

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setLoading(false);
  }, []);

  // 🧠 Memoize the context to prevent unnecessary re-renders
  const contextValue: AppContextType = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  }), [isAuthenticated, loading]);

  // ⏳ Show loader while initial auth check is happening
  if (loading) return <Loader />;

  return (
    <TaskManagerContext.Provider value={contextValue}>
      {children}
    </TaskManagerContext.Provider>
  );
};
