import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { SplashScreen } from "expo-router";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  console.log("***********************************************")

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
