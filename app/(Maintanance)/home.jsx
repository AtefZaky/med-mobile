import { Text, View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import React, { Component, useState, useEffect } from "react";
import { Header, MainButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
	const { user } = useGlobalContext();
	const navigation = useNavigation();
	const [data, setData] = useState(null);
	// useEffect(() => {

	// }, [third])

	return (
		<ScrollView>
			<Header />
			<View
				className="flex px-4 my-6"
				style={{
					minHeight: Dimensions.get("window").height,
				}}>
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
			</View>
			<Toast />
		</ScrollView>
	);
};

export default Home;
