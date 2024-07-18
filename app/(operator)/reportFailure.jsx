import { Text, View, Dimensions } from "react-native";

import { ScrollView } from "react-native-virtualized-view";

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";

import {
	FormField,
	Header,
	Loader,
	MainButton,
	Dropdown,
	Select,
} from "../../components";
import React, { Component, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";

const ReportFailure = () => {
	const { user } = useGlobalContext();
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [formdata, setFormData] = useState({
		StatusDate: "",
		AssetID: "",
		FailureِAction: "",
		StatusID: "",
	});

	const assetsStatus = [
		{ value: "يعمل", key: "1" },
		{ value: "متوقف", key: "2" },
		// { option: "بلاغ", id: "3" },
		// { option: "عاطل", id: "4" },
		// { option: "عمرة", id: "5" },
		// { option: "لا يوجد", id: "6" },
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
			const res = await api.post("/failure/report", data);

			navigation.navigate("home");
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
		<ScrollView>
			<View>
				<Header title={"الابلاغ عن الاعطال"} />
			</View>

			{loader || !options.length ? (
				<Loader></Loader>
			) : (
				<View className=" flex  gap-6  p-4 pt-6">
					<View>
						<FormField
							value={formdata.StatusDate}
							handleChangeText={(value) => {
								setFormData({ ...formdata, StatusDate: value });
							}}
							title={"التاريخ"}
							placeholder={"اختر التاريخ"}></FormField>
					</View>
					<View>
						<Dropdown
							title={"المعدة"}
							data={options}
							placeholder={"اختر المعدة"}
							onChange={(key) => {
								setFormData({ ...formdata, AssetID: key });
							}}></Dropdown>

						{/* <Select
							options={options}
							title={"المعدة"}
							placeHolder={"اختر المعدة"}
							setOption={(optionid) => {
								setFormData({
									...formdata,
									AssetID: optionid,
								});
							}}></Select> */}
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

						{/* <Select
							options={assetsStatus}
							title={"حالة المعدة"}
							placeHolder={"اختر الحالة "}
							setOption={(optionid) => {
								setFormData({
									...formdata,
									StatusID: optionid,
								});
							}}></Select> */}
					</View>
					<View>
						<FormField
							value={formdata.FailureِAction}
							handleChangeText={(value) => {
								setFormData({ ...formdata, FailureِAction: value });
							}}
							title={"الاجراء المتخذ قبل الابلاغ"}
							placeholder={"ادخل الاجراء"}></FormField>
					</View>

					<View>
						<MainButton
							title={"ارسال"}
							handlePress={submitData}></MainButton>
					</View>
				</View>
			)}
			<Toast />
		</ScrollView>
	);
};

export default ReportFailure;
