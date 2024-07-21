import { View, Text } from "react-native";
import React from "react";

export default function ItemDetailsComponent({ data }) {
	console.log(data, "item");
	const { DepartmentName, Phone, BalanceQty } = data;
	return (
		<View className="flex flex-row-reverse ">
			<Text className="flex-1 font-tmedium text-center leading-6">
				{DepartmentName}
			</Text>

			<Text className="flex-1 font-tmedium text-center">{BalanceQty}</Text>

			<Text className="flex-1 font-tmedium text-center">{Phone}</Text>
		</View>
	);
}
