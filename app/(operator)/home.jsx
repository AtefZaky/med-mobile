import { View, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { Header, MainButton, UserInfo, CustomMenu } from "../../components";
import { router } from "expo-router";

const Home = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View className="bg-white min-h-[103vh]">
			<Header
				hasLeftComponent={true}
				onDrawerPress={() => {
					setModalVisible(true);
				}}
			/>
			<UserInfo />
			<CustomMenu
				setModalVisible={(v) => {
					setModalVisible(v);
				}}
				modalVisible={modalVisible}></CustomMenu>
			<ScrollView>
				<View className="flex px-4 ">
					<MainButton
						title="تشغيل و ايقاف الوحدات"
						containerStyles="mt-7"
						handlePress={() => router.navigate("assetsOperations")}
					/>
					<MainButton
						title="المناسيب اليومية"
						containerStyles="mt-7"
						handlePress={() => router.navigate("dailyPercentage")}
					/>

					<MainButton
						title="بيانات التشغيل اليومية"
						containerStyles="mt-7"
						handlePress={() => router.navigate("DailyOperation")}
					/>
					<MainButton
						title="الإبلاغ عن الأعطال"
						containerStyles="mt-7"
						handlePress={() => router.navigate("Notify")}
					/>
				</View>
				<Toast />
			</ScrollView>
		</View>
	);
};

export default Home;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
