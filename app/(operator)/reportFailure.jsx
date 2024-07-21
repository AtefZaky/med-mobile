import { View } from "react-native";

import { ScrollView } from "react-native-virtualized-view";

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import {
	FormField,
	Header,
	Loader,
	MainButton,
	Dropdown,
	DatePickerInput,
} from "../../components";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";

const ReportFailure = () => {
	const { user } = useGlobalContext();
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [isSubmitting, setSubmitting] = useState(false);
	const [formdata, setFormData] = useState({
		StatusDate: "",
		AssetID: "",
		FailureِAction: "",
		StatusID: "",
	});
	console.log(formdata);
	const assetsStatus = [
		{ value: "يعمل", key: "1" },
		{ value: "متوقف", key: "2" },
	];
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

	const submitData = async () => {
		try {
			const data = {
				DepartmentID: user.DepartmentID,
				StatusDate: formdata.StatusDate,
				AssetID: formdata.AssetID,
				FailureِAction: formdata.FailureِAction,
				StatusID: formdata.StatusID,
			};
			setSubmitting(true);
			const res = await api.post("/failure/report", data);
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
				setSubmitting(false);
				navigation.navigate("home");
			}, 1500);
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error("Response Error:", error.response.data);
			} else if (error.request) {
				// The request was made but no response was received
				console.error("Request Error:", error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error("Error:", error.message);
			}
		}
	};

	return (
		<View>
			<View>
				<Header title={"الابلاغ عن الاعطال"} />
			</View>

			{loader || !options.length ? (
				<Loader></Loader>
			) : (
				<View className=" flex  gap-6  p-4 pt-6 ">
					<View>
						<DatePickerInput
							setDate={(value) => {
								setFormData({ ...formdata, StatusDate: value });
							}}

					
					    />
					</View>
						<View>
							<Dropdown
								title={"المعدة"}
								data={options}
								placeholder={"اختر المعدة"}
								onChange={(key) => {
									setFormData({ ...formdata, AssetID: key });
								}}></Dropdown>
						</View>
						<View>
							<Dropdown
								title={"حالة المعدة"}
								data={assetsStatus}
								placeholder={"اختر الحالة  "}
								onChange={(optionid) => {
									setFormData({
										...formdata,
										StatusID: optionid,
									});
								}}></Dropdown>
						</View>
						<View>
							<FormField
								value={formdata.FailureِAction}
								handleChangeText={(value) => {
									setFormData({ ...formdata, FailureِAction: value });
								}}
								title={"الاجراء المتخذ قبل الابلاغ"}
								placeholder={"ادخل الاجراء"}
								></FormField>
						</View>

					<View>
						<MainButton
							title={"ارسال"}
							handlePress={submitData}
							isLoading={isSubmitting}></MainButton>
					</View>
				</View>
			)}
			<Toast />
		</View>
	);
};

export default ReportFailure;
