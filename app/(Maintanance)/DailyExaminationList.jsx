import { View, Text, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
import { router } from "expo-router";
import { MainLayout, MainButton, Table, ErrorMassege } from "../../components";
import { icons } from "../../constants";
import { ScrollComponent } from "../../components";
import api from "../../utils/api";
import { useFocusEffect } from "expo-router";

const DailyExaminationList = () => {
	const headr = ["تاريخ الفحص ", "المعدة"];
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const [Toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const getDailyExaminationList = async () => {
		try {
			const res = await api.get("check");
			setData([...res.data.data]);
		} catch (error) {
			setToast({
				counter: Toast.counter + 1,
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
			getDailyExaminationList();
			return () => {};
		}, [])
	);

	return (
		<MainLayout
			toast={Toast}
			loading={loader}
			title={"بيانات الفحص اليومي"}>
			<>
				{data.length ? (
					<>
						<ScrollComponent
							refreshingFunction={getDailyExaminationList}
							isLoading={loader}>
							<Table
								header={headr}
								routingfunction={(id) => {
									router.push(`DailyExamintationDetails/${id}`);
								}}
								DailyExaminationList={true}
								data={data}
							/>
						</ScrollComponent>
						<View className="px-4 py-4 mb-[45px]">
							<MainButton
								icon={icons.pencil}
								iconStyles={"mr-4"}
								handlePress={() => {
									router.push("AddDailyExamination");
								}}
								title={"اضافة"}></MainButton>
						</View>
					</>
				) : (
					<>
						<ErrorMassege err={"لا توجد بيانات"}></ErrorMassege>
					</>
				)}
			</>
		</MainLayout>
	);
};

export default DailyExaminationList;
