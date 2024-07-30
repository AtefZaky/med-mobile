import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import React, { useEffect, useState } from "react";
import { Header, Loader, Table } from "../../components";
import { formatDate } from "../../utils/dateFormater";
import api from "../../utils/api";
import { ScrollView } from "react-native-virtualized-view";
import { cairoTimeConverter } from "../../utils/dateFormater";
import { Counter } from "../../utils/counterFunctions";
const AssetsOperations = () => {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const assetsOperationHeader = [
		"عدد ساعات التشغيل من  بدء التشغيل",
		"ايقاف",
		"بدء",
		"اسم المعدة",
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getData();
				setData(data.data.machines);
				console.log(data.data.machines);
				setLoader(false);
			} catch (error) {
				console.error("Error fetching data: ", error);
			}
		};
		fetchData();
	}, []);

	const getData = async () => {
		const response = await api.get("/assets");
		return response;
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
			console.log(error);
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
			console.log(error);
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

	return (
		<View className="bg-white min-h-[103vh]">
			<Toast />
			<Header title="تشغيل و ايقاف الوحدات" />
			<View className="flex justify-center p-6	">
				<Text className="font-tmedium text-base text-center">
					{formatDatee(new Date())}
				</Text>
			</View>
			{!loader ? (
				<View>
					{data.length ? (
						<ScrollView className=" max-h-[80vh]">
							<Table
								assetsOperation={true}
								header={assetsOperationHeader}
								data={data}
								onStartMachine={handleStart}
								onCloseMachine={handleEnd}
							/>
						</ScrollView>
					) : (
						<View className="flex justify-center p-4 mt-4">
							<Text className="font-tbold text-lg text-center">
								لا يوجد معدات
							</Text>
						</View>
					)}
				</View>
			) : (
				<Loader isLoading={loader}></Loader>
			)}
		</View>
	);
};

export default AssetsOperations;
