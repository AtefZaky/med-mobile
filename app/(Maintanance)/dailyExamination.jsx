import { Header, Loader, DailyExmanationForm } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export default function dailyExamination() {
	const { user } = useGlobalContext();
	const [loader, setloader] = useState(true);

	const [options, setOptions] = useState([]);
	const [buttonLoading, setButtonLoading] = useState(false);
	const navigation = useNavigation();

	const getAssets = async () => {
		const { data } = await api.get("/assets");
		if (data.success) {
			const transformedData = data.machines.map((item) => ({
				value: item.AssetName,
				key: item.AssetID,
			}));
			setOptions(transformedData);
			setloader(false);
		} else {
			console.log("error");
		}
	};
	useEffect(() => {
		getAssets();
	}, []);

	const submitData = async (formdata) => {
		setButtonLoading(true);
		try {
			const data = {
				AssetID: formdata.AssetID,
				ch_done: formdata.ch_done,
				notes: formdata.notes,
			};
			const res = await api.post("/operation/check", data);
			console.log("Response:", res);
			Toast.show({
				type: "success",
				text1: "تم الحفظ",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
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
					},
				});
			}
		}
	};

	return (
		<View>
			<Header title={"بيانات الفحص اليومي"}></Header>

			<ScrollView>
				{loader ? (
					<Loader></Loader>
				) : (
					<DailyExmanationForm
						submitData={submitData}
						options={options}
						isLoading={buttonLoading}></DailyExmanationForm>
				)}
			</ScrollView>
			<Toast />
		</View>
	);
}
