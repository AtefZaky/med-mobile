import { View } from "react-native";
import React from "react";
import {
	ErrorMassege,
	FailureDetailsHeaderItem,
	MainLayout,
	ScrollComponent,
	MainButton,
	PopUpConfirmation,
} from "../../../components";
import { router } from "expo-router";
import { icons } from "../../../constants";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import api from "../../../utils/api";
const electricityBillsDetails = () => {
	const { id } = useLocalSearchParams();
	const [filterdData, setFilterdData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const [Deleting, setDeleting] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		type: "",
		text: "",
		text2: "",
		counter: 0,
	});
	function transformeData(data) {
		const mapping = {
			MonthID: " الشهر",
			YearID: " السنة",
			meter_ID: "رقم العداد",
			Consumption: "الاستهلاك",
			Cost_consumption: "تكلفة الاستهلاك",
			Approximations: "فروق التقريبات",
			capacity: "مقابل القدرة",
			PFdif: "فرق معامل القدرة",
			PowerFactorCorrection: "تسوية معامل القدرة",
			CustomerService: "خدمة العملاء",
			Stamp: "الدمغة",
			Cost: "التكلفة",
			TotalBill: "إجمالي الفاتورة",
			memo: "ملاحظات",
			FixedInstallmentPayment: "الدفع بالقسط الثابت",
			PeakLoadAdjustment: "تسوية اقصي حمل",
		};

		return Object.keys(mapping).map((key) => ({
			title: mapping[key],
			value: data[key]?.toString(),
		}));
	}

	const fetchData = async () => {
		try {
			const response = await api.get("/electricityBill/" + id);

			setFilterdData(transformeData(response.data.data[0]));
			setData(response.data.data[0]);
			console.log(response.data.data[0]);
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

	const deleteElectricityBill = async () => {
		setDeleting(true);
		try {
			await api.delete(`/electricityBill/${id}`);
			setToast({
				type: "success",
				text2: "تم الحذف بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("electricityBills");
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

	const confirmElectricityCutOut = async () => {
		setConfirmationLoader(true);
		try {
			await api.patch(`electricityBill/${id}`, {
				StatusID: 4,
			});
			setToast({
				type: "success",

				text2: "تم التأكيد فاتورة بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("electricityBills");
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
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"نفاصيل فاتورة الكهرباء"}>
			<PopUpConfirmation
				confirmFunction={deleteElectricityBill}
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}></PopUpConfirmation>
			<ScrollComponent parentContainerStyle={"min-h-[85vh]"}>
				{filterdData.length ? (
					<>
						<View className=" p-4">
							<View className=" bg-[#E4E7EC] rounded-md p-4">
								{filterdData.map((item, index) => {
									return (
										<FailureDetailsHeaderItem
											key={index}
											data={item}
										/>
									);
								})}
							</View>
						</View>

						<View className={`${data.StatusID == 4 ? "hidden" : ""} p-4 mt-4 `}>
							<MainButton
								disabled={Deleting || confirmationLoader}
								handlePress={() => {
									router.navigate({
										pathname: "addElectricityBills",
										params: { id: JSON.stringify(id) },
									});
								}}
								icon={icons.pencil}
								title="تعديل"
							/>
							<View className="flex flex-row mt-4 ">
								<MainButton
									isLoading={Deleting}
									handlePress={() => {
										setModalVisible(true);
									}}
									containerStyles={" w-[48%] min-h-[50px] mr-2"}
									icon={icons.Trash}
									title="حذف"
									alternative={true}
								/>
								<MainButton
									isLoading={confirmationLoader}
									handlePress={() => {
										confirmElectricityCutOut();
									}}
									containerStyles={" w-[48%] min-h-[50px] mr-2"}
									icon={icons.ArrowUpRight}
									title="تاكيد"
								/>
							</View>
						</View>
					</>
				) : (
					<ErrorMassege err={"لا توجد بيانات"}></ErrorMassege>
				)}
			</ScrollComponent>
		</MainLayout>
	);
};

export default electricityBillsDetails;
