import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const username = JSON.parse(await SecureStore.getItemAsync("username"));
				const lastActive = JSON.parse(
					await SecureStore.getItemAsync("lastActive")
				);
				const UserTypeID = JSON.parse(
					await SecureStore.getItemAsync("UserTypeID")
				);
				const UserDepartmentID = JSON.parse(
					await SecureStore.getItemAsync("UserDepartmentID")
				);
				const UserDepartmentName = JSON.parse(
					await SecureStore.getItemAsync("UserDepartmentName")
				);
				if (username) {
					setIsLogged(true);
					setUser({
						username: username,
						lastActive: lastActive,
						type: UserTypeID,
						UserDepartmentID: UserDepartmentID,
						UserDepartmentName:UserDepartmentName
					});
					console.log(username)
				} else {
					setIsLogged(false);
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
				setIsLogged(false);
			}
			setLoading(false);
		};

		checkAuth();
	}, []);

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
