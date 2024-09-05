import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import {
	MainLayout,
	MainButton,
	ScrollComponent,
	FormField,
	Dropdown,
} from "../../components";
import api from "../../utils/api";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons, toastMessege } from "../../constants";
import { router, useLocalSearchParams } from "expo-router";
const AddExpenses = () => {
	let { id } = useLocalSearchParams("id");
	if (id) {
		id = JSON.parse(id);
	}
	const [years, setYears] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useGlobalContext();
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [FormFields, setFormField] = useState({
		DepartmentID: user.DepartmentID,
		YearID: "",
		MonthID: "",
		Salary: "",
		Oil: "",
		Grease: "",
		Fuel: "",
		SpareParts: "",
		StockItems: "",
		Workshop: "",
		Lab: "",
		Capital: "",
		Others: "",
		StatusID: 0,
	});
	console.log(user);
	const MonthID = [
		{ value: "يناير", key: 1 },
		{ value: "فبراير", key: 2 },
		{ value: "مارس", key: 3 },
		{ value: "ابريل", key: 4 },
		{ value: "مايو", key: 5 },
		{ value: "يونيو", key: 6 },
		{ value: "يوليو", key: 7 },
		{ value: "اغسطس", key: 8 },
		{ value: "سبتمبر", key: 9 },
		{ value: "اكتوبر", key: 10 },
		{ value: "نوفمبر", key: 11 },
		{ value: "ديسمبر", key: 12 },
	];
	console.log(FormFields);
	useEffect(() => {
		let YearID = [];
		for (let i = 2015; i <= new Date().getFullYear(); i++) {
			YearID.push({ value: i, key: i });
		}
		setYears(YearID.reverse());
	}, []);
	const getExpenses = async () => {
		setLoading(true);
		try {
			const data = (await api.get("/expenses/" + id)).data.data[0];

			setFormField({
				DepartmentID: user.DepartmentID,
				YearID: data?.YearID,
				MonthID: data?.MonthID,
				Salary: data?.Salary?.toString(),
				Oil: data.Oil?.toString(),
				Grease: data.Grease?.toString(),
				Fuel: data.Fuel?.toString(),
				SpareParts: data.SpareParts?.toString(),
				StockItems: data.StockItems?.toString(),
				Workshop: data.Workshop?.toString(),
				Lab: data.Lab?.toString(),
				Capital: data.Capital?.toString(),
				Others: data.Others?.toString(),
				StatusID: data.StatusID?.toString(),
			});
			console.log(data);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setLoading(false);
		}
	};

	const addExpenses = async (confirm) => {
		if (
			FormFields.YearID === "" ||
			FormFields.MonthID === "" ||
			FormFields.Salary === "" ||
			FormFields.Oil === "" ||
			FormFields.Grease === "" ||
			FormFields.Fuel === ""
		) {
			setToast({
				type: "error",
				text2: toastMessege.dataFill,
			});
		}
		const data = FormFields;
		Object.keys(data).forEach((key) => {
			if (FormFields[key] === "") {
				data[key] = null;
			}
		});

		if (confirm) {
			setConfirmationLoader(true);
		} else {
			setSubmitting(true);
		}
		try {
			let res;
			if (id) {
				res = await api.put(
					"/expenses/" + id,
					confirm ? { ...data, StatusID: 8 } : data
				);
			} else {
				res = await api.post(
					"/expenses",
					confirm ? { ...data, StatusID: 8 } : data
				);
			}

			setToast({
				type: "success",
				text2: "تمت اضافة المصروفات بنجاح",
			});
			setTimeout(() => {
				router.navigate("Expenses");
			}, 1500);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			if (confirm) {
				setConfirmationLoader(true);
			} else {
				setSubmitting(true);
			}
		}
	};
	useEffect(() => {
		if (id) {
			getExpenses();
		}
	}, []);

	return (
		<MainLayout
			loading={loading}
			toast={toast}
			title={"اضافة مصروفات"}>
			<ScrollComponent
				contentContainerStyle={{ padding: 16, display: "flex", gap: 16 }}>
				<Dropdown
					title={"السنة"}
					placeholder={"اختر السنة"}
					data={years}
					defaultOption={
						id ? { value: FormFields.YearID, key: FormFields.YearID } : ""
					}
					onChange={(ch) => {
						setFormField({ ...FormFields, YearID: ch });
					}}
				/>
				<Dropdown
					title={"الشهر"}
					placeholder={"اختر الشهر"}
					defaultOption={
						id
							? {
									value: MonthID[FormFields.MonthID - 1]?.value,
									key: FormFields.MonthID,
							  }
							: null
					}
					data={MonthID}
					onChange={(ch) => {
						setFormField({ ...FormFields, MonthID: ch });
					}}
				/>
				<FormField
					title={"مرتبات"}
					value={FormFields.Salary}
					placeholder={"ادخل قيمة المرتبات"}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Salary: e });
					}}
				/>
				<FormField
					title={"الزيوت"}
					placeholder={"ادخل قيمة الزيوت"}
					value={FormFields.Oil}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Oil: e });
					}}
				/>
				<FormField
					title={"الشحوم"}
					placeholder={"ادخل قيمة الشحوم"}
					value={FormFields.Grease}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Grease: e });
					}}
				/>
				<FormField
					title={"وقود"}
					placeholder={"ادخل قيمة الوقود"}
					value={FormFields.Fuel}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Fuel: e });
					}}
				/>
				<FormField
					title={"قطع غيار"}
					placeholder={"ادخل قيمة قطع الغيار"}
					value={FormFields.SpareParts}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, SpareParts: e });
					}}
				/>
				<FormField
					title={" مهمات مخازن"}
					value={FormFields.StockItems}
					placeholder={"ادخل قيمة مهمات المخازن"}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, StockItems: e });
					}}
				/>
				<FormField
					title={"مهمات الورشة"}
					value={FormFields.Workshop}
					placeholder={"ادخل قيمة الورشة"}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Workshop: e });
					}}
				/>
				<FormField
					title={"مهمات المعمل"}
					placeholder={"ادخل قيمة المعمل"}
					value={FormFields.Lab}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Lab: e });
					}}
				/>
				<FormField
					title={"رأس المال"}
					value={FormFields.Capital}
					placeholder={"ادخل قيمة رأس المال"}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Capital: e });
					}}
				/>
				<FormField
					title={"اخرى"}
					placeholder={"ادخل قيمة الاخرى"}
					value={FormFields.Others}
					handleChangeText={(e) => {
						setFormField({ ...FormFields, Others: e });
					}}
				/>
			</ScrollComponent>
			<View
				className="p-4 flex flex-row"
				style={{ gap: 16 }}>
				<MainButton
					handlePress={() => addExpenses()}
					icon={icons.ArrowUpRight}
					loading={submitting}
					disabled={confirmationLoader}
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					title={"حفظ"}></MainButton>
				<MainButton
					alternative
					loading={confirmationLoader}
					disabled={submitting}
					handlePress={() => addExpenses(true)}
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					icon={icons.BlueArrowUpRight}
					title={"تأكيد"}></MainButton>
			</View>
		</MainLayout>
	);
};

export default AddExpenses;
