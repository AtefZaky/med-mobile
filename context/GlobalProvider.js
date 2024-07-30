import React, { createContext, useContext, useState } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	return (
		<GlobalContext.Provider
			value={{
				isLogged,
				setIsLogged,
				setLoading,
				user,
				setUser,
				loading,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
