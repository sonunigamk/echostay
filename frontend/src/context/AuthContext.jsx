import { createContext } from "react";

export const AuthDataContext = createContext();

const AuthContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:3000";

  const value = {
    serverUrl,
  };

  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContextProvider;