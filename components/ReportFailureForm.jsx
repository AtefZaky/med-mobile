import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import { Dropdown, FormField, DatePickerInput, MainButton } from "./index";
import { useGlobalContext } from "../context/GlobalProvider";
import api from "../utils/api";
import { icons } from "../constants";
import { getFormattedLocalDate } from "../utils/dateFormater";
const ReportFailureForm = ({
	submitData,
	options,
	assetsStatus,
	submitting,
}) => {
	const { user } = useGlobalContext();
	const [formdata, setFormData] = useState({
		DepartmentID: user.DepartmentID,
		StatusDate: `${getFormattedLocalDate()}`,
		AssetID: "",
		FailureAction: "",
		StatusID: "",
	});

	return (
		<>
			<View className="p-4">
				<DatePickerInput
					setDate={(value) => {
						setFormData({ ...formdata, StatusDate: value });
					}}
				/>
			</View>

			<View className="p-4">
				<Dropdown
					title={"المعدة"}
					data={options}
					placeholder={"اختر المعدة"}
					onChange={(key) => {
						setFormData({ ...formdata, AssetID: key });
					}}></Dropdown>
			</View>
			<View className="p-4">
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
			<View className="p-4">
				<FormField
					value={formdata.FailureAction}
					handleChangeText={(value) => {
						setFormData({ ...formdata, FailureAction: value });
					}}
					title={"الاجراء المتخذ قبل الابلاغ"}
					placeholder={"ادخل الاجراء"}></FormField>
			</View>
			<View className="mt-14 p-4">
				<MainButton
					icon={icons.ArrowUp}
					iconStyles={"mr-4"}
					title={"ارسال"}
					handlePress={() => {
						submitData(formdata);
					}}
					isLoading={submitting}></MainButton>
			</View>
		</>
	);
};

export default ReportFailureForm;
