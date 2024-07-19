import { View, Text } from "react-native";
import React from "react";
import Dropdown from "./DropDown";
import FormField from "./FormField";
import MainButton from "./MainButton";
export default function ChatBotStartUp({
	setAssets,
	dropdownOptions,
	failureDescription,
	setfailureDescription,
	startChatBot,
}) {
	return (
		<View className=" flex  gap-6  p-4 pt-6">
			<View>
				<Dropdown
					title={"المعدة"}
					data={dropdownOptions}
					placeholder={"اختر المعدة"}
					onChange={(key) => {
						setAssets(key);
					}}></Dropdown>
			</View>

			<View>
				<FormField
					value={failureDescription}
					handleChangeText={(value) => {
						setfailureDescription(value);
					}}
					title={"وصف العطل"}
					placeholder={"ادخل وصف العطل"}></FormField>
			</View>

			<View>
				<MainButton
					className="mt-7"
					title={"ارسال"}
					handlePress={startChatBot}></MainButton>
			</View>
		</View>
	);
}
