import { View, Text } from "react-native";
import React from "react";
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
import { useLocalSearchParams, router } from "expo-router";
import { icons } from "../../../constants";
import { useGlobalContext } from "../../../context/GlobalProvider";
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
	const [startScheduleLoader, setStartScheduleLoader] = useState(false);
	const [tranformedData, setTransformedData] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [deletLoader, setDeletLoader] = useState(false);
	const { user } = useGlobalContext();
	const [confirmationLoader, setConfirmationLoader] = useState(false);
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

			const response = await api.get(
				"schedule/" + id + "?DepartmentID=" + user.selectedDepartmentID
			);
			setData(response.data.data[0]);
			console.log(response.data.data[0].AssetName);
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
	const deleteSchedule = async () => {
		setDeletLoader(true);
		try {
			await api.delete(`schedule/${id}`);
			setToast({
				counter: toast.counter + 1,
				type: "success",
				text2: "تم الحذف بنجاح",
			});
			setTimeout(() => {
				router.navigate("Schedule");
			}, 1000);
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setDeletLoader(false);
		}
	};
	const startSchedule = async () => {
		setStartScheduleLoader(true);
		try {
			const res = await api.patch(`schedule/start/${id}`);

			setToast({
				counter: toast.counter + 1,
				type: "success",
				text2: "تم بدأ العمرة بنجاح",
			});
			setTimeout(() => {
				router.navigate("Schedule");
			}, 1000);
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setStartScheduleLoader(false);
		}
	};

	const confirmSchedule = async () => {
		setConfirmationLoader(true);
		try {
			const res = await api.patch(`schedule/${id}`);
			setToast({
				counter: toast.counter + 1,
				type: "success",
				text2: "تم تأكيد العمرة بنجاح",
			});
			setTimeout(() => {
				router.navigate("Schedule");
			}, 1000);
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setConfirmationLoader(false);
		}
	};

	useEffect(() => {
		getSchedule();
	}, []);
	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"تفاصيل العمرة"}>
			<PopUpConfirmation
				toast={toast}
				confirmFunction={deleteSchedule}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>

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
					className="flex flex-col p-4"
					style={{ gap: 16 }}>
					<MainButton
						icon={icons.ClipboardText}
						title={"تفاصيل العمرة "}
						handlePress={() => {
							router.navigate(
								`ScheduleData/${id}` + "?ScheduleTypeID=" + data.ScheduleTypeID
							);
						}}
						isLoading={startScheduleLoader}
						disabled={confirmationLoader || deletLoader}></MainButton>
					{data.StatusID != 5 && data.ActualExcuteDate ? (
						<>
							<View className="">
								<MainButton
									alternative
									title={"انهاء العمرة"}
									icon={icons.BlueArrowUpRight}
									handlePress={() => {
										router.navigate("FinishSchedule/" + id);
									}}></MainButton>
							</View>
						</>
					) : (
						<></>
					)}

					{data.StatusID != 5 ? (
						<>
							<MainButton
								title={"اضافة صورة "}
								alternative
								handlePress={() => {
									router.navigate("AddScheduleImage/" + id);
								}}
								icon={icons.Camera}></MainButton>
						</>
					) : (
						<></>
					)}

					{!data.ActualExcuteDate && data.StatusID != 5 ? (
						<>
							<MainButton
								icon={icons.Wrench}
								title={"بدأ العمرة"}
								handlePress={() => {
									startSchedule();
								}}
								isLoading={startScheduleLoader}
								disabled={confirmationLoader || deletLoader}></MainButton>
							<MainButton
								icon={icons.Trash}
								title={"حذف "}
								isLoading={deletLoader}
								alternative={true}
								disabled={startScheduleLoader || confirmationLoader}
								handlePress={() => {
									setModalVisible(true);
								}}></MainButton>
						</>
					) : (
						<></>
					)}
				</View>
			</ScrollComponent>
		</MainLayout>
	);
};

export default ScheduleDetails;
