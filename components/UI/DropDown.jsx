import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function Dropdown({
	data,
	onChange,
	placeholder,
	title,
	defaultOption,
	parentStyle,
}) {
	// function getValueById(array, id) {
	// 	const item = array.find((element) => element.key === id);
	// 	return item ? item.value : null; // Return null or a default value if the item is not found
	// }
	const changeDropDown = (key) => {
		onChange(key);
	};

	return (
		<View className={parentStyle}>
			<View className="mb-2">
				<Text className="font-tbold">{title}</Text>
			</View>

			{defaultOption ? (
				<>
					<SelectList
						data={data}
						placeholder={placeholder}
						placeholderColor="#959595"
						defaultOption={defaultOption}
						boxStyles={{
							alignItems: "center",
							justifyContent: "space-between",
							padding: 12,
							borderRadius: 8,
							display: "flex",
							flexDirection: "row-reverse",
							borderColor: "#1C5B7D",
							opacity: 1,
							borderWidth: 0.5,
							height: 56,
						}}
						fontFamily="Tajawal-Medium"
						dropdownStyles={{
							borderColor: "#1C5B7D",
							borderWidth: 0.5,
						}}
						searchPlaceholder="بحث"
						setSelected={changeDropDown}
					/>
				</>
			) : (
				<>
					<SelectList
						data={data}
						placeholder={placeholder}
						placeholderColor="#959595"
						boxStyles={{
							alignItems: "center",
							justifyContent: "space-between",
							padding: 12,
							borderRadius: 8,
							display: "flex",
							flexDirection: "row-reverse",
							borderColor: "#1C5B7D",
							opacity: 1,
							borderWidth: 0.5,
							height: 56,
						}}
						fontFamily="Tajawal-Medium"
						dropdownStyles={{
							borderColor: "#1C5B7D",
							borderWidth: 0.5,
						}}
						inputStyles={{ placeholderTextColor: "green" }}
						searchPlaceholder="بحث"
						setSelected={changeDropDown}
					/>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});
