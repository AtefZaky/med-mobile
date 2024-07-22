import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Header, MainButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { DrawerLayoutAndroid, Image } from "react-native";
import { useRef } from "react";
import { icons } from "../../constants";
import CustomMenu from "../../components/CustomMenu";
const ManagerHome = () => {
	const { user } = useGlobalContext();
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View>
			<View>
				<Header
					hasLeftComponent={true}
					onDrawerPress={() => {
						setModalVisible(true);
					}}
				/>
				<CustomMenu
					setModalVisible={(e) => {
						setModalVisible(e);
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
							icon={icons.whiteBell}
							title="التنبيهات"
							containerStyles="mt-14"
							handlePress={() => navigation.navigate("notifcation")}
						/>
					</View>
					<Toast />
				</ScrollView>
			</View>
		</View>
	);
};

export default ManagerHome;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};

// <DrawerLayoutAndroid
// 	ref={drawer}
// 	drawerWidth={300}
// 	drawerPosition={"right"}
// 	renderNavigationView={navigationView}>

/* </DrawerLayoutAndroid> */
