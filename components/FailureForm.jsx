import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "./DropDown";
import FormField from "./FormField";
import MainButton from "./MainButton";
export default function FailureForm({ setDataSent }) {
	const [formData, setFormData] = useState({
		AssetID: "",
		FixDate: "",
		FailureAction: "",
		FailureReason: "",
		StatusID: "",
		Cost: "",
		Notes: "",
	});

	const assetsStatus = [
		{ value: "يعمل", key: "1" },
		{ value: "متوقف", key: "2" },
	];
	return (
		<View className="gap-8">
			<View>
				<FormField
					title={"تاريخ الاصلاح"}
					placeholder={"اختر التاريخ"}
					value={formData.FixDate}
					handleChangeText={(value) => {
						setFormData({ ...formData, FixDate: value });
					}}></FormField>
			</View>
			<View>
				<FormField
					title={"الاجراء المتخذ"}
					placeholder={"ادخل الاجراء"}
					value={formData.FailureAction}
					handleChangeText={(value) => {
						setFormData({ ...formData, FailureAction: value });
					}}></FormField>
			</View>
			<View>
				<FormField
					title={"سبب العطل"}
					placeholder={"ادخل سبب العطل"}
					value={formData.FailureReason}
					handleChangeText={(value) => {
						setFormData({ ...formData, FailureReason: value });
					}}></FormField>
			</View>
			<View>
				<Dropdown
					title={"الحالة بعد الاصلاح"}
					data={assetsStatus}
					placeholder={"اختر الحالة"}
					onChange={(key) => {
						setFormData({ ...formData, StatusID: key });
					}}></Dropdown>
			</View>
			<View>
				<FormField
					title={"التكلفة"}
					placeholder={"ادخل التكلفى"}
					value={formData.Cost}
					handleChangeText={(value) => {
						setFormData({ ...formData, Cost: value });
					}}></FormField>
			</View>
			<View>
				<FormField
					title={"الملاحظات"}
					placeholder={"ادخل الملاحظات"}
					value={formData.Notes}
					handleChangeText={(value) => {
						setFormData({ ...formData, Notes: value });
					}}></FormField>
			</View>
			<MainButton
				containerStyles={"ml-8 mt-[68px] mb-4 w-[93%]"}
				title={"ارسال"}></MainButton>
		</View>
	);
}
