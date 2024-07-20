import {
	Text,
	View,
	ScrollView,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useState, useEffect } from "react";
import { Header, MainButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { DrawerLayoutAndroid, Image } from "react-native";
import { useRef } from "react";
import { icons } from "../../constants";
const Home = () => {
	const { user } = useGlobalContext();
	const navigation = useNavigation();
	const drawer = useRef(null);

	const navigationView = () => (
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
							{user.username}
						</Text>
					</View>
				</View>
			</View>

			<TouchableOpacity
				onPress={() => {
					drawer.current.closeDrawer();
				}}
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
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
						source={icons.leftArrow}
						className="w-4 h-4"
					/>
				</View>
			</TouchableOpacity>
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
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
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
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
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
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
						source={icons.leftArrow}
						className="w-4 h-4"
					/>
				</View>
			</View>

			<View style={styles.logoutButtonContainer}>
				<MainButton
					containerStyles={"m-auto mt-[100px] w-[200px]  "}
					handlePress={console.log("logout")}
					title={"تسجيل الخروج"}></MainButton>
			</View>
		</View>
	);
	return (
		<DrawerLayoutAndroid
			ref={drawer}
			drawerWidth={300}
			drawerPosition={"right"}
			renderNavigationView={navigationView}>
			<ScrollView>
				<Header
					hasLeftComponent={true}
					onDrawerPress={() => {
						drawer.current.openDrawer();
					}}
				/>
				<View className="flex px-4 my-6">
					<View className=" mb-20">
						<Text className="text-right font-tregular text-base text-primary">
							مرحبا بك
						</Text>
						<Text className="text-right font-tbold text-base text-primary mb-4">
							{user.username}
						</Text>
						<Text className="text-base text-primary font-tregular">
							اخر ظهور :{" "}
							<Text className="text-sm font-tlight">{user.lastActive}</Text>
						</Text>
					</View>
					<MainButton
						title="تشغيل و ايقاف الوحدات"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("assetsOperations")}
					/>
					<MainButton
						title="المناسيب اليومية"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("dailyPercentage")}
					/>

					<MainButton
						title="بيانات التشغيل اليومية"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("dailyOperationsInfo")}
					/>
					<MainButton
						title="الابلاغ عن العطال"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("reportFailure")}
					/>
				</View>
				<Toast />
			</ScrollView>
		</DrawerLayoutAndroid>
	);
};

export default Home;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
