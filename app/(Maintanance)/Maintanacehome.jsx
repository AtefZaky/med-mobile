import { View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Header, MainButton } from "../../components";
import { useState } from "react";
import { CustomMenu } from "../../components";
import UserInfo from "../../components/UserInfo";

const Maintanacehome = () => {
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
			<UserInfo />
			<ScrollView>
				<View className="flex px-4 ">
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
			</ScrollView>
		</View>
	);
};
export default Maintanacehome;
const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
