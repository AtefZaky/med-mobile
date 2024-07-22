import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Header, MainButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomMenu } from "../../components";

const Home = () => {
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
							{user ? user.username : ""}
						</Text>
						<Text className="text-base text-primary font-tregular">
							اخر ظهور :{" "}
							<Text className="text-sm font-tlight">
								{user ? user.lastActive : ""}
							</Text>
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
		</View>
	);
};

export default Home;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
