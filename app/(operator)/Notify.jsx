import { View } from "react-native";
import { useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import {
	ErrorMassege,
	Loader,
	MainButton,
	MainLayout,
	ScrollComponent,
	Table,
} from "../../components";

import api from "../../utils/api";
import { router } from "expo-router";
import { icons } from "../../constants";
export default function OperationalReports() {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
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
			const response = await api.get("/notify");
			setData([...response.data.reports]);
		} catch (error) {
			setError(error);
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setLoader(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchData();
			return () => {};
		}, [])
	);

	const reportHeader = [" حالة المعدة", " تاريخ البلاغ", "المعدة"];

	return (
		<MainLayout
			loading={loader}
			toast={toast}
			title={" الابلاغ عن الاعطال "}>
			<ScrollComponent
				isLoading={loader}
				refreshingFunction={fetchData}>
				<>
					{data.length ? (
						<>
							<Table
								routingfunction={(id) => {
									router.navigate(`Notify/${id}`);
									console.log(id);
								}}
								OperatioalReports={true}
								data={data}
								header={reportHeader}
							/>
						</>
					) : (
						<ErrorMassege
							err={
								error ? "هناك  مشكلة في الاتصال" : "لاتوجد بلاغات"
							}></ErrorMassege>
					)}
				</>
			</ScrollComponent>
			<View className="px-4 py-8 mb-[45px] ">
				<MainButton
					icon={icons.pencil}
					iconStyles={"mr-4"}
					handlePress={() => {
						router.navigate("AddNotify");
					}}
					title={"بلاغ عن عطل جديد"}></MainButton>
			</View>
		</MainLayout>
	);
}
