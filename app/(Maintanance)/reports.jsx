import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Header, Loader, MainButton, Table } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import api from "../../utils/api";
import { router } from "expo-router";
export default function reports() {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await api.get("/failure");
			setData([...response.data.reports]);
			setLoader(false);
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const issueHeader = ["الحالة", "التاريخ", "المعدة", "الاعطال"];

	return (
		<View className="flex-1">
			<Header title={"البلاغات"}></Header>
			<View className="flex-1">
				{loader ? (
					<Loader isLoading={loader}></Loader>
				) : (
					<ScrollView contentContainerStyle={{ flexGrow: 1, height: "70vh" }}>
						<Table
							reports={true}
							data={data}
							header={issueHeader}
							routingfunction={(id) => router.push(`failureDetails/${id}`)}
						/>
					</ScrollView>
				)}
			</View>

			<View className="px-4 py-8 mb-[45px] ">
				<MainButton title={"انشاء بلاغ"}></MainButton>
			</View>
		</View>
	);
}
