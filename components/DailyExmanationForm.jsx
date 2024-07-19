import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import FormField from "./FormField";
import MainButton from "./MainButton";
import Dropdown from "./DropDown";
export default function DailyExmanationForm({
	options,
	isLoading,
	submitData,
}) {
	const [formdata, setFormData] = useState({
		ch_date: "",
		AssetID: "",
		ch_done: "",
		notes: "",
	});
	return (
		<View className=" flex flex-col  gap-6  p-4 pt-6">
			<View>
				<FormField
					value={formdata.ch_date}
					handleChangeText={(value) => {
						setFormData({ ...formdata, ch_date: value });
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
			</View>
			<View>
				<FormField
					value={formdata.ch_done}
					handleChangeText={(value) => {
						setFormData({ ...formdata, ch_done: value });
					}}
					title={"الاعمال التي تمت"}
					placeholder={"ادخل الاعمال التي تمت"}></FormField>
			</View>
			<View>
				<FormField
					value={formdata.notes}
					handleChangeText={(value) => {
						setFormData({ ...formdata, notes: value });
					}}
					title={"الملاحظات"}
					placeholder={"ادخل الملاحظات"}></FormField>
			</View>

			<View>
				<MainButton
					isLoading={isLoading}
					className="mt-3"
					title={"حفظ"}
					handlePress={() => {
						submitData(formdata);
					}}></MainButton>
			</View>
		</View>
	);
}
