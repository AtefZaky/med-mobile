import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../../constants";

const operatorStack = () => {
	const { user } = useGlobalContext();

	if (user) {
		if (user.type === roles.maintenar) {
			<Redirect href="/Maintanacehome" />;
		} else if (user.type === roles.manager) {
			<Redirect href="/ManagerHome" />;
		} else if (user.type === roles.inventory) {
			<Redirect href="/InventoyUserHome" />;
		}
	} else {
		<Redirect href="/" />;
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
						name="DailyOperation"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="AddNotify"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Notify"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Notify/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="DailyOperationAsset/[id]"
						options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default operatorStack;
