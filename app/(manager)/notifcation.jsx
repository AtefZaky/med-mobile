import { View, Text } from "react-native";
import React from "react";
import { Header, MassegeContainer } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import { Notifcation } from "../../components";
import { da } from "date-fns/locale";
const notifcation = () => {
	const data = {
		message:
			"تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية تنبية  تنبيةتنبي تنبية تنبية  تنبيةتنبي تنبية تنبية  تنبيةتنبية تنبية تنبية تنبية تنبية",
		piriority: "1",
		phone: "01000",
		Department: "قسم الطرومبات",
		date: "17:30 2024-04-24 ",
	};
	return (
		<View className="bg-white min-h-screen">
			<Header title={"التنبيهات"} />
			<View className="px-4 py-4">
				<ScrollView>
					<Notifcation data={data}></Notifcation>
				</ScrollView>
			</View>
		</View>
	);
};

export default notifcation;
