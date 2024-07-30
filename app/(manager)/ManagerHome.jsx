import { View, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Header, MainButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import CustomMenu from "../../components/CustomMenu";
import UserInfo from "../../components/UserInfo";
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
				<UserInfo />

				<ScrollView>
					<View className="flex px-4 ">
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
