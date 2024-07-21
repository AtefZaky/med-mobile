import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { router } from "expo-router";
import { colors, roles } from "../constants";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

import Icon from "react-native-vector-icons/MaterialIcons"; // Import the Icon component

const Header = ({ title, hasLeftComponent = false, onDrawerPress }) => {
	const { user } = useGlobalContext();
	return (
		<View style={styles.containerAll}>
			<View style={styles.topRow}>
				<View style={styles.container}>
					<View style={styles.logobar}>
						<View style={styles.headerLeftContainer}>
							<Image
								source={require("../assets/images/logoleft.jpg")}
								style={styles.LeftImage}
							 	resizeMode="contain"
							/>
						</View>
						<View style={styles.headerRightContainer}>
							<Image
								source={require("../assets/images/logoright.jpg")}
								style={styles.RightImage}
								resizeMode="contain"
							/>
						</View>
					</View>
					{/* Rest of the component content */}
				</View>
			</View>
			<View style={styles.header}>
				<Text
					style={styles.title}
					className="font-tregular">
					{title}
				</Text>
				{!hasLeftComponent ? (
					<TouchableOpacity
						style={styles.rightComponent}
						onPress={() => {
							if (user.type === roles.operator) {
								router.replace("/home");
							} else if (user.type === roles.maintenar) {
								router.replace("/Maintanacehome");
							} else if (user.type === roles.manager) {
								router.replace("/MangerHome");
							}
						}}>
						<Image
							source={icons.ArrowRight}
							style={styles.rightComponentIcon}
							resizeMode="contain"
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						// style={styles.leftComponent}
						className="w-8 h-8 justify-center items-center bg-white rounded-full"
						onPress={onDrawerPress}>
						<Icon
							name="menu"
							size={16}
							resizeMode="contain"
							color="#227099"
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	containerAll: {
		flexDirection: "column",
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	logobar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#ffffff",
		elevation: 4,
		height: 58,
	},
	headerLeftContainer: {
		flex: 1,
		alignItems: "flex-start",
	},
	headerRightContainer: {
		flex: 1,
		alignItems: "flex-end",
	},
	LeftImage: {
		width: 120,
		height: 35,
	},
	RightImage: {
		width: 48,
		height: 48,
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: colors.primary,
		paddingVertical: 10,
		paddingHorizontal: 16,
	},
	leftComponent: {
		backgroundColor: "white",
		justifyContent: "center",
		alignContent: "center",
		width: 30,
		height: 30,
		borderRadius: 15,
	},
	leftComponentIcon: {
		marginRight: 8, // Add some spacing between the icon and text
	},
	rightComponent: {
		backgroundColor: "#fff",
		padding: 8,
		borderRadius: 25,
	},
	rightComponentIcon: {
		borderRadius: 10,
		width: 16,
		height: 16, // Add some spacing between the icon and text
	},
	buttonText: {
		color: "white",
		fontSize: 14,
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#fff",
		marginRight: 16,
	},
});

export default Header;
