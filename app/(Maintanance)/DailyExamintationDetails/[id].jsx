import { View } from "react-native";
import React, { useState, useEffect } from "react";
import {
	ErrorMassege,
	FailureDetailsHeaderItem,
	MainButton,
	MainLayout,
	PopUp,
	PopUpConfirmation,
	ScrollComponent,
} from "../../../components";
import { icons } from "../../../constants";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../../utils/api";
const DailyExamintationDetails = () => {
	const [DailyExaminationDetails, setDailyExaminationDetails] = useState([]);
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const { id } = useLocalSearchParams();
	const [modalVisible, setModalVisible] = useState(false);
	const [deletLoader, setDeletLoader] = useState(false);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [generateNotiftLoader, setGenerateNotiftLoader] = useState(false);
	const [Toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	function transformObjectForComponent(data) {
		return [
			{ title: "تاريخ الفحص", value: data.CheckDate.split("T")[0] },
			{ title: " المعدة", value: data.AssetName },
			{ title: " الاعمال التي تمت", value: data.WorksDone },
			{ title: "الملاحظات ", value: data.CheckRemarks },
		];
	}

	const getDailyExaminationDetails = async () => {
		try {
			const res = await api.get(`check/${id}`);
			console.log(res.data.data[0], "from daily examination details");
			setData(res.data.data[0]);
			setDailyExaminationDetails(transformObjectForComponent(...res.data.data));
		} catch (error) {
			setToast({
				counter: Toast.counter + 1,
				type: "error",
			});
		} finally {
			setLoader(false);
		}
	};
	const generateNotift = async () => {
		setGenerateNotiftLoader(true);
		try {
			const res = await api.post(`check/${id}`);
			setToast({
				counter: Toast.counter + 1,
				type: "success",
				text2: "تم انشاء البلاغ بنجاح",
			});

			setTimeout(() => {
				router.navigate("DailyExaminationList");
			}, 1500);
		} catch (error) {
			setToast({
				counter: Toast.counter + 1,
				type: "error",
				text2: error.response.data.message,
			});
		} finally {
			setGenerateNotiftLoader(false);
		}
	};
	const deleteDailyExamination = async () => {
		try {
			await api.delete(`check/${id}`);
			setToast({
				counter: Toast.counter + 1,
				type: "success",
				text2: "تم حذف الفحص بنجاح",
				moadal: true,
			});
			setTimeout(() => {
				router.navigate("DailyExaminationList");
			}, 1500);
		} catch (error) {
			setToast({
				type: "error",
				counter: Toast.counter + 1,
				moadal: true,
				text2: error.response.data.message,
			});
		} finally {
			setDeletLoader(false);
		}
	};

	const DailyExaminationCofirmation = async () => {
		try {
			setConfirmationLoader(true);
			res = await api.patch(`check/${id}`, { StatusID: 4 });
			setToast({
				type: "success",
				text2: "تم تأكيد الفحص بنجاح",
				counter: Toast.counter + 1,
				moadal: true,
			});
			setTimeout(() => {
				router.navigate("DailyExaminationList");
			}, 1500);
		} catch (error) {
			setToast({
				type: "error",
				moadal: true,
				text2: error.response.data.message,
				counter: Toast.counter + 1,
			});
		} finally {
			setConfirmationLoader(false);
		}
	};
	useEffect(() => {
		getDailyExaminationDetails();
	}, []);

	return (
		<MainLayout
			loading={loader}
			toast={Toast}
			title="تفاصيل بينات الفحص اليومي">
			<PopUpConfirmation
				toast={Toast}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				confirmFunction={deleteDailyExamination}></PopUpConfirmation>
			<>
				{DailyExaminationDetails.length ? (
					<>
						<ScrollComponent
							isLoading={loader}
							refreshingFunction={getDailyExaminationDetails}>
							<View className="p-4">
								<View className="p-4 bg-[#F6F6F6] rounded-md">
									{DailyExaminationDetails.map((item, index) => (
										<FailureDetailsHeaderItem
											key={index}
											data={item}
										/>
									))}
								</View>
							</View>

							<View className={`px-3  ${data.IsGenerated ? "hidden" : ""}`}>
								<MainButton
									icon={icons.BluePencil}
									isLoading={generateNotiftLoader}
									disabled={deletLoader || confirmationLoader}
									handlePress={() => {
										generateNotift();
									}}
									title="انشاء بلاغ"
									containerStyles={"bg-white border mt-4 border-[#227099]  "}
									textStyles={"text-[#227099]"}
								/>

								{data.StatusID == 1 && (
									<>
										<MainButton
											icon={icons.pencil}
											title={"تعديل "}
											containerStyles={"mt-4"}
											disabled={deletLoader || confirmationLoader}
											handlePress={() => {
												router.navigate({
													pathname: "../AddDailyExamination",
													params: { id: JSON.stringify(id) },
												});
											}}></MainButton>

										<View className="flex mt-4 flex-row">
											<MainButton
												icon={icons.ArrowUpRight}
												title={"تأكيد "}
												containerStyles={" w-[48%] min-h-[50px]  mr-2"}
												isLoading={confirmationLoader}
												disabled={deletLoader || generateNotiftLoader}
												handlePress={() => {
													DailyExaminationCofirmation();
												}}></MainButton>
											<MainButton
												icon={icons.Trash}
												title={"حذف "}
												isLoading={deletLoader}
												disabled={confirmationLoader || generateNotiftLoader}
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
					<ErrorMassege err="لا توجد بيانات"></ErrorMassege>
				)}
			</>
		</MainLayout>
	);
};

export default DailyExamintationDetails;
