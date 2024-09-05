import { View, Text } from "react-native";
import React from "react";

const ErrorMassege = ({ err }) => {
	return (
		<View className="flex  items-center mt-4 h-[90vh]">
			<Text className="font-tbold text-center text-lg">
				{err ? err : "لا توجد بينات"}
			</Text>
		</View>
	);
};

export default ErrorMassege;
