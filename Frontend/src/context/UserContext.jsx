import React, { createContext, useContext, useState } from "react";
import { useMediaQuery } from 'react-responsive';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Abhishek",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  });


  const isDesktop = useMediaQuery({ minWidth: 1000 });

  // updateUser is a convenience wrapper used across the app
  const updateUser = (patch) => setUser((prev) => ({ ...prev, ...patch }));

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, isDesktop }}>
      {children}
    </UserContext.Provider>
  );
};
