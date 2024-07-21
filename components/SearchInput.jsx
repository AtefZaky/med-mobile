import React, { useState, useRef } from "react";
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
	SafeAreaView,
} from "react-native";

const DarkBlue = "#0047ab"; // Assuming this is the color you want to use

const SearchInput = ({ setQuery }) => {
	const [searchText, setSearchText] = useState("");
	const inputRef = useRef(null);

	const handleSearch = () => {
		// Add your search logic here
		setQuery(searchText);
	};

	const activateSearchInput = () => {
		inputRef.current.focus();
	};

	return (
		<View
			style={styles.container}
			className="mx-auto my-4">
			<TextInput
				ref={inputRef}
				style={styles.input}
				placeholder="بحث عن الاصناف المخزنيه"
				value={searchText}
				onChangeText={setSearchText}
				placeholderTextColor="#999"
				underlineColorAndroid="transparent"
				returnKeyType="search"
				onSubmitEditing={handleSearch}
			/>
			<TouchableOpacity
				style={styles.iconButton}
				onPress={activateSearchInput}>
				<Image
					className="my-6"
					source={require("../assets/images/MagnifyingGlass.png")}
					style={styles.searchIcon}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: DarkBlue,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		height: 48,
		width: "90%",
	},
	input: {
		flex: 1,
		fontSize: 14,
		height: 48,
	},
	iconButton: {},
	searchIcon: {
		marginLeft: 10,

		// position:"absolute",
		width: 30,
		height: 30,
		// right:"7%",
		// padding:4,
	},
});

export default SearchInput;
