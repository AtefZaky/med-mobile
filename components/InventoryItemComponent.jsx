import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function InventoryItemComponent({ data, handlePress }) {
	return (
		<TouchableOpacity
			onPress={() => {
				handlePress(data.ItemID, data.ItemName);
			}}
			className="flex flex-row-reverse justify-center items-center px-4 py-4 border-b border border-[#E4E7EC]">
			<View className="flex-1">
				<Text className=" text-center font-tmedium text-base">
					{" "}
					{data.ItemCode}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" text-center font-tmedium  text-base">
					{" "}
					{data.ItemName}
				</Text>
			</View>
			<View className="flex-1">
				<Text className=" text-center font-tmedium  text-base">
					{" "}
					{data.Balance || 0}
				</Text>
			</View>
		</TouchableOpacity>
	);
}
