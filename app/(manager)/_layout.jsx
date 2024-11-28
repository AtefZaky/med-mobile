import { Redirect, Stack } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../../constants";

const MangerStack = () => {
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
		if (user.type === roles.medManager) {
			<Redirect href="/MedManagerHome" />;
		}
	} else {
		<Redirect href="/" />;
	}

	return (
		<>
			<SafeAreaView className="bg-white h-full">
				<Stack>
					<Stack.Screen
						name="addElectricityBills"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="addElectricityCutOut"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="electricityCutOut"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="electricityBills"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="electricityBillsDetails/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="electricityCutOutDetails/[id]"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="ManagerHome"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="notifcation"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="Expenses"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="AddExpenses"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Expenses/[id]"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default MangerStack;
