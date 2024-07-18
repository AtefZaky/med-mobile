import { Redirect, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
	const { loading, isLogged } = useGlobalContext();
	const router = useRouter();
	useEffect(() => {
		if (isLogged) {
			return <Redirect href="/home" />;
		}
	}, [isLogged, router]);

	return (
		<>
			<SafeAreaView className="bg-white h-full">
				<Stack>
					<Stack.Screen
						name="Maintanacehome"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="chatbot"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="dailyExamination"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="failureDetails/[Id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="maintanaceHelper"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="reports"
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
