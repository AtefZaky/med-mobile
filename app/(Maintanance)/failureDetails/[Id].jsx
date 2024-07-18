import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import api from "../../../utils/api";
import {
	Header,
	Dropdown,
	FormField,
	MainButton,
	Loader,
} from "../../../components";

const failureDetails = () => {
	const { Id } = useLocalSearchParams();
	const [FailureData, setFailureData] = useState([]);
	const [loader, setLoader] = useState(true);
	const getFailureData = async () => {
		try {
			const res = await api.get(`failure/${Id}`);
			setFailureData(res.data.report);
			setLoader(false);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getFailureData();
	}, []);
	return (
		<View>
			<Header title={"تفاصيل العطل"} />
			<View>
				{loader ? (
					<Loader isLoading={loader}></Loader>
				) : (
					<View>
						<View>
							<View className="flex felx-row items-center">
								<Text
									className="font-tregular w-[114]
									">
									المعدة
								</Text>
								<Text className="font-tmedium"> {FailureData.AssetName}</Text>
							</View>
							<View className="flex felx-row items-center">
								<Text className="font-tregular w-[114]">
									{FailureData.AssetStatus}
								</Text>
								<Text className="font-tmedium">
									{FailureData.AssetStatus == 1 ? "يعمل" : "لا يعمل"}{" "}
								</Text>
							</View>
							<View className="flex felx-row items-center">
								<Text
									className="font-tregular w-[114]
									">
									{" "}
									التاريخ
								</Text>
								<Text className="font-tmedium">
									{FailureData.FailureDate.split("T")[0]}
								</Text>
							</View>
							<View className="flex felx-row items-center">
								<Text
									className="font-tregular w-[114]
									">
									{" "}
									العطل
								</Text>
								<Text className="font-tmedium"> {FailureData.FailureID}</Text>
							</View>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

export default failureDetails;
