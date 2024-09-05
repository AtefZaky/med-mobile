import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { icons } from "../../constants";
import { Image } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment-timezone";

const DatePickerInput = ({ setDate, title, defaultDate }) => {
	const [selectedDate, setSelectedDate] = useState(
		defaultDate ? new Date(defaultDate) : new Date()
	);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const _selectDate = async () => {
		setShowDatePicker(true);
	};

	const onDateChange = (event, date) => {
		setShowDatePicker(false);
		if (date) {
			const date1 = new Date(date);

			setSelectedDate(date);

			const cairoTime = moment(date)
				.tz("Africa/Cairo")
				.format("YYYY-MM-DD HH:mm:ss");

			setDate(cairoTime);
		}
	};

	return (
		<View style={styles.container}>
			<Padding>
				<Text style={styles.label}> {title ? title : " أدخل التاريخ "} </Text>
			</Padding>
			<SizedBox height={8} />
			<TouchableOpacity
				onPress={_selectDate}
				className="flex-row-reverse justify-between items-center"
				style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={selectedDate.toISOString().substring(0, 10)}
					editable={false}
					placeholder="أدخل التاريخ"
					placeholderTextColor="#aaa"
				/>
				{/* <TouchableOpacity onPress={_selectDate}> */}
				<Image
					source={icons.Calender}
					style={{ width: 20, height: 20, marginLeft: 8 }}
					resizeMode="contain"
				/>
			</TouchableOpacity>
			{/* </TouchableOpacity> */}
			{showDatePicker && (
				<DateTimePicker
					value={selectedDate}
					mode="date"
					timeZoneName={"Africa/Cairo"}
					display="default"
					minimumDate={new Date(2022, 0, 1)}
					onChange={onDateChange}
					customStyles={{
						placeholderText: {
							color: "green", // Changse the placeholder text color
						},
					}}
				/>
			)}
		</View>
	);
};

const Padding = ({ children }) => (
	<View style={styles.padding}>{children}</View>
);

const SizedBox = ({ height }) => <View style={{ height: height }} />;

const Icon = ({ name, size, color }) => (
	<Text style={{ fontSize: size, color }}>{name}</Text>
);

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	padding: {},
	label: {
		fontSize: 14,
		fontFamily: "Tajawal-Bold",
	},
	inputContainer: {
		flexDirection: "row-reverse",

		alignItems: "center",
		width: "100%",
		borderRadius: 8,
		height: 56,
		paddingHorizontal: 8,
		borderWidth: 0.5,
		borderColor: "#227099",
		paddingVertical: 8,
	},
	input: {
		padding: 8,

		border: "4px solid #fff",
		fontSize: 14,
		fontFamily: "Tajawal-Medium",
		color: "black",
	},
});

export default DatePickerInput;
