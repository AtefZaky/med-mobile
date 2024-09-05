import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../../utils/api";
import {
	FailureDetailsHeaderItem,
	ErrorMassege,
	MainButton,
	MainLayout,
	PopUpConfirmation,
} from "../../../components";
import { icons } from "../../../constants";

function NotifyDetails() {
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [error, setError] = useState(null);
	const [filterdData, setFilterdData] = useState([]);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [generateFailureLoader, setGenerateFailureLoader] = useState(false);
	const { id } = useLocalSearchParams();
	const [modalVisible, setModalVisible] = useState(false);
	const [Deleting, setDeleting] = useState(false);

	const fetchData = async () => {
		try {
			const response = await api.get(`notify/${id}`);

			const data = response.data.reports[0];

			setData(data);

			setFilterdData([
				{ title: "المعدة", value: data.AssetName },
				{ title: "الحالة", value: data.AssetStatus == 1 ? "يعمل" : "متوقف" },
				{ title: "التاريخ", value: data.FailureDate.split("T")[0] },
				{ title: "الوصف", value: data.FailureDescription },
			]);
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
			setLoader(false);
		}
	};

	const confirmNotify = async () => {
		try {
			setConfirmationLoader(true);
			await api.patch(`notify/${id}`, {
				StatusID: 4,
			});
			setToast({
				type: "success",

				text2: "تم تأكيد البلاغ بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("Notify");
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
			setConfirmationLoader(false);
		}
	};

	const deletNotify = async () => {
		try {
			setDeleting(true);
			await api.delete(`notify/${id}`);
			setToast({
				type: "success",

				text2: "تم حذف بنجاح",
				counter: toast.counter + 1,
				modal: true,
			});
			setTimeout(() => {
				router.navigate("Notify");
			}, 1500);
		} catch (error) {
			setError(error);
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,

				modal: true,
				counter: toast.counter + 1,
			});
		} finally {
			setDeleting(false);
		}
	};
	const generateFailure = async () => {
		try {
			setGenerateFailureLoader(true);
			const res = await api.post(`notify/failure/${id}`);
			setToast({
				type: "success",
				text2: "تم انشاء البلاغ بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("Notify");
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
			setGenerateFailureLoader(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"تفاصيل البلاغ"}>
			<View>
				<PopUpConfirmation
					toast={toast}
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					confirmFunction={deletNotify}></PopUpConfirmation>

				{!filterdData.length ? (
					<>
						<ErrorMassege err={"لا توجد بينات لهذا البلاغ"}></ErrorMassege>
					</>
				) : (
					<View>
						<View className="p-4  ">
							<View className="bg-[#E4E7EC] p-2 pb-4  rounded-md">
								{filterdData.map((item, index) => {
									return (
										<FailureDetailsHeaderItem
											data={item}
											key={index}
										/>
									);
								})}
							</View>
						</View>

						<View
							className={`px-3 ${
								data.IsGenerated || data.StatusID == 4 ? "hidden" : ""
							}`}>
							<MainButton
								icon={icons.BluePencil}
								isLoading={generateFailureLoader}
								disabled={Deleting || confirmationLoader}
								handlePress={() => {
									generateFailure();
								}}
								title="انشاء عطل"
								containerStyles={"bg-white border mt-4 border-[#227099]  "}
								textStyles={"text-[#227099]"}
							/>
							<MainButton
								icon={icons.pencil}
								title={"تعديل "}
								containerStyles={"mt-4"}
								disabled={
									Deleting ||
									confirmationLoader ||
									data.IsGenerated ||
									data.StatusID == 4
								}
								handlePress={() => {
									router.push({
										pathname: "../AddNotify",
										params: { id: JSON.stringify(id) },
									});
								}}></MainButton>

							<View className="flex mt-4 flex-row">
								<MainButton
									icon={icons.ArrowUpRight}
									title={"تأكيد "}
									containerStyles={" w-[48%] min-h-[50px]  mr-2"}
									isLoading={confirmationLoader}
									disabled={Deleting || data.IsGenerated || data.StatusID == 4}
									handlePress={() => {
										confirmNotify();
									}}></MainButton>
								<MainButton
									icon={icons.Trash}
									title={"حذف "}
									isLoading={Deleting}
									disabled={
										confirmationLoader || data.IsGenerated || data.StatusID == 4
									}
									textStyles={"text-[#227099]"}
									containerStyles={
										"bg-white border border-[#227099]  min-h-[50px]  w-[48%]"
									}
									handlePress={() => {
										setModalVisible(true);
									}}></MainButton>
							</View>
						</View>
					</View>
				)}
			</View>
		</MainLayout>
	);
}

export default NotifyDetails;
