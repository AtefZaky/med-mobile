import { View } from "react-native";

import React from "react";
import {
	MainButton,
	CustomMenu,
	UserInfo,
	MainLayout,
	ScrollComponent,
} from "../../components";
import { useState } from "react";
import { router } from "expo-router";
const Maintanacehome = () => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<MainLayout
			hasLeftComponent={true}
			onDrawerPress={() => {
				setModalVisible(true);
			}}>
			<CustomMenu
				setModalVisible={(v) => {
					setModalVisible(v);
				}}
				modalVisible={modalVisible}></CustomMenu>
			<ScrollComponent
				parentContainerStyle={"min-h-[84vh]"}
				contentContainerStyle={{ paddingBottom: 16 }}>
				<UserInfo />

				<View className="flex px-4 ">
					<MainButton
						title="بيانات الفحص اليومي"
						containerStyles="mt-7"
						handlePress={() => router.navigate("DailyExaminationList")}
					/>
					<MainButton
						title="البلاغات"
						containerStyles="mt-7"
						handlePress={() => router.navigate("Notify")}
					/>

					<MainButton
						title="الاعطال "
						containerStyles="mt-7"
						handlePress={() => router.navigate("Failures")}
					/>
					<MainButton
						title="المساعدة في الصيانة"
						containerStyles="mt-7"
						handlePress={() => router.navigate("maintanaceHelper")}
					/>
					<MainButton
						title="الاصناف المخزنية"
						containerStyles="mt-7"
						handlePress={() => router.navigate("InventoyItems")}
					/>

					<MainButton
						title="العمرات "
						containerStyles="mt-7"
						handlePress={() => router.navigate("Schedule")}
					/>
				</View>
			</ScrollComponent>
		</MainLayout>
	);
};
export default Maintanacehome;
const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
