import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Header, Loader, Table } from "../../components";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import api from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
export default function reports() {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const navigation = useNavigation();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await getData();
				console.log(data.reports);

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
			<ScrollView>
				{loader ? (
					<Loader isLoading={loader}></Loader>
				) : (
					<Table
						reports={true}
						data={data}
						header={issueHeader}
						routingfunction={(id) =>
							navigation.navigate("FailureDetails", { id: id })
						}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
