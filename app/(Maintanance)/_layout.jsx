import { Redirect, Stack, useRouter } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../../constants";

const AuthLayout = () => {
	const { user } = useGlobalContext();

	if (user) {
		if (user.type === roles.operator) {
			<Redirect href="/home" />;
		} else if (user.type === roles.maintenar) {
			<Redirect href="/Maintanacehome" />;
		} else if (user.type === roles.manager) {
			<Redirect href="/ManagerHome" />;
		}
	} else {
		console.log('redirected');
		<Redirect href="/" />;
	}

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
						name="InventoyItems"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="itemDetails/[id]"
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
					<Stack.Screen
						name="MaintenanceReportFailure"
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
