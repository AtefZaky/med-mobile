import { View } from "react-native";

import { ScrollView } from "react-native-virtualized-view";

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import ReportFailureForm from "../../components/ReportFailureForm";
import { Header, Loader } from "../../components";
import React, { useEffect, useState } from "react";

import api from "../../utils/api";

const ReportFailure = () => {
	const [assetsStatus, setAssetsStatus] = useState([]);
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const navigation = useNavigation();

	const getAssets = async () => {
		const { data } = await api.get("/assets");
		if (data.success) {
			const transformedData = data.machines.map((item) => ({
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
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontSize: 14,
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
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
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
			!formdata.StatusDate
		) {
			return Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
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
					},
					text2Style: {
						textAlign: "right",
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
					},
					text2Style: {
						textAlign: "right",
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
			getAssets();
			getAssetStatus();
			setloader(false);
		};
		fetchData();
	}, []);

	return (
		<View>
			<View>
				<Header title={"الابلاغ عن الاعطال"} />
			</View>

			{loader || !options.length || !assetsStatus.length ? (
				<Loader isLoading={loader}></Loader>
			) : (
				<ScrollView>
					<ReportFailureForm
						options={options}
						assetsStatus={assetsStatus}
						submitData={submitData}
					/>
				</ScrollView>
			)}
			<Toast />
		</View>
	);
};

export default ReportFailure;
