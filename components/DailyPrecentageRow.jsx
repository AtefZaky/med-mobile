import { View, Text } from "react-native";
import React from "react";

export default function DailyPrecentageRow({ data}) {
	return (
		<View className="flex flex-row-reverse border-b border-[#E4E7EC] mb-[2px] min-h-[35px] px-4 py-2 ">
			<View className="flex flex-1">
				<Text className= { `font-tmedium text-dark text-center text-base `}>
					{data.time}
				</Text>
			</View>
			<View className="flex flex-1">
				<Text className="font-tmedium text-dark text-center text-base">
					{data.suck}
				</Text>
			</View>
			<View className="flex flex-1">
				<Text className=" font-tmedium text-dark text-center text-base">
					{data.direct}
				</Text>
			</View >
			<View className="flex flex-1">
				<Text className="font-tmedium text-dark text-center text-base">
					{data.kiloWaat}
				</Text>
			</View>
			<View className="flex flex-1">
				<Text className="font-tmedium text-dark text-center text-base">
					{data.airPressure}
				</Text>
			</View>
		</View>
	);
}
