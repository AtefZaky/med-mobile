import { Redirect, Stack } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../../constants";

const AuthLayout = () => {
	const { loading, isLogged, user } = useGlobalContext();
	if (user.type === roles.operator) {
		<Redirect href="/home" />;
	} else if (user.type === roles.maintenar) {
		<Redirect href="/Maintanacehome" />;
	} else if (user.type === roles.manager) {
		<Redirect href="/MangerHome" />;
	}

	return (
		<>
			<SafeAreaView className="bg-white h-full">
				<Stack>
					<Stack.Screen
						name="home"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="assetsOperations"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="dailyPercentage"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="dailyOperationsInfo"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="reportFailure"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default AuthLayout;
