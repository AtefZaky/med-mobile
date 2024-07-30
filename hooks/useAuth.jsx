import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const useAuth = () => {
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

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
				if (credentials) {
					setIsAuthenticated(true);
					setUser({
						username: username,
						lastActive: lastActive,
						UserTypeID: UserTypeID,
						UserDepartmentID: UserDepartmentID,
					});
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
				setIsAuthenticated(false);
			}
			setLoading(false);
		};

		checkAuth();
	}, []);

	return { loading, isAuthenticated, user };
};

export default useAuth;
