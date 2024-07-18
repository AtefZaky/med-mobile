import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Header, Loader, MainButton, Table } from "../../components";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import api from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
export default function reports() {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await getData();

				setData(data.reports);

				setLoader(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);

	const getData = async () => {
		const response = await api.get("/failure");
		return response;
	};
	const issueHeader = ["الحالة", "التاريخ", "المعدة", "الاعطال"];

	return (
		<SafeAreaView>
			<Header title={"البلاغات"}></Header>
			<ScrollView className="h-[70vh]">
				{loader ? (
					<Loader isLoading={loader}></Loader>
				) : (
					<Table
						reports={true}
						data={data}
						header={issueHeader}
						routingfunction={(id) => router.push(`failureDetails/${id}`)}
					/>
				)}
			</ScrollView>
			<View className="px-4">
				<MainButton title={"انشاء بلاغ"}></MainButton>
			</View>
		</SafeAreaView>
	);
}
