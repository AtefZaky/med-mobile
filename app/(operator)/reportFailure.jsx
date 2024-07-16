import { Text, View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import {
	FormField,
	Header,
	Loader,
	MainButton,
	Select,
} from "../../components/index";
import React, { Component, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";
const ReportFailure = () => {
	const { user } = useGlobalContext();
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [formdata, setFormData] = useState({
		DepartmentID: "",
		StatusDate: "",
		AssetID: "",
		FailureِAction: " ",
		StatusID: "",
	});
	const assetsStatus = [
		{ option: "يعمل", id: "1" },
		{ option: "متوقف", id: "2" },
		{ option: "بلاغ", id: "3" },
		{ option: "عاطل", id: "4" },
		{ option: "عمرة", id: "5" },
		{ option: "لا يوجد", id: "6" },
	];
	const getAssets = async () => {
		const { data } = await api.get("/assets");
		if (data.success) {
			const transformedData = data.machines.map((item) => ({
				option: item.AssetName,
				id: item.AssetID,
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

	return (
		<SafeAreaView className="bg-white h-full">
			<ScrollView>
				<View>
					<Header title={"الابلاغ عن الاعطال"} />
				</View>

				{loader || !options.length ? (
					<Loader></Loader>
				) : (
					<View className=" flex  gap-6  p-4 pt-6 ">
						<View>
							<FormField
								value={formdata.StatusDate}
								onChange={(value) => {
									setFormData({ ...formdata, StatusDate: value });
								}}
								title={"التاريخ"}
								placeholder={"اختر التاريخ"}></FormField>
						</View>
						<View>
							<Select
								options={options}
								title={"المعدة"}
								placeHolder={"اختر المعدة"}
								setOption={(optionid) => {
									setFormData({
										...formdata,
										AssetID: optionid,
									});
								}}></Select>
						</View>
						<View>
							<Select
								options={assetsStatus}
								title={"حالة المعدة"}
								placeHolder={"اختر الحالة "}
								setOption={(optionid) => {
									setFormData({
										...formdata,
										StatusID: optionid,
									});
								}}></Select>
						</View>
						<View>
							<FormField
								value={formdata.StatusDate}
								onChange={(value) => {
									setFormData({ ...formdata, StatusDate: value });
								}}
								title={"الاجراء المتخذ قبل الابلاغ"}
								placeholder={"ادخل الاجراء"}></FormField>
						</View>

						<View>
							<MainButton title={"ارسال"}></MainButton>
						</View>
					</View>
				)}
				<Toast />
			</ScrollView>
		</SafeAreaView>
	);
};

export default ReportFailure;
