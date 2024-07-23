import { Text, View, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Header, MainButton } from "../../components";

import { CustomMenu } from "../../components";
import UserInfo from "../../components/UserInfo";
const Home = () => {
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
		</View>
	);
};

export default Home;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
