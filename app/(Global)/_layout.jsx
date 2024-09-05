import { Stack } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

const GlobalStack = () => {
	return (
		<>
			<SafeAreaView className="bg-white h-full">
				<Stack>
					<Stack.Screen
						name="Schedule"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="AddSchedule"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Schedule/[id]"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="FinishSchedule/[id]"
						options={{ headerShown: false }}
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
						name="Assesment"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="AssesmentDetails/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Assesment/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="ScheduleData/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="ScheduleSpareParts/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="AddScheduleImage/[id]"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="ScheduleData/ScheduleGallery/[id]"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="ScheduleData/ScheduleGallery/Image_description/[id]"
						options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaView>
		</>
	);
};

export default GlobalStack;
