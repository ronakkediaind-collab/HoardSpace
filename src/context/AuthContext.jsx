import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("hoardspace-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Mock authentication - in real app, this would call an API
    const mockUser = {
      id: Date.now(),
      email,
      name: email.split("@")[0],
      role, // 'vendor' or 'agency'
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem("hoardspace-user", JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = (userData) => {
    // Mock signup
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem("hoardspace-user", JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hoardspace-user");
  };

  const isAuthenticated = !!user;
  const isVendor = user?.role === "vendor";
  const isAgency = user?.role === "agency";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isVendor,
        isAgency,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
