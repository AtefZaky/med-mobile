import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import Dropdown from "./DropDown";
import FormField from "./FormField";
import api from "../utils/api";
import MainButton from "./MainButton";
import DatePickerInput from "./DatePickerInput";
import Toast from "react-native-toast-message";
export default function FailureForm({ setDataSent,id,setError,dataSent }) {
	const [submitting,setSubmitting]=useState(false)
	const [formData, setFormData] = useState({
		AssetID: id,
		FixDate: "",
		FailureAction: "",
		FailureReason: "",
		StatusID: "",
		Cost: "",
		Notes: "",
	});

	const submit = async () => {
		if (formData.AssetID === "" || formData.FixDate === ""||formData.FailureAction===""||formData.FailureReason===""||formData.Cost===""||formData.Notes===""||formData.StatusID==="") {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
				text2Style: {
					textAlign: "right",
				},
			});
			return; // Prevent form submission if fields are empty
		}

		setSubmitting(true);

		try {

			console.log(formData)
			const result = await api.post(`failure/repair/${id}`,formData)
			setDataSent(true)
			console.log(result)

		
		} catch (error) {
			setSubmitting(false);
			setError( error.message)
		}
	};

	const assetsStatus = [
		{ value: "يعمل", key: "1" },
		{ value: "متوقف", key: "2" },
	];
	return (
		<>
			
		<View className="gap-8 p-4">
			
			<View>
				<DatePickerInput
					setDate={(value) => {
						setFormData({ ...formData, FixDate: value });
					}}
				/>
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
			<View>

				<MainButton
				isLoading={dataSent||submitting}
				handlePress={submit}
					containerStyles={"m-auto mb-[170px] w-full"}
					title={"ارسال"}></MainButton>
			</View>
		</View></>
	);
}
