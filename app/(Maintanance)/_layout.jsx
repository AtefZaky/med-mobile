import { Redirect, Stack, useRouter } from "expo-router";

import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { roles } from "../../constants";

const MaintanaceStack = () => {
	const { user } = useGlobalContext();

	if (user) {
		if (user.type === roles.operator) {
			<Redirect href="/home" />;
		} else if (user.type === roles.manager) {
			<Redirect href="/ManagerHome" />;
		} else if (user.type === roles.inventory) {
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
						name="Maintanacehome"
						options={{
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name="AddDailyExamination"
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
						name="maintanaceHelper"
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
						name="AddNotify"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="DailyExaminationList"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="DailyExamintationDetails/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Failures"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="AddFailure"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="FailureDetails/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="FixFailure/[id]"
						options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default MaintanaceStack;
