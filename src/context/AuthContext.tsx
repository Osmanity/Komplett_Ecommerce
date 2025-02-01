import { createContext, useContext, useState, ReactNode } from "react";

interface UserDetails {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phoneNumber: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [userDetails, setUserDetails] = useState<UserDetails | null>(() => {
    const savedDetails = localStorage.getItem("userDetails");
    return savedDetails ? JSON.parse(savedDetails) : null;
  });

  const isAuthenticated = !!token;

  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
      setUserDetails(null);
    }
  };

  const handleSetUserDetails = (details: UserDetails | null) => {
    setUserDetails(details);
    if (details) {
      localStorage.setItem("userDetails", JSON.stringify(details));
    } else {
      localStorage.removeItem("userDetails");
    }
  };

  const logout = () => {
    handleSetToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        isAuthenticated,
        logout,
        userDetails,
        setUserDetails: handleSetUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
