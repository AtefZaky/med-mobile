import { View, Text } from "react-native";
import React from "react";

export default function MassegeContainer({ massegeCreator, massege }) {
	return (
		<View
			className={`${
				massegeCreator == "Ai" ? "bg-[#E3F2FF]" : "#F6F6F6"
			}  font-tmedium gap-2 w-2/3 p-2`}>
			<View>
				<Text>{massegeCreator ? "المساعد ف الصيانة " : massegeCreator}</Text>
			</View>
			<Text>{massege}</Text>
		</View>
	);
}
