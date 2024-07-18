import { View, Text } from "react-native";
import React from "react";

export default function DailyPrecentageRow({ data }) {
	return (
		<View className="flex flex-row-reverse   gap-2 border-b border-[#E4E7EC] mb-[2px] min-h-[35px]  ">
			<View>
				<Text className="font-medium text-center w-[35px] text-base">
					{data.time}
				</Text>
			</View>
			<View>
				<Text className="font-medium text-center w-[70px] text-base">
					{data.suck}
				</Text>
			</View>
			<View>
				<Text className="font-medium text-center w-[70px] text-base">
					{data.direct}
				</Text>
			</View>
			<View>
				<Text className="font-medium text-center w-[70px] text-base">
					{data.kiloWaat}
				</Text>
			</View>
			<View>
				<Text className="font-medium text-center w-[70px] text-base">
					{data.airPressure}
				</Text>
			</View>
		</View>
	);
}
