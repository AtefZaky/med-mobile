import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Define your API base URL
// const API_BASE_URL = "http://192.168.1.24:5000/api";

const API_BASE_URL = "http://isis-eg.com:8501/api";

// Create an Axios instance
const api = axios.create({
	baseURL: API_BASE_URL,
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
	async (config) => {
		try {
			const accessToken = await SecureStore.getItemAsync("accessToken");
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
		} catch (error) {
			console.error("Error getting access token:", error);
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		console.log(error);
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				// Get the refresh token from SecureStore
				const refreshToken = await SecureStore.getItemAsync("refreshToken");

				// Request a new access token using the refresh token
				const response = await axios.post(`${API_BASE_URL}/auth/token`, {
					refreshToken,
				});

				const { accessToken } = response.data;

				// Save the new access token to SecureStore
				await SecureStore.setItemAsync("accessToken", accessToken);

				// Update the authorization header and retry the original request
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return api(originalRequest);
			} catch (error) {
				console.error("Error refreshing access token:", error);
				await logOut()
			}
		}
		return Promise.reject(error);
	}
);

const saveTokens = async (
	accessToken,
	refreshToken,
	username,
	lastActive,
	UserTypeID,
	UserDepartmentID,
	UserDepartmentName
) => {
	await SecureStore.setItemAsync("accessToken", accessToken);
	await SecureStore.setItemAsync("refreshToken", refreshToken);
	await SecureStore.setItemAsync("username", JSON.stringify(username));
	await SecureStore.setItemAsync("lastActive", JSON.stringify(lastActive));
	await SecureStore.setItemAsync("UserTypeID", JSON.stringify(UserTypeID));
	await SecureStore.setItemAsync(
		"UserDepartmentName",
		JSON.stringify(UserDepartmentName)
	);
	await SecureStore.setItemAsync(
		"UserDepartmentID",
		JSON.stringify(UserDepartmentID)
	);
};

// Usage in your login function

export const login = async (email, password) => {
	try {
		const response = await api.post(`/auth/signin`, {
			emailOrUsername: email,
			password,
		});

		const { accessToken, refreshToken, user, success } = response.data;
		const {
			username,
			lastActive,
			UserTypeID,
			UserDepartmentID,
			UserDepartmentName,
		} = user;

		if (success) {
			await saveTokens(
				accessToken,
				refreshToken,
				username,
				lastActive,
				UserTypeID,
				UserDepartmentID,
				UserDepartmentName
			);

			return {
				accessToken,
				refreshToken,
				username,
				lastActive,
				UserTypeID,
				UserDepartmentID,
				UserDepartmentName,
			};
		} else {
			console.error("Login failed:", response.data);
			throw new Error("Login failed");
		}
	} catch (error) {
		console.error("Login error:", error.message);
		throw error;
	}
};

export const logOut = async () => {
	try {
		await SecureStore.deleteItemAsync("accessToken");
		await SecureStore.deleteItemAsync("refreshToken");
		await SecureStore.deleteItemAsync("username");
		await SecureStore.deleteItemAsync("lastActive");
		await SecureStore.deleteItemAsync("UserTypeID");
		await SecureStore.deleteItemAsync("UserDepartmentID");
	} catch (error) {
		throw error;
	}
};

export default api;
