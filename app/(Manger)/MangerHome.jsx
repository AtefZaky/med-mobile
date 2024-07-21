import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Header, MainButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { DrawerLayoutAndroid, Image } from "react-native";
import { useRef } from "react";
import { icons } from "../../constants";
import { useCallback } from "react";
import api, { logOut } from "../../utils/api";
import { useRouter } from "expo-router";

function MangerHome ()  {
	const { user, setIsLogged, setUser } = useGlobalContext();
	const navigation = useNavigation();
	const router = useRouter()
	const drawer = useRef(null);
	const handleLogOut = async () => {
		await api.get("/auth/signout")
		console.log('-----------logout--------------')
		await logOut()
		setIsLogged(false)
		setUser(null)
		router.replace('/')
	}
	useEffect(() => {
		drawer.current.closeDrawer();
	  if (user){
		return
	  }
	  else{
		router.replace('/')
	  }
	}, [])
	

	const navigationView = () => (
		<View className="w-full mt-[80px]">
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.User}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							{user ? user.username: ""}
						</Text>
					</View>
				</View>
			</View>

			<TouchableOpacity
				onPress={() => {
					drawer.current.closeDrawer();
				}}
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.House}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							الصفحة الرئيسيه
						</Text>
					</View>
					<Image
						source={icons.CaretLeft}
						className="w-4 h-4"
					/>
				</View>
			</TouchableOpacity>
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.Globe}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							الدولة
						</Text>
					</View>
					<Image
						source={icons.egyptFlag}
						className="w-4 h-4"
					/>
				</View>
			</View>
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.flag}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							اللغة
						</Text>
					</View>
					<Text style={styles.paragraph}>العربية</Text>
				</View>
			</View>
			<View
				className="border-b-[#E4E7EC] border-b  p-4 "
				style={styles.itemContainer}>
				<View className="flex-row-reverse justify-between items-center">
					<View className=" flex-row-reverse items-center gap-2   ">
						<Image
							className="w-4 h-4"
							resizeMode="contain"
							source={icons.notifcationBell}
						/>
						<Text
							className="font-tregular"
							style={styles.paragraph}>
							التنبيهات
						</Text>
					</View>
					<Image
						source={icons.CaretLeft}
						className="w-4 h-4"
					/>
				</View>
			</View>

			<View style={styles.logoutButtonContainer}>
				<MainButton
					containerStyles={"m-auto mt-[100px] w-[200px]  "}
					handlePress={handleLogOut}
					title={"تسجيل الخروج"}>
				</MainButton>
			</View>
		</View>
	);

	useFocusEffect(
        useCallback(() => {
            if (drawer.current) {
                drawer.current.closeDrawer();
            }
            return () => {
                if (drawer.current) {
                    drawer.current.closeDrawer();
                }
            };
        }, [])
    );

	return (
		<DrawerLayoutAndroid
			ref={drawer}
			drawerWidth={300}
			drawerPosition={"right"}
			renderNavigationView={navigationView}>
			<View>
				<Header
					hasLeftComponent={true}
					onDrawerPress={() => {
						drawer.current.openDrawer();
					}}
				/>
				<ScrollView>
					<View className="flex px-4 my-6">
						<View className=" mb-20">
							<Text className="text-right font-tregular text-base text-primary">
								مرحبا بك
							</Text>
							<Text className="text-right font-tbold text-base text-primary mb-4">
								{user? user.username: ""}
							</Text>
							<Text className="text-base text-primary font-tregular">
								اخر ظهور :{" "}
								<Text className="text-sm font-tlight">{user? user.lastActive: ""}</Text>
							</Text>
						</View>

						<MainButton
							title="تشغيل و ايقاف الوحدات"
							containerStyles="mt-7"
							handlePress={() => navigation.navigate("notifcation")}
						/>
					
					</View>
					<Toast />
				</ScrollView>
			</View>
		</DrawerLayoutAndroid>
	);
};

export default MangerHome;

const styles = {
	paragraph: { fontFamily: "Tajawal-Regular", fontSize: 16 },
};
