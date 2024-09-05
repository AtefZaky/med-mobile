import { View, Text } from "react-native";
import React from "react";
import {
	Dropdown,
	ErrorMassege,
	MainButton,
	MainLayout,
	ScrollComponent,
	Table,
} from "../../components";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { icons } from "../../constants";
import api from "../../utils/api";

const Schedule = () => {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [YearID, setYearsID] = useState(2024);
	const [years, setYears] = useState([]);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});

	const getSchedule = async () => {
		try {
			const response = await api.get("schedule/?YearID=" + YearID);
			setData(response.data.data);
		} catch (error) {
			setError(error);
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text1: error.response.data.message || "خطأ",
				text2: "حدث خطأ الاتصال بالخادم",
			});
		}
	};
	const getScheduleYears = async () => {
		try {
			const response = await api.get("schedule/years");
			setYears(
				response?.data?.data?.map((item) => {
					return { key: item.YearID, value: item.YearID };
				})
			);
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message || false,
			});
		}
	};
	const header = ["اسم المعدة", "نوع العمرة", "التاريخ"];
	const fetchData = async () => {
		setLoader(true);
		await getSchedule();
		await getScheduleYears();
		setLoader(false);
	};
	useFocusEffect(
		useCallback(() => {
			fetchData();
			return () => {
				console.log("This route is now unfocused.");
			};
		}, [YearID])
	);

	return (
		<MainLayout
			loading={loader}
			toast={toast}
			title="العمرات">
			<View className="px-4 pb-4">
				<Dropdown
					placeholder={"اختر السنة"}
					onChange={(year) => {
						setYearsID(year);
					}}
					defaultOption={{ value: YearID, key: YearID }}
					data={years}></Dropdown>
			</View>
			<ScrollComponent parentContainerStyle={"min-h-[61vh]"}>
				{data?.length ? (
					<>
						<Table
							header={header.reverse()}
							Schedule={true}
							data={data}
							handlePress={(id) => {
								router.navigate(`Schedule/${id}`);
							}}
						/>
					</>
				) : (
					<ErrorMassege err={"لا توجد بينات"}></ErrorMassege>
				)}
			</ScrollComponent>
			<View className="p-4">
				<MainButton
					handlePress={() => {
						router.navigate("AddSchedule");
					}}
					icon={icons.pencil}
					title={"انشاء عمرة"}
				/>
			</View>
		</MainLayout>
	);
};

export default Schedule;
