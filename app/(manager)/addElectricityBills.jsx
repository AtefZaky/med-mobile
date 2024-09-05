import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
	MainButton,
	FormField,
	MainLayout,
	ScrollComponent,
	Dropdown,
	ErrorMassege,
} from "../../components";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";
import { router, useLocalSearchParams } from "expo-router";
import { toastMessege } from "../../constants";

const addElectricityBills = () => {
	let { id } = useLocalSearchParams("id");
	if (id) {
		id = JSON.parse(id);
	}
	const { user } = useGlobalContext();
	const [toast, setToast] = useState({
		text2: "",
		text1: "",
		type: "",
		counter: 0,
	});
	const [formFields, setFormFields] = useState({
		DepartmentID: user.DepartmentID,
		YearID: "",
		MonthID: "",
		meter_ID: "",
		Consumption: "",
		Cost: "",
		capacity: "",
		CustomerService: "",
		PFdif: "",
		Stamp: "",
		memo: "",
		FixedInstallmentPayment: "",
		Approximations: "",
		PowerFactorCorrection: "",
		PeakLoadAdjustment: "",
		Settlements: "",
		LightDiscount: "",
		StatusID: 0,
	});
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [submititng, setSubmitting] = useState(false);

	const transformData = (data) => {
		return data.map((item) => {
			return {
				key: item.meter_ID,
				value: item.meter_No,
			};
		});
	};

	const getMeter = async () => {
		try {
			const response = await api.get(`electricityBill/meter`);
			console.log(response.data.data);
			setData(transformData(response.data.data));
		} catch (error) {
			setToast({
				text2: error.response.data.message
					? error.response.data.message
					: false,
				type: "error",
				counter: toast.counter + 1,
			});
		}
	};

	const getBillData = async () => {
		try {
			const response = await api.get(`electricityBill/${id}`);
			const data = response.data.data[0];

			setFormFields({
				DepartmentID: user.DepartmentID,
				YearID: data.YearID,
				MonthID: data.MonthID,
				meter_ID: data.meter_ID?.toString(),
				Consumption: data.Consumption?.toString(),
				Cost: data.Cost?.toString(),
				capacity: data.capacity?.toString() || 0,
				CustomerService: data.CustomerService?.toString() || 0,
				PFdif: data.PFdif?.toString() || 0,
				Stamp: data.Stamp?.toString() || 0,
				memo: data.memo?.toString() || 0,
				FixedInstallmentPayment: data.FixedInstallmentPayment?.toString() || 0,
				Approximations: data.Approximations?.toString() || 0,
				PowerFactorCorrection: data.PowerFactorCorrection?.toString() || 0,
				PeakLoadAdjustment: data.PeakLoadAdjustment?.toString() || 0,
				Settlements: data.Settlements?.toString() || 0,
				LightDiscount: data.LightDiscount?.toString() || 0,
				StatusID: data.StatusID,
			});
		} catch (error) {
			setToast({
				text2: error.response.data.message
					? error.response.data.message
					: false,
				type: "error",
				counter: toast.counter + 1,
			});
		}
	};
	const submitData = async (confirm) => {
		if (!Object.keys(formFields).some((item) => formFields[item] == "")) {
			setToast({
				text2: toastMessege.dataFill,
				type: "error",
				counter: toast.counter + 1,
			});
			return;
		}
		try {
			if (confirm) {
				setConfirmationLoader(true);
			} else {
				setSubmitting(true);
			}
			console.log(formFields);
			if (id) {
				const response = await api.put(
					"electricityBill/" + id,
					confirm ? { ...formFields, StatusID: 4 } : formFields
				);
			} else {
				const response = await api.post(
					`electricityBill`,
					confirm ? { ...formFields, StatusID: 4 } : formFields
				);
			}
			setTimeout(() => {
				router.navigate("electricityBills");
			}, 1500);
			setToast({
				text2: "تم اضافة الفاتورة بنجاح",
				type: "success",
				counter: toast.counter + 1,
			});
		} catch (error) {
			setToast({
				text2: error.response.data.message
					? error.response.data.message
					: false,
				type: "error",
				counter: toast.counter + 1,
			});
		} finally {
			if (confirm) {
				setConfirmationLoader(false);
			} else {
				setSubmitting(false);
			}
		}
	};

	const monthsInArabic = [
		{ value: "يناير", key: 1 },
		{ value: "فبراير", key: 2 },
		{ value: "مارس", key: 3 },
		{ value: "أبريل", key: 4 },
		{ value: "مايو", key: 5 },
		{ value: "يونيو", key: 6 },
		{ value: "يوليو", key: 7 },
		{ value: "أغسطس", key: 8 },
		{ value: "سبتمبر", key: 9 },
		{ value: "أكتوبر", key: 10 },
		{ value: "نوفمبر", key: 11 },
		{ value: "ديسمبر", key: 12 },
	];
	const generateYears = () => {
		let years = [];
		for (let i = 2015; i <= new Date().getFullYear(); i++) {
			years.push({ value: i, key: i });
		}
		years = years.reverse();
		return years;
	};

	let years = generateYears();

	const fetchData = async () => {
		if (id) {
			await getBillData();
		}
		await getMeter();

		setLoader(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	console.log(formFields);
	return (
		<MainLayout
			loading={loader}
			toast={toast}
			title={"اضافة فاتورة كهرباء"}>
			{data.length > 0 ? (
				<>
					<ScrollComponent
						parentContainerStyle={"min-h-[76vh]"}
						contentContainerStyle={{
							display: "flex",
							gap: 16,
							flexDirection: "column",
							padding: 16,
							paddingTop: 24,
						}}>
						<Dropdown
							onChange={(key) => {
								setFormFields({ ...formFields, MonthID: key });
							}}
							defaultOption={
								id
									? {
											key: formFields.MonthID,
											value: monthsInArabic.find(
												(item) => item.key === formFields.MonthID
											).value,
									  }
									: null
							}
							data={monthsInArabic}
							placeholder={"اختر الشهر"}
							title={"الشهر"}></Dropdown>
						<Dropdown
							onChange={(key) => {
								setFormFields({ ...formFields, YearID: key });
							}}
							data={years}
							defaultOption={
								id ? { key: formFields.YearID, value: formFields.YearID } : null
							}
							placeholder={"اختر السنة"}
							title={" السنة"}></Dropdown>
						<Dropdown
							onChange={(key) => {
								setFormFields({ ...formFields, meter_ID: key });
							}}
							data={data}
							defaultOption={
								id
									? {
											key: formFields.meter_ID,
											value: data.find(
												(item) => item.key == formFields.meter_ID
											)?.value,
									  }
									: null
							}
							placeholder={"رقم العداد "}
							title={"رقم العداد"}></Dropdown>

						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, Consumption: text })
							}
							value={formFields.Consumption}
							placeholder={`استهلاك ك.وات `}
							title={" استهلاك ك.وات"}
						/>
						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, Cost: text })
							}
							value={formFields.Cost}
							placeholder={` سعر الاستهلاك  (جنية)`}
							title={"سعر الاستهلاك"}
						/>

						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, capacity: text })
							}
							value={formFields.capacity}
							placeholder={"مقابل القدرة"}
							title={"مقابل القدرة"}
						/>
						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, Stamp: text })
							}
							value={formFields.Stamp}
							placeholder={`دمغة `}
							title={"دمغة "}
						/>

						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, Settlements: text })
							}
							value={formFields.Settlements}
							placeholder={` التسويات `}
							title={"التسويات "}
						/>
						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, FixedInstallmentPayment: text })
							}
							value={formFields.FixedInstallmentPayment}
							placeholder={` ادخل قيمة القسط الثابت `}
							title={" ادخل قيمة القسط الثابت  "}
						/>

						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, LightDiscount: text })
							}
							value={formFields.LightDiscount}
							placeholder={`خصم الانارة `}
							title={"خصم الانارة  "}
						/>

						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, Approximations: text })
							}
							value={formFields.Approximations}
							placeholder={` فروق تقريب `}
							title={" فروق تقريب    "}
						/>

						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, CustomerService: text })
							}
							value={formFields.CustomerService}
							placeholder={"خدمة العملاء"}
							title={"خدمة العملاء"}
						/>
						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, PFdif: text })
							}
							value={formFields.PFdif}
							placeholder={"فرق معامل القدرة"}
							title={"فرق معامل القدرة"}
						/>
						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, PowerFactorCorrection: text })
							}
							value={formFields.PowerFactorCorrection}
							placeholder={"تسوية معامل القدرة"}
							title={"تسوية معامل القدرة"}
						/>
						<FormField
							numeric
							handleChangeText={(text) =>
								setFormFields({ ...formFields, PeakLoadAdjustment: text })
							}
							value={formFields.PeakLoadAdjustment}
							placeholder={"تسوية اقصى حمل  "}
							title={" تسوية اقصى حمل "}
						/>
						<FormField
							handleChangeText={(text) =>
								setFormFields({ ...formFields, memo: text })
							}
							value={formFields.memo}
							placeholder={`ملاحظات `}
							title={"ملاحظات "}
						/>
					</ScrollComponent>

					<View className="p-4 flex flex-row">
						<MainButton
							title={"حفط"}
							containerStyles={" w-[48%] min-h-[50px]  mr-2"}
							isLoading={submititng}
							icon={icons.ArrowUpRight}
							handlePress={() => {
								submitData();
							}}></MainButton>

						<MainButton
							title={"تأكيد"}
							icon={icons.BlueArrowUpRight}
							containerStyles={" w-[48%] min-h-[50px]  mr-2"}
							isLoading={confirmationLoader}
							alternative
							handlePress={() => {
								submitData(true);
							}}></MainButton>
					</View>
				</>
			) : (
				<ErrorMassege err={"لا توجد بيانات"}></ErrorMassege>
			)}
		</MainLayout>
	);
};

export default addElectricityBills;
