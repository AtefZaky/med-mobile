import { View, Text } from "react-native";
import React, { useCallback } from "react";
import {
	FailureDetailsHeaderItem,
	FormField,
	MainButton,
	MainLayout,
	PopUpConfirmation,
	ScrollComponent,
} from "../../../components";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { icons } from "../../../constants";
const ScheduleDetails = () => {
	const { id } = useLocalSearchParams();
	const [loader, setLoader] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	const [tranformedData, setTransformedData] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	function transformData(obj) {
		const keyToTitleMapping = {
			AssetName: "اسم المعدة",
			ScheduleDate: "تاريخ العمرة",
			ScheduleCause: "سبب العمرة",
			ScheduleTypeID: " نوع العمرة",
			FailureDate: "تاريخ العطل",
			PlannedContractors: " المقاولات المخطط",
			PlannedServices: "الخدمات المخططة",
			PlannedSpareParts: "قطع الغيار المخططة",
			PlannedWorkHours: "ساعات العمل المخططة",
			TotalPlanned: "الإجمالي المخطط",
			ActualContractorName: "اسم المقاول الفعلي",
			ActualSPstore: " قطع غيار مخزنية ",
			ActualSPpurchase: " قطع غيار مشتراة ",
			ActualExcuteDate: "تاريخ التنفيذ الفعلي",
			ActualServisesCost: "تكلفة الخدمات الفعلية",
			ActualWorkHours: "ساعات العمل الفعلية",
			ActualContractorCost: "تكلفة الاعمال الفعلية",
			TotalActual: "الإجمالي الفعلي",
		};

		const transformed = Object.keys(keyToTitleMapping).map((key) => ({
			title: keyToTitleMapping[key], // Fallback to key if no translation is found
			value:
				key == "ScheduleDate" ||
				key == "ActualExcuteDate" ||
				key == "FailureDate"
					? obj[key]?.split("T")[0]
					: key == "ScheduleTypeID" && obj[key] == 1
					? "مخططة"
					: key == "ScheduleTypeID" && obj[key] == 2
					? "غير مخططة"
					: obj[key]?.toString(),
		}));

		return transformed;
	}
	const getSchedule = async () => {
		try {
			setLoader(true);

			const response = await api.get("schedule/" + id);
			setData(response.data.data[0]);
			setTransformedData(transformData(response.data.data[0]));
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
			getSchedule();
		}, [])
	);

	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"تفاصيل العمرة"}>
			<ScrollComponent parentContainerStyle={"min-h-[85vh]"}>
				<View className="p-4">
					<View className="p-4 bg-[#E4E7EC] rounded-md">
						{tranformedData.map((item, index) => (
							<FailureDetailsHeaderItem
								labelStyle="w-[48%]"
								valueStyle="w-[48%] text-right"
								data={item}
								key={index}></FailureDetailsHeaderItem>
						))}
					</View>
				</View>

				<View
					className="p-4 flex flex-col "
					style={{ gap: 16 }}>
					<MainButton
						handlePress={() => {
							router.navigate({
								pathname: `Assesment/${id}`,
								params: {
									AssesmentType: 0,
									editable:
										data?.ActualExcuteDate || data.ScheduleTypeID == 2
											? false
											: true,
								},
							});
						}}
						icon={icons.pencil}
						title={"مقايسة تقديرة"}
					/>
					<MainButton
						alternative
						title={"اعمال فعلية "}
						icon={icons.BluePencil}
						handlePress={() => {
							router.navigate({
								pathname: `Assesment/${id}`,
								params: {
									AssesmentType: 1,
									editable:
										data.StatusID == 5 || !data?.ActualExcuteDate
											? false
											: true,
								},
							});
						}}
					/>
				</View>
			</ScrollComponent>
		</MainLayout>
	);
};

export default ScheduleDetails;
