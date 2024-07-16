import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  console.log("***********************************************")

  // useEffect(() => {
  //   // Example: Simulate a fetch call to check if user is already logged in
  //   const checkLoginStatus = async () => {
  //     try {
  //       // Assume fetchCurrentUser is a function that fetches the current user
  //       const username = await SecureStore.getItemAsync('username');
  //       const lastActive = await SecureStore.getItemAsync('lastActive');
  //       if (username, lastActive) {
  //         setUser({username: username, lastActive: lastActive});
  //         setIsLogged(true);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch current user:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        setLoading,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
