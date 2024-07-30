import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Header, Loader, MainButton, Table } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import api from "../../utils/api";
import { router } from "expo-router";
import { icons } from "../../constants";
import Toast from "react-native-toast-message";
export default function OperationalReports() {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const fetchData = async () => {
		try {
			const response = await api.get("/failure");
			setData([...response.data.reports]);
		} catch (error) {
			setError(error);
			Toast.show({
				type: "error",
				text1: error.message,
				text2: "هناك  مشكلة في الاتصال",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
		} finally {
			setLoader(false);
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	const reportHeader = [" حالة المعدة", " تاريخ البلاغ", "المعدة"];

	return (
		<View className="bg-white min-h-[103vh] flex-1">
			<Header title={" الابلاغ عن الاعطال "}></Header>
			<View className="flex-1">
				{loader ? (
					<Loader
						minus={140}
						isLoading={loader}></Loader>
				) : (
					<>
						{data.length ? (
							<>
								<ScrollView
									contentContainerStyle={{ flexGrow: 1, height: "70vh" }}>
									<Table
										OperatioalReports={true}
										data={data}
										header={reportHeader}
									/>
								</ScrollView>
							</>
						) : (
							<View className="flex  items-center min-h-[73vh ] ">
								<Text className="font-tbold text-lg text-black mt-4">
									{" "}
									{error ? "هناك  مشكلة في الاتصال" : "لاتوجد بلاغات"}
								</Text>
							</View>
						)}
					</>
				)}
			</View>

			<View className="px-4 py-8 mb-[45px] ">
				<MainButton
					icon={icons.pencil}
					iconStyles={"mr-4"}
					handlePress={() => {
						router.push("reportFailure");
					}}
					title={"بلاغ عن عطل جديد"}></MainButton>
			</View>
		</View>
	);
}
