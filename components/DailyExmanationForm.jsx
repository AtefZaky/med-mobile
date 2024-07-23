import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useState } from "react";
import FormField from "./FormField";
import MainButton from "./MainButton";
import Dropdown from "./DropDown";
import DatePickerInput from "./DatePickerInput";
import { getFormattedLocalDate } from "../utils/dateFormater";
import { icons } from "../constants";
export default function DailyExmanationForm({
	options,
	isLoading,
	submitData,
}) {
	const [formdata, setFormData] = useState({
		ch_date: `${getFormattedLocalDate()}`,
		AssetID: "",
		ch_done: "",
		notes: "",
	});

	return (
		<>
			<View className="pt-4 pb-6 px-4 mx-auto">
				<DatePickerInput
					setDate={(value) => {
						setFormData({ ...formdata, ch_date: value });
					}}
				/>
			</View>
			<View className="pb-6 px-4 ">
				<Dropdown
					title={"المعدة"}
					data={options}
					placeholder={"اختر المعدة"}
					onChange={(key) => {
						setFormData({ ...formdata, AssetID: key });
					}}></Dropdown>
			</View>
			<View className="pb-6 px-4 ">
				<FormField
					value={formdata.ch_done}
					handleChangeText={(value) => {
						setFormData({ ...formdata, ch_done: value });
					}}
					title={"الاعمال التي تمت"}
					placeholder={"ادخل الاعمال التي تمت"}></FormField>
			</View>
			<View className="pb-6 px-4">
				<FormField
					value={formdata.notes}
					handleChangeText={(value) => {
						setFormData({ ...formdata, notes: value });
					}}
					title={"الملاحظات"}
					placeholder={"ادخل الملاحظات"}></FormField>
			</View>

			<View className="pb-6 px-3">
				<MainButton
					isLoading={isLoading}
					icon={icons.ArrowUpRight}
					iconStyles={"mr-4"}
					containerStyles={"mt-4  "}
					title={"حفظ"}
					handlePress={() => {
						submitData(formdata);
					}}></MainButton>
			</View>
		</>
	);
}
