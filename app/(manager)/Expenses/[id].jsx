import { View, Text } from "react-native";
import api from "../../../utils/api";
import {
	MainButton,
	MainLayout,
	ScrollComponent,
	FailureDetailsHeaderItem,
	PopUpConfirmation,
} from "../../../components";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { icons } from "../../../constants";
const ExpensesDetails = () => {
	const { id } = useLocalSearchParams();
	const [data, setData] = useState([]);
	const [tranformedData, setTransformedData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
		modal: false,
	});
	const [Deleting, setDeleting] = useState(false);

	const MonthID = {
		1: "يناير",
		2: "فبراير",
		3: "مارس",
		4: "أبريل",
		5: "مايو",
		6: "يونيو",
		7: "يوليو",
		8: "أغسطس",
		9: "سبتمبر",
		10: "أكتوبر",
		11: "نوفمبر",
		12: "ديسمبر",
	};

	function convertObjectToTitleValue(obj) {
		const keyToTitleMapping = {
			YearID: "السنة",
			MonthID: "الشهر",
			Fuel: "وقود",
			Grease: "شحم",
			Lab: "مختبر",
			Oil: "زيت",
			Salary: "رواتب",
			SpareParts: "قطع غيار",
			Electricity: "كهرباء",
			StockItems: "مواد في المخزون",
			Capital: "رأس المال",
			Workshop: "ورشة",
			Others: "أخرى",
			Total: "المجموع",
		};

		return Object.keys(keyToTitleMapping).map((key) => ({
			title: keyToTitleMapping[key],
			value: key == "MonthID" ? MonthID[obj[key]] : obj[key],
		}));
	}

	const fetchData = async () => {
		try {
			const response = await api.get(`expenses/${id}`);
			setData(response.data.data[0]);
			setTransformedData(convertObjectToTitleValue(response.data.data[0]));
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: "حدث خطأ ما",
			});
		} finally {
			setLoader(false);
		}
	};
	const confirmExpenses = async () => {
		setConfirmationLoader(true);
		try {
			const response = await api.patch(`expenses/${id}`, { StatusID: 8 });
			setToast({
				type: "success",
				text2: "تم تأكيد المصروفات بنجاح",
				modal: false,
			});
			setTimeout(() => {
				router.navigate("Expenses");
			}, 1000);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: "حدث خطأ ما",
			});
		}
		setConfirmationLoader(false);
	};
	const deleteExpenses = async () => {
		setDeleting(true);
		try {
			const response = await api.delete(`expenses/${id}`);
			setToast({
				type: "success",
				text2: "تم الحذف بنجاح",
				modal: true,
			});
			setTimeout(() => {
				router.navigate("Expenses");
			}, 1000);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: "حدث خطأ ما",
			});
		}
		setDeleting(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"تفاصيل الفاتورة"}>
			<ScrollComponent parentContainerStyle={"min-h-[85vh]"}>
				<PopUpConfirmation
					confirmFunction={deleteExpenses}
					toast={toast}
					setModalVisible={setModalVisible}
					modalVisible={modalVisible}></PopUpConfirmation>
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
					{data.StatusID !== 8 && (
						<>
							<MainButton
								title={"تعديل "}
								icon={icons.pencil}
								handlePress={() => {
									router.navigate({
										pathname: "AddExpenses",
										params: { id: id },
									});
								}}></MainButton>

							<View
								className={`flex mt-4 flex-row ${
									data.StatusID == 8 ? "hidden" : ""
								}`}>
								<MainButton
									icon={icons.ArrowUpRight}
									title={"تأكيد "}
									containerStyles={" w-[48%] min-h-[50px] mr-2"}
									isLoading={confirmationLoader}
									disabled={Deleting}
									handlePress={() => {
										confirmExpenses();
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
		</MainLayout>
	);
};

export default ExpensesDetails;
