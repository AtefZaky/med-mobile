import { Redirect, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
	const { loading, isLogged, user } = useGlobalContext();
	const router = useRouter();
	useEffect(() => {
		if (isLogged) {
			if (user.type === 2) {
				router.replace("/home");
			  } else if (user.type === 3) {
				router.replace("/Maintanacehome");
			  };
		}
	}, [isLogged, router]);

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
