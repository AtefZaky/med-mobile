import { View, ScrollView } from "react-native";

import { router } from "expo-router";
import React, { useState } from "react";
import {
	MainButton,
	CustomMenu,
	UserInfo,
	MainLayout,
	ScrollComponent,
} from "../../components";

import { icons } from "../../constants";
const ManagerHome = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<MainLayout
			onDrawerPress={() => {
				setModalVisible(true);
			}}
			hasLeftComponent>
			<ScrollComponent parentContainerStyle={"min-h-[84vh]"}>
				<CustomMenu
					setModalVisible={(e) => {
						setModalVisible(e);
					}}
					modalVisible={modalVisible}></CustomMenu>
				<UserInfo />
				<View className="flex px-4 ">
					<MainButton
						icon={icons.whiteBell}
						title="التنبيهات"
						containerStyles="mt-7"
						handlePress={() => router.navigate("notifcation")}
					/>

					<MainButton
						title="فواتير الكهرباء"
						containerStyles="mt-7"
						handlePress={() => router.navigate("electricityBills")}
					/>

					<MainButton
						title="انقطاع التيار"
						containerStyles="mt-7"
						handlePress={() => router.navigate("electricityCutOut")}
					/>

					<MainButton
						title="المصروفات"
						containerStyles="mt-7"
						handlePress={() => router.navigate("Expenses")}
					/>
					<MainButton
						title="العمرات"
						containerStyles="mt-7"
						handlePress={() => router.navigate("Schedule")}
					/>
					<MainButton
						title=" مقايسات"
						containerStyles="mt-7"
						handlePress={() => router.navigate("Assesment")}
					/>
					<MainButton
						title=" الاصناف المخزنية"
						containerStyles="mt-7"
						handlePress={() => router.navigate("InventoyItems")}
					/>
				</View>
			</ScrollComponent>
		</MainLayout>
	);
};

export default ManagerHome;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};

// <DrawerLayoutAndroid
