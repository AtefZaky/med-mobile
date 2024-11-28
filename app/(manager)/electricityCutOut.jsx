import { View, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import {
	Table,
	MainButton,
	MainLayout,
	ScrollComponent,
	ErrorMassege,
} from "../../components";
import { icons } from "../../constants";
import { router } from "expo-router";
import api from "../../utils/api";

const electricityCutOut = () => {
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const fetchData = async () => {
		try {
			setLoader(true);
			const response = await api.get("/powerFailure");

			setData([...response.data.data]);
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

	const header = ["مدة انقطاع التيار", "وقت انقطاع التيار ", "التاريخ"];

	return (
		<MainLayout
			err={error}
			loading={loader}
			title={"انقطاع التيار"}
			toast={toast}>
			<ScrollComponent
				isLoading={loader}
				refreshingFunction={fetchData}>
				{data?.length ? (
					<Table
						header={header}
						routingfunction={(id) => {
							router.push(`electricityCutOutDetails/${id}`);
						}}
						electricityCutOut={true}
						data={data}
					/>
				) : (
					<ErrorMassege err="لا توجد بيانات" />
				)}
			</ScrollComponent>
			<View className="px-4 py-4 mb-[45px]">
				<MainButton
					icon={icons.pencil}
					iconStyles={"mr-4"}
					handlePress={() => {
						router.push("addElectricityCutOut");
					}}
					title={"اضافة "}></MainButton>
			</View>
		</MainLayout>
	);
};

export default electricityCutOut;
