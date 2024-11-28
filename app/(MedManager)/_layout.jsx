import { Redirect, Stack } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../../constants";

const MedManager = () => {
	const { user } = useGlobalContext();

	if (user) {
		if (user.type === roles.operator) {
			<Redirect href="/home" />;
		} else if (user.type === roles.maintenar) {
			<Redirect href="/Maintanacehome" />;
		}
		if (user.type === roles.inventory) {
			<Redirect href="/InventoyUserHome" />;
		}
		if (user.type === roles.manager) {
			<Redirect href="/ManagerHome" />;
		}
	} else {
		<Redirect href="/" />;
	}

	return (
		<>
			<SafeAreaView className="bg-white h-full">
				<Stack>
					<Stack.Screen
						name="MedManagerHome"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="MedExpenses"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="MedActualSatae"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="MedMangernotifcation"
						options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default MedManager;
