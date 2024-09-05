import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
	ErrorMassege,
	MainButton,
	MainLayout,
	PopUpConfirmation,
	ScrollComponent,
	Table,
} from "../../../components";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { icons } from "../../../constants";
import PopupCreateAssesment from "../../../components/UI/PopupCreateAssesment";
import api from "../../../utils/api";

const Assesment = () => {
	const { id, AssesmentType, editable, showToast } = useLocalSearchParams();
	const [createAssesmentModel, setCreateAssesmentModel] = useState(false);

	const [data, setData] = useState([]);
	const [editContract, setEditContract] = useState(false);
	const [popUpConfirmation, setPopUpConfirmation] = useState(false);
	const [ScheduleItemID, setScheduleItemID] = useState(null);
	console.log(AssesmentType);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	const [loading, setLoading] = useState(false);

	const submitData = async (formData, ScheduleItemID) => {
		if (
			!formData.ItemName ||
			!formData.ItemCount ||
			!formData.ItemCost ||
			!formData.ItemUnit
		) {
			setToast({
				type: "error",
				counter: toast.counter + 1,
				text2: "الرجاء ملء جميع الحقول",
				modal: true,
			});
			return;
		}

		try {
			if (ScheduleItemID) {
				const response = await api.put(`contr	act/${ScheduleItemID}`, {
					...formData,
					IsPlanned: AssesmentType,
					ScheduleID: id,
				});

				const newData = data.filter(
					(item) => item.ScheduleItemID !== contractID
				);
				setData([...newData, formData]);
			} else {
				const response = await api.post(`contract/`, {
					...formData,
					IsPlanned: AssesmentType,
					ScheduleID: id,
				});
				setData([...data, formData]);
			}

			setToast({ type: "success", counter: toast.counter + 1, modal: true });
			setTimeout(() => {
				setCreateAssesmentModel(false);
			}, 1000);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message,
				counter: toast.counter + 1,
				modal: true,
			});
		}
	};
	const deleteAssesment = async () => {
		try {
			const response = await api.delete(
				`contract/${ScheduleItemID}?IsPlanned=${AssesmentType}&ScheduleID=${id}`
			);

			setToast({
				type: "success",
				counter: toast.counter + 1,
				text2: " تم الحذف البند بنجاح",
			});
			const newData = data.filter(
				(item) => item.ScheduleItemID !== ScheduleItemID
			);
			setData(newData);
			setTimeout(() => {
				setPopUpConfirmation(false);
			}, 1000);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message,
				counter: toast.counter + 1,
				modal: true,
			});
		}
	};
	const getContract = async () => {
		setLoading(true);
		try {
			const response = await api.get(`contract/${id}?type=${AssesmentType}`);
			setData(response.data.data);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message,
				counter: toast.counter + 1,
				modal: false,
			});
		} finally {
			setLoading(false);
		}
	};
	useFocusEffect(
		useCallback(() => {
			getContract();
		}, [])
	);
	const header = ["البند ", "السعر للوحدة", "الكمية"];

	return (
		<MainLayout
			loading={loading}
			toast={toast}
			title={AssesmentType == 1 ? "مقايسة تقديرية" : "اعمال فعلية "}>
			<PopUpConfirmation
				confirmFunction={() => {
					deleteAssesment(ScheduleItemID);
				}}
				toast={toast}
				setModalVisible={setPopUpConfirmation}
				modalVisible={popUpConfirmation}></PopUpConfirmation>
			<PopupCreateAssesment
				data={editContract}
				submitData={submitData}
				toast={toast}
				setModalVisible={setCreateAssesmentModel}
				modalVisible={createAssesmentModel}
			/>
			<ScrollComponent>
				{data.length > 0 ? (
					<Table
						data={data}
						header={header.reverse()}
						Assesment
						handlePress={(data) => {
							console.log(editable, "editable");
							if (editable == "true") {
								setEditContract(data);
								setCreateAssesmentModel(true);
							} else {
								if (showToast != "false") {
									setToast({
										type: "error",
										text2: "لا يمكن التعديل",
										counter: toast.counter + 1,
										modal: false,
									});
								}
							}
						}}
						LongPress={(id) => {
							if (editable == "true") {
								setScheduleItemID(id);
								setPopUpConfirmation(true);
							} else {
								if (showToast != "false") {
									setToast({
										type: "error",
										text2: "لا يمكن التعديل",
										counter: toast.counter + 1,
										modal: false,
									});
								}
							}
						}}
					/>
				) : (
					<ErrorMassege err={"لا توجد بنود"}></ErrorMassege>
				)}
			</ScrollComponent>
			{editable == "true" ? (
				<View className="p-4">
					<MainButton
						title={"اضافة"}
						icon={icons.pencil}
						handlePress={() => {
							setEditContract(null);
							setCreateAssesmentModel(true);
						}}
					/>
				</View>
			) : (
				<></>
			)}
		</MainLayout>
	);
};

export default Assesment;
