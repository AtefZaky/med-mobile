import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { icons } from "../constants";
import { MainButton } from "./MainButton";
import { TouchableOpacity } from "react-native";

export default function NavigationView({ username, closeDrawer }) {
	return (
		<View className="w-full mt-[80px]">
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.User}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							{username}
						</Text>
					</View>
				</View>
			</View>

			<TouchableOpacity
				onPress={() => {
					closeDrawer;
				}}
				className="border-b-[#E4E7EC] border-b  p-4 ">
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.House}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							الصفحة الرئيسيه
						</Text>
					</View>
					<Image
						source={icons.CaretLeft}
						className="w-4 h-4"
					/>
				</View>
			</TouchableOpacity>
			<View className="border-b-[#E4E7EC] border-b  p-4 ">
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.Globe}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							الدولة
						</Text>
					</View>
					<Image
						source={icons.egyptFlag}
						className="w-4 h-4"
					/>
				</View>
			</View>
			<View className="border-b-[#E4E7EC] border-b  p-4 ">
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.flag}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							اللغة
						</Text>
					</View>
					<Text style={styles.paragraph}>العربية</Text>
				</View>
			</View>
			<View className="border-b-[#E4E7EC] border-b  p-4 ">
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.notifcationBell}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							التنبيهات
						</Text>
					</View>
					<Image
						source={icons.CaretLeft}
						className="w-4 h-4"
					/>
				</View>
			</View>

			<View>
				<MainButton
					containerStyles={"m-auto mt-[100px] w-[200px]  "}
					handlePress={console.log("logout")}
					title={"تسجيل الخروج"}></MainButton>
			</View>
		</View>
	);
}
const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
