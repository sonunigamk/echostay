import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./AuthContext";
import axios from "axios";

export const UserDataContext = createContext();

const UserContextProvider = ({ children }) => {
  const { serverUrl } = useContext(AuthDataContext);
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching current user:", error.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { userData, setUserData };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContextProvider;