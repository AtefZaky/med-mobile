import { Header, Loader, DailyExmanationForm } from "../../components";
import React, { useEffect, useState } from "react";

import api from "../../utils/api";

import {
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function dailyExamination() {
	const [loader, setloader] = useState(true);

	const [options, setOptions] = useState([]);

	const getAssets = async () => {
		try {
			const { data } = await api.get("/departments");
			if (data.success) {
				const transformedData = data.Assets.map((item) => ({
					value: item.AssetName,
					key: item.AssetID,
				}));
				setOptions(transformedData);
			} else {
				Toast.show({
					type: "خطاء",
					text1: "حدث خطأ ما",
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
			console.log(error);
			Toast.show({
				type: "error",
				text1: "حدث خطأ بالخادم",
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
		} finally {
			setloader(false);
		}
	};
	useEffect(() => {
		getAssets();
	}, []);

	const submitData = async (formdata, setButtonLoading) => {
		if (
			formdata.AssetID === "" ||
			formdata.ch_done === "" ||
			formdata.notes === "" ||
			formdata.ch_date === ""
		) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
				autoHide: true,
				visibilityTime: 3000,
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
			return; // Prevent form submission if fields are empty
		}

		setButtonLoading(true);
		try {
			const res = await api.post("/operation/check", formdata);

			Toast.show({
				type: "success",
				text1: "تم الحفظ",
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
				router.replace("/Maintanacehome");
			}, 1500);
		} catch (error) {
			setButtonLoading(false);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				Toast.show({
					type: "error",
					text1: error.response.data,
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
			} else if (error.request) {
				// The request was made but no response was received
				Toast.show({
					type: "error",
					text1: error.request,
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
			} else {
				// Something happened in setting up the request that triggered an Error
				Toast.show({
					type: "error",
					text1: error.message,
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
		}
	};

	return (
		<View className="bg-white min-h-[103vh]">
			<Header title={"بيانات الفحص اليومي"}></Header>

			<View>
				{loader ? (
					<Loader
						minus={160}
						isLoading={loader}></Loader>
				) : (
					<>
						<ScrollView className="h-[85vh] pb-5">
							<KeyboardAvoidingView
								behavior={Platform.OS === "ios" ? "padding" : "height"}
								keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 40}>
								{options.length > 0 ? (
									<DailyExmanationForm
										submitData={submitData}
										options={options}></DailyExmanationForm>
								) : (
									<View className="flex w-full h-full justify-center items-center">
										<Text className="text-center font-tbold text-lg mt-4">
											لا توجد بيانات
										</Text>
									</View>
								)}
							</KeyboardAvoidingView>
						</ScrollView>
					</>
				)}
			</View>
			<Toast />
		</View>
	);
}
// isLoading={buttonLoading}
