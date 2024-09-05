import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
	MainLayout,
	ErrorMassege,
	ScrollComponent,
	FailureDetailsHeaderItem,
	MainButton,
	PopUpConfirmation,
} from "../../../components";
import { useLocalSearchParams, router } from "expo-router";

import api from "../../../utils/api";
import { icons } from "../../../constants";
const electricityCutOutDetails = () => {
	const [loader, setLoader] = useState(true);
	const { id } = useLocalSearchParams();
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [tranformedData, setTransformedData] = useState([]);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [Deleting, setDeleting] = useState(false);
	function transformData(data) {
		const mapping = {
			Date: "التاريخ",
			backtime: "وقت الرجوع",
			cut_duration: "مدة الانقطاع",
			cut_reason: "سبب الانقطاع",
			cuttime: "وقت الانقطاع",
			discharge_back: "طرد بعد ",
			discharge_cut: "طرد قبل ",
			no_circle: "رقم الدائرة",
			suction_back: "المص بعد",
			suction_cut: "المص قبل",
		};
		return Object.keys(mapping).map((key) => ({
			title: mapping[key],
			value: mapping[key] == "التاريخ" ? data[key].split("T")[0] : data[key],
		}));
	}

	const fetchData = async () => {
		try {
			const response = await api.get(`powerFailure/${id}`);
			setData(response.data.data[0]);
			setTransformedData(transformData(response.data.data[0]));
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
	const deleteElectricityCutOut = async () => {
		try {
			setDeleting(true);
			await api.delete(`powerFailure/${id}`);
			setToast({
				type: "success",
				text2: "تم الحذف بنجاح",

				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("electricityCutOut");
			}, 1500);
		} catch (error) {
			setError(error);
			setToast({
				type: "error",

				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		} finally {
			setDeleting(false);
		}
	};
	const electricityCutOutConfrirmation = async () => {
		try {
			setConfirmationLoader(true);
			const res = await api.patch(`powerFailure/${id}`, {
				StatusID: 4,
			});
			setToast({
				type: "success",

				text2: "تم التأكيد  بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("electricityCutOut");
			}, 1500);
		} catch (error) {
			setError(error);
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"تفاصيل انقطاع التيار"}>
			<PopUpConfirmation
				confirmFunction={deleteElectricityCutOut}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}></PopUpConfirmation>
			{tranformedData?.length ? (
				<ScrollComponent parentContainerStyle={"min-h-[85vh]"}>
					<View className=" p-4">
						<View className=" bg-[#E4E7EC] rounded-md p-4">
							{tranformedData.map((item, index) => {
								return (
									<FailureDetailsHeaderItem
										key={index}
										data={item}
									/>
								);
							})}
						</View>
					</View>
					<View className=" p-4 ">
						{data.StatusID !== 4 && (
							<>
								<MainButton
									title={"تعديل "}
									icon={icons.pencil}
									handlePress={() => {
										router.navigate({
											pathname: "addElectricityCutOut",
											params: { id: id },
										});
									}}></MainButton>

								<View
									className={`flex mt-4 flex-row ${
										data.StatusID == 4 ? "hidden" : ""
									}`}>
									<MainButton
										icon={icons.ArrowUpRight}
										title={"تأكيد "}
										containerStyles={" w-[48%] min-h-[50px] mr-2"}
										isLoading={confirmationLoader}
										disabled={Deleting}
										handlePress={() => {
											electricityCutOutConfrirmation();
										}}></MainButton>
									<MainButton
										icon={icons.Trash}
										title={"حذف "}
										isLoading={Deleting}
										alternative
										disabled={confirmationLoader}
										textStyles={"text-[#227099]"}
										containerStyles={" ml-2 min-h-[50px]  w-[48%]"}
										handlePress={() => {
											setModalVisible(true);
										}}></MainButton>
								</View>
							</>
						)}
					</View>
				</ScrollComponent>
			) : (
				<ErrorMassege err="هناك مشكلة بالخادم  " />
			)}
		</MainLayout>
	);
};

export default electricityCutOutDetails;
