import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import {
	ErrorMassege,
	MainLayout,
	ScrollComponent,
	Table,
} from "../../components";
import { formatDate } from "../../utils/dateFormater";
import api from "../../utils/api";

import { cairoTimeConverter } from "../../utils/dateFormater";

const AssetsOperations = () => {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const assetsOperationHeader = [
		"عدد ساعات التشغيل من  بدء التشغيل",
		"ايقاف",
		"بدء",
		"اسم المعدة",
	];

	const getData = async () => {
		const response = await api.get("/assets");
		return response;
	};
	const fetchData = async () => {
		try {
			const data = await getData();
			setData(data.data.machines);

			setLoader(false);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		}
	};

	const handleStart = async (id) => {
		try {
			const date = new Date();
			const currentDate = formatDate(new Date(cairoTimeConverter(date)));
			api.put(`/assets/${id}`, {
				StatusID: 1,
				StatusDate: currentDate,
			});
			return true;
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
			return false;
		}
	};

	const handleEnd = async (id) => {
		try {
			const date = new Date();
			const currentDate = formatDate(new Date(cairoTimeConverter(date)));
			api.put(`/assets/${id}`, {
				StatusID: 2,
				StatusDate: currentDate,
			});
			return true;
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,

				counter: 0,
			});
			return false;
		}
	};

	const formatDatee = (date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1; // Months are zero-indexed
		const year = date.getFullYear();

		// Ensure day and month are two digitsW
		const formattedDay = day < 10 ? `0${day}` : day;
		const formattedMonth = month < 10 ? `0${month}` : month;

		return `${formattedDay}-${formattedMonth}-${year}`;
	};
	useFocusEffect(
		useCallback(() => {
			fetchData();
			return () => {
				console.log("This route is now unfocused.");
			};
		}, [])
	);

	return (
		<MainLayout
			toast={toast}
			title={"تشغيل و ايقاف الوحدات"}
			loading={loader}>
			<View className="flex justify-center p-6">
				<Text className="font-tmedium text-base text-center">
					{formatDatee(new Date())}
				</Text>
			</View>
			{data.length ? (
				<ScrollComponent
					isLoading={loader}
					refreshingFunction={getData}>
					<Table
						assetsOperation={true}
						header={assetsOperationHeader}
						data={data}
						onStartMachine={handleStart}
						onCloseMachine={handleEnd}
					/>
				</ScrollComponent>
			) : (
				<ErrorMassege err={"لا يوجد معدات"} />
			)}
		</MainLayout>
	);
};

export default AssetsOperations;
