import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
	Header,
	Table,
	MainButton,
	MainLayout,
	ScrollComponent,
	ErrorMassege,
} from "../../components";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import api from "../../utils/api";

const electricityBills = () => {
	const header = ["الاستهلاك", "اجمالي الفاتورة", "الشهر"];
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const fetchData = async () => {
		try {
			setLoader(true);
			const response = await api.get("/electricityBill");
			setData(response.data.data);
		} catch (error) {
			setError(error.response.data.message);
			setToast({
				type: "error",

				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		} finally {
			setLoader(false);
		}
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
			loading={loader}
			title={"فواتير الكهرباء"}>
			<ScrollComponent
				isLoading={loader}
				refreshingFunction={fetchData}>
				{data?.length ? (
					<>
						<Table
							header={header}
							routingfunction={(id) => {
								router.push(`electricityBillsDetails/${id}`);
							}}
							electricityBills={true}
							data={data}
						/>
					</>
				) : (
					<>
						<ErrorMassege err="لا توجد بيانات"></ErrorMassege>
					</>
				)}
			</ScrollComponent>
			<View className="px-4 py-4 mb-[45px]">
				<MainButton
					icon={icons.pencil}
					iconStyles={"mr-4"}
					handlePress={() => {
						router.push("addElectricityBills");
					}}
					title={"اضافة "}></MainButton>
			</View>
		</MainLayout>
	);
};

export default electricityBills;
