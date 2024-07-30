import { View, Text } from "react-native";

import { ScrollView } from "react-native-virtualized-view";

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import ReportFailureForm from "../../components/ReportFailureForm";
import { Header, Loader } from "../../components";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import api from "../../utils/api";

const ReportFailure = () => {
	const [assetsStatus, setAssetsStatus] = useState([]);
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const navigation = useNavigation();

	const getAssets = async () => {
		const { data } = await api.get("/departments");
		if (data.success) {
			const transformedData = data.Assets.map((item) => ({
				value: item.AssetName,
				key: item.AssetID,
			}));
			setOptions(transformedData);
		} else {
			Toast.show({
				type: "error",
				text1: data.message || "خطأ",
				text2: "حدث خطأ اثناءالاتاصال بالخادم",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
		}
	};

	const getAssetStatus = async () => {
		const { data } = await api.get("assets/status/menu");

		if (data.success) {
			const transformedData = data.items.map((item) => ({
				value: item.StatusName,
				key: item.StatusID,
			}));
			setAssetsStatus(transformedData);
			setloader(false);
		} else {
			Toast.show({
				type: "error",
				text1: data.message || "خطأ",
				text2: "حدث خطأ اثناءالاتاصال بالخادم",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
		}
	};
	const submitData = async (formdata, setSubmitting) => {
		if (
			!formdata.AssetID ||
			!formdata.StatusID ||
			!formdata.FailureAction ||
			!formdata.StatusDate ||
			!formdata.FailureDescription
		) {
			return Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
		}
		try {
			setSubmitting(true);
			const res = await api.post("/failure/report", formdata);
			if (res.data.success) {
				Toast.show({
					type: "success",
					text1: "عملية ناجحه",
					text2: "تم تسجيل بلاغك",
					autoHide: true,
					visibilityTime: 1500,
					text1Style: {
						textAlign: "right",
						fontFamily: "Tajawal-Bold",
						fontSize: 16,
					},
					text2Style: {
						textAlign: "right",
						fontFamily: "Tajawal-Regular",
						fontSize: 14,
					},
				});
				setTimeout(() => {
					navigation.navigate("home");
				}, 1500);
			} else {
				setSubmitting(false);
				Toast.show({
					type: "error",
					text1: res.data.message || "خطأ",
					text2: "حدث خطأ اثناء تسجيل البلاغ",
					autoHide: true,
					visibilityTime: 1500,
					text1Style: {
						textAlign: "right",
						fontFamily: "Tajawal-Bold",
						fontSize: 16,
					},
					text2Style: {
						textAlign: "right",
						fontFamily: "Tajawal-Regular",
						fontSize: 14,
					},
				});
			}
		} catch (error) {
			Toast.show({
				type: "error",
				text1: error.message || "خطأ",
				text2: "حدث خطأ اثناء تسجيل البلاغ",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await getAssets();
			await getAssetStatus();
			setloader(false);
		};
		fetchData();
	}, []);

	return (
		<View className="bg-white min-h-[103vh]">
			<View>
				<Header title={"بلاغ عن عطل جديد"} />
			</View>

			{loader ? (
				<Loader isLoading={loader}></Loader>
			) : !options.length || !assetsStatus.length ? (
				<View className="flex justify-center  items-center min-h-[73vh ] ">
					<Text className="font-tbold text-lg mt-4"> لا توجد بينات</Text>
				</View>
			) : (
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
					<ScrollView className="max-h-[87vh]">
						<ReportFailureForm
							options={options}
							assetsStatus={assetsStatus}
							submitData={submitData}
						/>
					</ScrollView>
				</KeyboardAvoidingView>
			)}

			<Toast />
		</View>
	);
};

export default ReportFailure;
