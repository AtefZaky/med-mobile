import {
	Text,
	View,
	TouchableOpacity,
	DrawerLayoutAndroid,
	Image,
} from "react-native";


import { ScrollView } from "react-native-virtualized-view";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { Header, MainButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

import { useState } from "react";
import { CustomMenu } from "../../components";

const Maintanacehome = () => {
	const { user, setIsLogged, setUser } = useGlobalContext();
	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View>
			<Header
				hasLeftComponent={true}
				onDrawerPress={() => {
					setModalVisible(true);
				}}
			/>
			<CustomMenu
				setModalVisible={(v) => {
					setModalVisible(v);
				}}
				modalVisible={modalVisible}></CustomMenu>
			<ScrollView>
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
						title="بينات الفحص اليومي"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("dailyExamination")}
					/>

					<MainButton
						title="المساعدة في الصيانة"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("maintanaceHelper")}
					/>
					<MainButton
						title="البلاغات"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("reports")}
					/>
					<MainButton
						title="الاصناف المخزنية"
						containerStyles="mt-7"
						handlePress={() => navigation.navigate("InventoyItems")}
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
					handlePress={handleLogOut}
					title={"تسجيل الخروج"}></MainButton>
			</View>
		</View>
	);
}
export default Maintanacehome;
const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
