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
		<View style={styles.wrapper}>
			<View>
				<Text style={styles.title}>{title}</Text>
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
					<View style={styles.optionsContainer}>
						<FlatList
							data={options}
							keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.optionItem}
									onPress={() => handleOptionSelect(item.option, item.id)}>
									<Text style={styles.optionText}>{item.option}</Text>
								</TouchableOpacity>
							)}
							style={{ width: "100%" }}
							contentContainerStyle={{ flexGrow: 1 }}
							keyboardShouldPersistTaps="handled"
						/>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		margin: 8,
	},
	title: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	container: {
		width: "100%",
		justifyContent: "center",
		alignContent: "center",
	},
	selectButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 5,
		borderColor: colors.primary,
		borderWidth: 1,
		height: 48,
	},
	selectButtonText: {
		fontSize: 16,
		color: colors.dark,
		opacity: 0.7,
		flex: 1,
	},
	optionsContainer: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#f2f2f2",
		borderRadius: 4,
		marginTop: 8,
		maxHeight: 200,
		zIndex: 10,
		overflow: "hidden", // Ensures proper handling of overflow
	},
	optionItem: {
		padding: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: colors.gray,
	},
	optionText: {
		fontSize: 16,
		color: "#333",
		textAlign: "left",
	},
});

export default Select;
