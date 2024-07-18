import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function Dropdown({ data, onChange, placeholder, title }) {
	function getValueById(array, id) {
		const item = array.find((element) => element.key === id);
		return item ? item.value : null; // Return null or a default value if the item is not found
	}
	const changeDropDown = (key) => {
		onChange(key);
	};
	return (
		<View>
			<View className="mb-2">
				<Text className="font-tbold">{title}</Text>
			</View>
			<SelectList
				data={data}
				placeholder={placeholder}
				boxStyles={{
					alignItems: "center",
					justifyContent: "space-between",
					padding: 12,
					display: "flex",
					flexDirection: "row-reverse",
					borderColor: "#1C5B7D",
					opacity: 0.65,
					borderWidth: 0.5,
					minHeight: 65,
				}}
				fontFamily="Tajawal-Medium"
				dropdownStyles={{
					borderColor: "#1C5B7D",
					borderWidth: 0.5,
				}}
				searchPlaceholder="بحث"
				setSelected={changeDropDown}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
