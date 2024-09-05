import { View, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import React, { useState } from "react";
import { Header, MainButton, UserInfo, CustomMenu } from "../../components";
import { router } from "expo-router";

const InventoyUserHome = () => {
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
						title="الاصناف المخزنية"
						containerStyles="mt-7"
						handlePress={() => router.navigate("Inventory")}
					/>
				</View>
				<Toast />
			</ScrollView>
		</View>
	);
};

export default InventoyUserHome;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
