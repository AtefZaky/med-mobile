import { Redirect, Stack } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../../constants";

const InventoryUserStack = () => {
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
		<Redirect href="/" />;
	}

	return (
		<>
			<SafeAreaView className="bg-white h-full">
				<Stack>
					<Stack.Screen
						name="Inventory"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="InventoyUserHome"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default InventoryUserStack;
