import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import Markdown from "react-native-markdown-display";
export default function MassegeContainer({ role, content }) {
	const { user } = useGlobalContext();
	return (
		<View className={`w-full m-0 mt-4 grid    `}>
			<View
				className={`${
					role == "assistant" ? "bg-[#E3F2FF]" : "bg-[#F6F6F6] self-end"
				} gap-2 w-2/3 p-2 m-0 rounded-md `}>
				<Text className=" font-tmedium ">
					{role == "assistant" ? "المساعد ف الصيانة " : user.username}
				</Text>
				<Text>{content}</Text>
			</View>
		</View>
	);
}
