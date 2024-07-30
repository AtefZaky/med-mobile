import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
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
	const [FailureData, setFailureData] = useState({});
	const [loader, setLoader] = useState(true);
	const [assetsStatus, setAssetsStatus] = useState([]);
	const [error, setError] = useState(null);
	console.log(FailureData);
	const getFailureData = async () => {
		try {
			const res = await api.get(`failure/${Id}`);

			setFailureData(res.data.report[0]);
		} catch (error) {
			setError("لا يمكن الاتصال بالخادم الان");
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
		try {
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
					text2: "حدث خطأ اثناء  الاتصال بالخادم",
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
		} catch (error) {
			setError("حدث خطأ اثناء  الاتصال بالخادم");
			Toast.show({
				type: "error",
				text1: error.message || "خطأ",
				text2: "حدث خطأ اثناء  الاتصال بالخادم",
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

	const submit = async (formData, setSubmitting) => {
		if (
			formData.AssetID === "" ||
			formData.FixDate === "" ||
			formData.FailureAction === "" ||
			formData.FailureReason === "" ||
			formData.Cost === "" ||
			formData.Notes === "" ||
			formData.StatusID === ""
		) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
			return; // Prevent form submission if fields are empty
		}

		setSubmitting(true);

		try {
			const result = await api.post(`failure/repair/${Id}`, formData);
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
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: error.message,
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await getAssetStatus();
			await getFailureData();
			setLoader(false);
		};
		fetchData();
	}, []);
	return (
		<View className="bg-white min-h-[103vh]">
			<Header title={"تفاصيل العطل"} />
			<Toast />

			<View>
				{loader ? (
					<Loader
						minus={140}
						isLoading={loader}></Loader>
				) : (
					<>
						{error ||
						Object.keys(FailureData).length == 0 ||
						!assetsStatus.length ? (
							<View className="flex w-full h-full items-center mt-4 ">
								<Text className="text-lg  text-black font-tbold">
									{error ? error : "لا توجد بينات الان"}
								</Text>
							</View>
						) : (
							<>
								<KeyboardAvoidingView
									behavior={Platform.OS === "ios" ? "padding" : "height"}
									keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
									<ScrollView className="max-h-[100vh]">
										<View>
											<View>
												<View>
													<View className="p-4">
														<View className="bg-[#E4E7EC] flex gap-y-2 mt-4  rounded-md max-h-[140px] py-2 pb-4">
															<FailureDetailsHeaderItem
																data={{
																	title: "المعدة",
																	value: FailureData.AssetName,
																}}
															/>
															<FailureDetailsHeaderItem
																data={{
																	title: "الحالة",
																	value:
																		FailureData.AssetStatus == 1
																			? "يعمل"
																			: "لا يعمل",
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
																data={{
																	title: "العطل",
																	value: FailureData.FailureDescription,
																}}
															/>
														</View>

														<View className="mt-[19px] "></View>
													</View>
												</View>
											</View>

											<FailureForm
												id={Id}
												submit={submit}
												assetsStatus={assetsStatus}
											/>
										</View>
									</ScrollView>
								</KeyboardAvoidingView>
							</>
						)}
					</>
				)}
			</View>
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
