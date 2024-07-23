import { View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import ReportFailureForm from "../../components/ReportFailureForm";
import { Header, Loader } from "../../components";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";

const ReportFailure = () => {
	const [error, setError] = useState({ error: null, counter: "" });
	const [assetsStatus, setAssetsStatus] = useState([]);
	const [dataSent, setDataSent] = useState(false);
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const navigation = useNavigation();
	const [submitting, setSubmitting] = useState(false);
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
	const submitData = async (formdata) => {
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
				return setDataSent(true);
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
			setSubmitting(false);
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				setError({ ...error, error: error.response.data });
			} else if (error.request) {
				// The request was made but no response was received
				setError({ ...error, error: error.request });
			} else {
				// Something happened in setting up the request that triggered an Error
				setError({ ...error, error: error.message });
			}
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

	useEffect(() => {
		if (dataSent) {
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
		} else if (error.error) {
			Toast.show({
				type: "error",
				text1: error.error || "خطأ",
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
	}, [dataSent, error.counter]);

	return (
		<View>
			<View>
				<Header title={"الابلاغ عن الاعطال"} />
			</View>

			{loader || !options.length || !assetsStatus.length ? (
				<Loader></Loader>
			) : (
				<ScrollView>
					<ReportFailureForm
						submitting={submitting}
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
