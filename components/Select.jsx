import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../constants";
import { ScrollView } from "react-native-virtualized-view";

const Select = ({ setOption, options, placeHolder, title }) => {
	const [selectedOption, setSelectedOption] = useState(null);
	const [showOptions, setShowOptions] = useState(false);

	const toggleOptions = () => {
		setShowOptions(!showOptions);
	};

	const handleOptionSelect = (option, id) => {
		setOption(id);
		setSelectedOption(option);
		setShowOptions(false);
	};

	return (
		<View className="gap-2">
			<View>
				<Text className="font-tbold">{title}</Text>
			</View>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.selectButton}
					onPress={toggleOptions}>
					<Icon
						name={showOptions ? "arrow-drop-up" : "arrow-drop-down"}
						size={24}
						color="#2B2B2B"
					/>

					<Text style={styles.selectButtonText}>
						{selectedOption ? selectedOption : placeHolder}
					</Text>
				</TouchableOpacity>

				{showOptions && (
					<View
						className=""
						style={styles.optionsContainer}>
						<FlatList
							className=""
							scrollEnabled={true}
							style={{ maxHeight: 100 }}
							data={options}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.optionItem}
									onPress={() => handleOptionSelect(item.option, item.id)}>
									<Text style={styles.optionText}>{item.option}</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		justifyContent: "center",
		alignContent: "center",
	},
	selectButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 4,
		paddingHorizontal: 8,

		borderRadius: 5,
		borderColor: colors.primary,
		borderWidth: 0.5,
		height: 64,
	},
	selectButtonText: {
		fontSize: 14,
		color: colors.dark,
		opacity: 0.5,
	},
	optionsContainer: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#f2f2f2",
		borderRadius: 4,
		marginTop: 8,
		maxHeight: 200,
		overflow: "scroll",
		zIndex: 10,
		borderRadius: 5,
		padding: 4,
	},
	optionItem: {
		padding: 8,
		borderBottomWidth: 0.5,
		borderBottomColor: colors.gray,
	},
	optionText: {
		fontSize: 14,
		color: "#333",
		textAlign: "right",
	},
});

export default Select;
