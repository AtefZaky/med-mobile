import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import Dropdown from "./DropDown";
import FormField from "./FormField";
import MainButton from "./MainButton";
import DatePickerInput from "./DatePickerInput";
import { icons } from "../constants";
import { getFormattedLocalDate } from "../utils/dateFormater";
export default function FailureForm({ id, submit, assetsStatus }) {
	const [submitting, setSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		AssetID: id,
		FixDate: `${getFormattedLocalDate()}`,
		FailureAction: "",
		FailureReason: "",
		StatusID: "",
		Cost: "",
		Notes: "",
	});

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
						numeric={true}
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
						isLoading={submitting}
						handlePress={() => {
							submit(formData, setSubmitting);
						}}
						icon={icons.ArrowUp}
						iconStyles={"mr-4"}
						containerStyles={"m-auto mb-[170px] w-full"}
						title={"ارسال"}></MainButton>
				</View>
			</View>
		</>
	);
}
