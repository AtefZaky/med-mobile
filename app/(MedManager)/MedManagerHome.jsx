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
const MedManagerHome = () => {
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
						title={"التنبيهات"}
						handlePress={() => router.navigate("MedMangernotifcation")}
						containerStyles="mt-7"
						icon={icons.whiteBell}
					/>
					<MainButton
						title={"مصاريف المصلحة"}
						handlePress={() => router.navigate("MedExpenses")}
						containerStyles="mt-7"
					/>
					<MainButton
						title={"الحالة اللحظية للمصلحة  "}
						handlePress={() => router.navigate("MedActualSatae")}
						containerStyles="mt-7"
					/>
				</View>
			</ScrollComponent>
		</MainLayout>
	);
};

export default MedManagerHome;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};

// <DrawerLayoutAndroid
