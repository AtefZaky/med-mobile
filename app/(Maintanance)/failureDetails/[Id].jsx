import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";

import api from "../../../utils/api";
import {
	Header,
	FailureDetailsHeaderItem,
	Loader,
	FailureForm,
} from "../../../components";

const failureDetails = () => {
	const { Id } = useLocalSearchParams();
	const [FailureData, setFailureData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [dataSent, setDataSent] = useState(false);
	const getFailureData = async () => {
		try {
			const res = await api.get(`failure/${Id}`);

			setFailureData(res.data.report[0]);
			console.log(res.data.report[0]);
			setLoader(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getFailureData();
	}, []);
	return (
		<ScrollView keyboardShouldPersistTaps="handled">
			{/* <View> */}
			<Header title={"تفاصيل العطل"} />
			<View>
				{loader ? (
					<Loader isLoading={loader}></Loader>
				) : (
					<View>
						<View>
							<View className="p-4">
								<View className="bg-[#E4E7EC] flex gap-y-2 mt-4 rounded-md max-h-[140px] py-2">
									<FailureDetailsHeaderItem
										data={{ title: "المعدة", value: FailureData.AssetName }}
									/>
									<FailureDetailsHeaderItem
										data={{
											title: "الحالة",
											value: FailureData.AssetStatus == 1 ? "يعمل" : "لا يعمل",
										}}
									/>
									<FailureDetailsHeaderItem
										data={{
											title: "التاريخ",
											value:
												FailureData?.FailureDate?.split("T")[0] ||
												"لا توجد معلومات",
										}}
									/>
									<FailureDetailsHeaderItem
										data={{ title: "العطل", value: FailureData.FailureID }}
									/>
								</View>

								<View className="mt-[19px]">
									<FailureForm setDataSent={setDataSent} />
								</View>
							</View>
						</View>
					</View>
				)}
			</View>
			{/* </View> */}
		</ScrollView>
	);
};

export default failureDetails;

{
	/* <View>
	<View className="flex flex-row  items-center">
		<View className="flex items-center flex-row gap-2">
			<Text className="font-tregular w-[114] block">المعدة</Text>
		</View>
		<View>
			<Text className="font-tmedium"> {FailureData.AssetName}</Text>
		</View>
	</View>
	<View className="flex felx-row items-center justify-between">
		<View>
			<Text className="font-tregular w-[114]">الحالة</Text>
		</View>

		<View>
			<Text className="font-tmedium">
				{FailureData.AssetStatus == 1 ? "يعمل" : "لا يعمل"}{" "}
			</Text>
		</View>
	</View>
	<View className="flex felx-row items-center">
		<View>
			<Text
				className="font-tregular w-[114]
			">
				{" "}
				التاريخ
			</Text>
		</View>
		<View>
			<Text className="font-tmedium">
				{FailureData?.FailureDate?.split("T")[0] ||
					"لا توجد معلومات"}
			</Text>
		</View>
	</View>
	<View className="flex felx-row items-center">
		<View>
			<Text
				className="font-tregular w-[114]
			">
				العطل
			</Text>
		</View>
		<View>
			<Text className="font-tmedium"> {FailureData.FailureID}</Text>
		</View>
	</View>
</View> */
}
