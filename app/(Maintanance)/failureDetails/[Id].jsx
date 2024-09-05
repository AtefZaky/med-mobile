import { View, Text, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import {
	ErrorMassege,
	FailureDetailsHeaderItem,
	MainButton,
	MainLayout,
	ScrollComponent,
	PopUpConfirmation,
} from "../../../components";
import { icons } from "../../../constants";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../../utils/api";
import { Image } from "expo-image";
const FailureDetails = () => {
	const { id } = useLocalSearchParams();
	const [loader, setLoader] = useState(true);
	const [filterdData, setFilterdData] = useState([]);
	const [data, setData] = useState([]);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [deletLoader, setDeletLoader] = useState(false);
	const [generateScheduleLoader, setGenerateScheduleLoader] = useState(false);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [modalVisible, setModalVisible] = useState(false);

	const getFailureDetails = async () => {
		try {
			const res = await api.get(`failure/${id}`);
			setFilterdData(transformObject(res.data.data[0]));
			setData(res.data.data[0]);
		} catch (error) {
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
	function transformObject(data) {
		return [
			{ title: "تاريخ العطل", value: data.FailureDate?.split("T")[0] },
			{ title: "المعدة ", value: data.AssetName },
			{ title: "التكلفة ", value: data.FixCost },
			{ title: "الملاحظات", value: data.Remarks },
		];
	}
	const deleFailure = async () => {
		setDeletLoader(true);
		try {
			await api.delete(`failure/${id}`);
			setToast({
				type: "success",
				text2: "تم الحذف بنجاح",
				counter: toast.counter + 1,
				modal: true,
			});

			setTimeout(() => {
				router.navigate("Failures");
			}, 1500);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
				modal: true,
			});
		} finally {
			setDeletLoader(false);
		}
	};
	const FailureConfrirmation = async () => {
		try {
			setConfirmationLoader(true);
			await api.patch(`failure/${id}`, {
				StatusID: 4,
			});
			setToast({
				type: "success",
				text2: "تم تأكيد العطل بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("Failures");
			}, 1500);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,

				counter: toast.counter + 1,
			});
		} finally {
			setConfirmationLoader(false);
		}
	};
	console.log(data);
	const screenWidth = Math.round(Dimensions.get("window").width) - 32;
	console.log(`w-[${screenWidth - 32}px]`);
	const createSchedule = async () => {
		try {
			setGenerateScheduleLoader(true);
			const res = await api.post(`failure/${id}`);
			setToast({
				type: "success",
				counter: toast.counter + 1,

				text2: "تم انشاء البلاغ بنجاح",
			});

			setTimeout(() => {
				router.navigate("Failures");
			}, 1500);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		} finally {
			setGenerateScheduleLoader(false);
		}
	};
	useEffect(() => {
		getFailureDetails();
	}, []);

	return (
		<MainLayout
			loading={loader}
			toast={toast}
			title={"تفاصيل العطل"}>
			<PopUpConfirmation
				toast={toast}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				confirmFunction={deleFailure}></PopUpConfirmation>
			<>
				{filterdData.length ? (
					<>
						<ScrollComponent
							parentContainerStyle={"min-h-[85vh]"}
							refreshingFunction={getFailureDetails}
							isLoading={loader}>
							<View className="p-4">
								<View className="p-4 bg-[#E4E7EC] rounded-md">
									{filterdData.map((item, index) => {
										return (
											<FailureDetailsHeaderItem
												key={index}
												data={item}></FailureDetailsHeaderItem>
										);
									})}
								</View>
							</View>
							<View className="w-full p-4 ">
								{!data.ImageUrl ? (
									<>
										<View className="bg-[#E4E7EC] w-full min-h-[15vh] rounded-md flex items-center justify-center ">
											<Text className="font-tbold text-lg">
												لا توجد صورة لهذا العطل
											</Text>
										</View>
									</>
								) : (
									<View className="w-full min-h-[20vh]  rounded-md flex items-center justify-center ">
										<Image
											style={{ width: screenWidth, height: 300 }}
											source={{
												width: screenWidth - 32,
												height: 400,
												uri: data.ImageUrl,
												scale: 1,
											}}
											contentFit="cover"
											className="rounded-md"
										/>
									</View>
								)}
							</View>
							<View className={`p-4 pt-0 ${data.IsGenerated ? "hidden" : ""}`}>
								<MainButton
									handlePress={() => {
										createSchedule();
									}}
									title={"انشاء عمرة"}
									isLoading={generateScheduleLoader}
									textStyles={"text-[#227099]"}
									disabled={deletLoader || confirmationLoader}
									containerStyles={"bg-white border border-[#227099] mt-4 "}
									icon={icons.BluePencil}></MainButton>

								<MainButton
									icon={icons.Wrench}
									title={"اصلاح العطل "}
									containerStyles={"mt-4"}
									disabled={deletLoader || confirmationLoader}
									handlePress={() => {
										router.navigate("FixFailure/" + id);
									}}></MainButton>

								{data.StatusID !== 4 && (
									<>
										<MainButton
											icon={icons.pencil}
											title={"تعديل "}
											containerStyles={"mt-4"}
											disabled={deletLoader || confirmationLoader}
											handlePress={() => {
												router.push({
													pathname: "AddFailure",
													params: { id: JSON.stringify(id) },
												});
											}}></MainButton>

										<View className="flex mt-4 flex-row">
											<MainButton
												icon={icons.ArrowUpRight}
												title={"تأكيد "}
												containerStyles={" w-[48%] min-h-[50px]  mr-2"}
												isLoading={confirmationLoader}
												disabled={deletLoader}
												handlePress={() => {
													FailureConfrirmation();
												}}></MainButton>
											<MainButton
												icon={icons.Trash}
												title={"حذف "}
												isLoading={deletLoader}
												disabled={confirmationLoader}
												textStyles={"text-[#227099]"}
												containerStyles={
													"bg-white border border-[#227099]  min-h-[50px]  w-[48%]"
												}
												handlePress={() => {
													setModalVisible(true);
												}}></MainButton>
										</View>
									</>
								)}
							</View>
						</ScrollComponent>
					</>
				) : (
					<ErrorMassege err={"لا توجد بيانات"}></ErrorMassege>
				)}
			</>
		</MainLayout>
	);
};

export default FailureDetails;
