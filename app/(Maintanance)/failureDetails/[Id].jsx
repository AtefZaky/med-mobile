import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";

import api from "../../../utils/api";
import {
	Header,
	FailureDetailsHeaderItem,
	Loader,
	FailureForm,
} from "../../../components";
import Toast from "react-native-toast-message";

const failureDetails = () => {
	const { Id } = useLocalSearchParams();
	const [FailureData, setFailureData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [dataSent, setDataSent] = useState(false);
	const [error, setError] = useState(null);
	const [assetsStatus, setAssetsStatus] = useState([]);
	const getFailureData = async () => {
		try {
			const res = await api.get(`failure/${Id}`);

			setFailureData(res.data.report[0]);

			setLoader(false);
		} catch (error) {
			Toast.show({
				type: "error",
				text1: error.message,
				text2: "تم رفع البينات",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
		}
	};
	const getAssetStatus = async () => {
		const { data } = await api.get("failure/status/menu");

		if (data.success) {
			const transformedData = data.items.map((item) => ({
				value: item.StatusName,
				key: item.StatusID,
			}));
			setAssetsStatus(transformedData);
		} else {
			Toast.show({
				type: "error",
				text1: data.message || "خطأ",
				text2: "حدث خطأ اثناء تسجيل البلاغ",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontSize: 14,
				},
			});
		}
	};

	useEffect(() => {
		if (dataSent) {
			Toast.show({
				type: "success",
				text1: "عملية ناجحه",
				text2: "تم رفع البينات",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
			setTimeout(() => {
				router.replace("Maintanacehome");
			}, 1500);
		} else if (error) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: error,
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
		}
	}, [dataSent, error]);
	useEffect(() => {
		const fetchData = async () => {
			getAssetStatus();
			getFailureData();
		};
		fetchData();
	}, []);
	return (
		<View>
			<Header title={"تفاصيل العطل"} />
			<Toast />
			<ScrollView>
				{/* <View> */}
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
												value:
													FailureData.AssetStatus == 1 ? "يعمل" : "لا يعمل",
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

									<View className="mt-[19px] "></View>
								</View>
							</View>
						</View>
					)}

					<FailureForm
						setError={setError}
						id={Id}
						dataSent={dataSent}
						setDataSent={setDataSent}
						assetsStatus={assetsStatus}
					/>
				</View>
			</ScrollView>
		</View>
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
