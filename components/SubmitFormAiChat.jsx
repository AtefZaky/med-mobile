import { View, Text } from "react-native";
import React from "react";
import { icons } from "../constants";
import { useState } from "react";
import FormField from "./FormField";
export default function SubmitFormAiChat({ buttonDisabled, sendMassege }) {
	const [query, setQuery] = useState("");
	return (
		<View className={` p-4 ]`}>
			<FormField
				disableChat={buttonDisabled}
				// FocusFunction={() => {
				// 	setMarginBottom(40);
				// }}
				// blurFunction={() => {
				// 	setMarginBottom(0);
				// }}
				handlePress={() => {
					if (sendMassege(query)) {
						setQuery("");
					}
				}}
				placeholder={"ارسال"}
				inputIcon={icons.ArrowUp}
				haveTitle={false}
				value={query}
				handleChangeText={(value) => {
					setQuery(value);
				}}
			/>
		</View>
	);
}
