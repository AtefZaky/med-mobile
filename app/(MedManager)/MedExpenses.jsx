import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
	Dropdown,
	ErrorMassege,
	MainLayout,
	ScrollComponent,
} from "../../components";
import { useState } from "react";
import { getDropdownData } from "../../utils/getFunction";
import api from "../../utils/api";
import { Dimensions } from "react-native";
import { Pie, PolarChart } from "victory-native";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomDropDown from "../../components/UI/CustomDropDown";
const MedExpenses = () => {
	const { user } = useGlobalContext();
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});

	const [loader, setLoader] = useState(false);
	const [expensdata, setExpensData] = useState({});
	const [DepartmentData, setDepartmentData] = useState([]);
	const [selectedData, setSelectedData] = useState({
		YearID: new Date().getFullYear(),
		MonthID: 0,
		DepartmentID: user.DepartmentID,
	});

	const [yearData, setYearData] = useState([]);
	const month = [
		{ value: "الكل", key: 0 },
		{ value: "يناير", key: 1 },
		{ value: "فبراير", key: 2 },
		{ value: "مارس", key: 3 },
		{ value: "ابريل", key: 4 },
		{ value: "مايو", key: 5 },
		{ value: "يونيو", key: 6 },
		{ value: "يوليو", key: 7 },
		{ value: "اغسطس", key: 8 },
		{ value: "سبتمبر", key: 9 },
		{ value: "اكتوبر", key: 10 },
		{ value: "نوفمبر", key: 11 },
		{ value: "ديسمبر", key: 12 },
	];

	const fetchDataDropDowns = async () => {
		try {
			const deparments = await getDropdownData(
				`/list/department`,
				"DepartmentID",
				"DepartmentName"
			);
			const years = await getDropdownData(
				`/list/expense/years`,
				"YearID",
				"YearID"
			);
			setDepartmentData(deparments);
			setYearData(years);
		} catch (error) {
			console.log(error);
		}
	};
	const getExpenses = async () => {
		try {
			const data = await api.get(
				`/stats/expenses?YearID=${selectedData?.YearID}&MonthID=${selectedData?.MonthID}&DepartmentID=${selectedData?.DepartmentID}`
			);
			setExpensData(...data.data.data);
		} catch (error) {
			console.log(error.response.data.message);
		}
	};
	useEffect(() => {
		fetchDataDropDowns();
	}, []);
	useEffect(() => {
		getExpenses();
	}, [selectedData]);

	const colors = {
		Electricity: "#226F99",
		Fuel: "#82C1E3",
		Salary: "#58ACDA",
		SpareParts: "#D5EAF6",
	};
	const maxValue = Math.max(...Object.values(expensdata));

	const chartData = Object.keys(expensdata)
		.filter((key) => key !== "Total" && expensdata[key] != 0) // Only include non-zero values
		.map((key, index) => {
			const editedval = parseInt(expensdata[key]) / 100000;
			console.log(Math.floor(editedval + index));
			return {
				label: key, // The label for the slice
				value: Math.ceil(editedval + index), // The value for the slice
				color: colors[key], // Random color for each slice
			};
		});

	console.log(expensdata);
	return (
		<MainLayout
			loading={loader}
			title="مصاريف المصلحة"
			toast={toast}>
			<View className="px-4">
				<CustomDropDown
					placeHolder={"اختر المحطة "}
					data={DepartmentData}
					changeValue={(e) => {
						setSelectedData({ ...selectedData, DepartmentID: e });
					}}></CustomDropDown>
			</View>

			<ScrollComponent
				contentContainerStyle={{ padding: 16, paddingTop: 0 }}
				parentContainerStyle={"min-h-[73vh]"}>
				<View className="flex flex-row justify-between items-start ">
					<Dropdown
						parentStyle={"basis-[47%]"}
						placeholder={"اختر الشهر"}
						onChange={(e) => setSelectedData({ ...selectedData, MonthID: e })}
						data={month}></Dropdown>
					<Dropdown
						placeholder={"اختر السنة"}
						data={yearData}
						defaultOption={{
							key: selectedData.YearID,
							value: selectedData.YearID,
						}}
						parentStyle={"basis-[47%]"}
						onChange={(e) =>
							setSelectedData({ ...selectedData, YearID: e })
						}></Dropdown>
				</View>

				{Object.keys(expensdata).length > 0 ? (
					<>
						{Object.values(expensdata).every((val) => val === 0) ? (
							<>
								<ErrorMassege message=" لا يوجد بيانات" />
							</>
						) : (
							<>
								<View
									className="flex justify-center items-center mt-10"
									style={{ height: 300 }}>
									<View style={{ height: 300 }}>
										<PolarChart
											canvasStyle={{
												width: Dimensions.get("window").width - 20,
											}}
											data={chartData} // 👈 specify your data
											labelKey={"label"} // 👈 specify data key for labels
											valueKey={"value"} // 👈 specify data key for values
											colorKey={"color"} // 👈 specify data key for color
										>
											<Pie.Chart />
										</PolarChart>
									</View>
								</View>

								<View className="flex items-end ">
									<View className="flex justify-end items-center mt-10">
										<View className="flex flex-row-reverse items-center     ">
											<View
												className={`rounded-full w-3 h-3 `}
												style={{ backgroundColor: colors.Fuel }}></View>
											<Text className="font-tbold text-lg items-center flex">
												{" "}
												الوقود: {expensdata.Fuel}
											</Text>
										</View>
									</View>
									<View className="flex justify-end items-center mt-10">
										<View className="flex flex-row-reverse items-center     ">
											<View
												className={`rounded-full w-3 h-3 `}
												style={{ backgroundColor: colors.Electricity }}></View>
											<Text className="font-tbold text-lg items-center flex">
												{" "}
												الكهرباء: {expensdata.Electricity}
											</Text>
										</View>
									</View>
									<View className="flex justify-end items-center mt-10">
										<View className="flex flex-row-reverse items-center     ">
											<View
												className={`rounded-full w-3 h-3 `}
												style={{ backgroundColor: colors.Salary }}></View>
											<Text className="font-tbold text-lg items-center flex">
												{" "}
												المرتبات: {expensdata.Salary}
											</Text>
										</View>
									</View>
									<View className="flex justify-end items-center mt-10">
										<View className="flex flex-row-reverse items-center     ">
											<View
												className={`rounded-full w-3 h-3 `}
												style={{ backgroundColor: colors.SpareParts }}></View>
											<Text className="font-tbold text-lg items-center flex">
												{" "}
												قطع الغيار: {expensdata.SpareParts}
											</Text>
										</View>
									</View>
								</View>
							</>
						)}
					</>
				) : (
					<ErrorMassege message=" لا يوجد بيانات" />
				)}
			</ScrollComponent>
		</MainLayout>
	);
};

export default MedExpenses;
