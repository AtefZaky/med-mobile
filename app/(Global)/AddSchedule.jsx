import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
	DatePickerInput,
	Dropdown,
	FormField,
	MainLayout,
	ScrollComponent,
	MainButton,
	ItemControrlList,
} from "../../components";
import { useState } from "react";
import api from "../../utils/api";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { toastMessege } from "../../constants";
import { router } from "expo-router";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../utils/dateFormater";
const AddSchedule = () => {
	const { user } = useGlobalContext();
	const [loader, setLoader] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	const [scheduleType, setScheduleType] = useState(1);
	const [spareParts, setSpareParts] = useState([]);
	const [options, setOptions] = useState([]);
	const [selectedspareParts, setSelectedspareParts] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [assets, setAssets] = useState([]);
	const [formData, setFormData] = useState({
		DepartmentID: user.DepartmentID,
		AssetID: "",
		ScheduleDate: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		YearID: "",
		ScheduleCause: "",
		PlannedWorkHours: "",
		PlannedServices: "",
	});
	const [years, setYears] = useState([]);
	const [selectedDrppdownOption, setSelectedDrppdownOption] = useState("");
	const SchdeuelState = [
		{ value: "مخططة", key: 1 },
		{ value: "غير مخططة", key: 2 },
	];

	const changeDropDown = (value) => {
		setSelectedDrppdownOption(value);
	};

	const addItem = () => {
		if (selectedDrppdownOption === "") return;
		const flag = selectedspareParts.some(
			(item) => item.ItemID === selectedDrppdownOption
		);
		if (flag) {
			return;
		} else {
			const selected = spareParts.find(
				(item) => item.ItemID === selectedDrppdownOption
			);
			selected.counter = 1;

			setSelectedspareParts([...selectedspareParts, selected]);
		}
	};

	const removeItem = (itemID) => {
		const newItems = selectedspareParts.filter(
			(item) => itemID !== item.ItemID
		);
		setSelectedspareParts(newItems);
	};

	const incrmentCounter = (itemid) => {
		const data = selectedspareParts.map((item) => {
			return item.ItemID == itemid
				? { ...item, counter: item.counter + 1 }
				: item;
		});

		setSelectedspareParts(data);
	};
	const decrementCounter = (itemid) => {
		setSelectedspareParts(
			selectedspareParts.map((item) =>
				item.ItemID == itemid && item.counter > 1
					? { ...item, counter: item.counter - 1 }
					: item
			)
		);
	};

	const transFormOptions = (data, title, ID) => {
		const tranformedData = data.map((item) => {
			return {
				value: item?.[title],
				key: item?.[ID],
			};
		});
		return tranformedData;
	};
	const getSpareParts = async () => {
		try {
			const { data } = (await api.get(`/failure/spare/list`)).data;
			setSpareParts(data);
			setOptions(transFormOptions(data, "ItemName", "ItemID"));
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text1: error.response.data.message || "خطأ",
				text2: "حدث خطأ الاتصال بالخادم",
			});
		}
	};
	const getAssets = async () => {
		try {
			const { Assets } = (await api.get(`/departments`)).data;
			setAssets(transFormOptions(Assets, "AssetName", "AssetID"));
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text1: error.response.data.message || "خطأ",
				text2: "حدث خطأ الاتصال بالخادم",
			});
		}
	};

	const createSchedule = async () => {
		if (formData.ScheduleDate == "" || formData.AssetID == "") {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: toastMessege.dataFill,
			});
			return;
		}
		let data = {};
		Object.keys(formData).forEach((item) => {
			data[item] =
				formData[item] == "" &&
				item !== "DepartmentID" &&
				item !== "ScheduleCause"
					? 0
					: formData[item];
		});
		console.log({
			formData: { ...data, scheduleType: scheduleType },
			spareParts: selectedspareParts,
		});

		try {
			setSubmitting(true);

			const response = await api.post(
				`/schedule/`,
				scheduleType == 1
					? {
							formData: { ...data, ScheduleTypeID: scheduleType },
							spareParts: selectedspareParts,
					  }
					: { formData: { ...data, ScheduleTypeID: scheduleType } }
			);

			setToast({
				counter: toast.counter + 1,
				type: "success",
				text2: "تم اضافة العمرة بنجاح",
			});
			setTimeout(() => {
				router.navigate("Schedule");
			}, 1000);
		} catch (error) {
			console.log(error);
			setToast({
				counter: toast.counter + 1,
				type: "error",

				text2: error.response.data.message,
			});
		} finally {
			setSubmitting(false);
		}
	};

	const getSchedule = async () => {
		try {
			setLoader(true);
			const response = await api.get("schedule");
			setData(response.data.data);
		} catch (error) {
			setError(error);
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text1: error.response.data.message || "خطأ",
				text2: "حدث خطأ الاتصال بالخادم",
			});
		} finally {
			setLoader(false);
		}
	};
	const fetchData = async () => {
		await getAssets();
		await getSpareParts();
		setLoader(false);
	};
	useEffect(() => {
		fetchData();
		let years = [];
		for (
			let i = new Date().getFullYear();
			i <= new Date().getFullYear() + 5;
			i++
		) {
			years.push(i);
		}
		setYears(years);
	}, []);

	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"اضافة عمرة"}>
			<ScrollComponent
				contentContainerStyle={{
					display: "flex",
					gap: 16,
					padding: 16,
					flexDirection: "coulmn",
				}}>
				<DatePickerInput
					title={"تاريخ العمرة"}
					setDate={(value) => {
						setFormData({ ...formData, ScheduleDate: value });
					}}
				/>
				<Dropdown
					onChange={(value) => {
						setFormData({ ...formData, AssetID: value });
					}}
					placeholder={"اختر المعدة"}
					data={assets}
					title={"المعدة"}
				/>

				<Dropdown
					data={SchdeuelState}
					placeholder={"اختر نوع العمرة"}
					value={scheduleType}
					onChange={(value) => {
						setScheduleType(value);
					}}
					defaultOption={SchdeuelState[0]}
					title={"نوع العمرة"}
				/>

				{scheduleType == 1 ? (
					<>
						<Dropdown
							data={years}
							title={"السنه"}
							placeholder={"اختر السنه"}
							onChange={(value) => {
								setFormData({ ...formData, YearID: value });
							}}
						/>
						<FormField
							value={formData.PlannedWorkHours}
							title={"عدد السعات التقريبية"}
							handleChangeText={(e) => {
								setFormData({ ...formData, PlannedWorkHours: e });
							}}
							placeholder={"ادخل عدد الساعات"}
						/>
						<FormField
							value={formData.PlannedServices}
							title={"الخدمات التقريبية"}
							placeholder={" ادخل الخدمات التقريبية  "}
							handleChangeText={(e) => {
								setFormData({ ...formData, PlannedServices: e });
							}}
						/>

						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-start",
								justifyContent: "flex-start",
								columnGap: 8,
							}}>
							<MainButton
								handlePress={addItem}
								title={"+"}
								textStyles={"text-3xl "}
								containerStyles="w-[56px] min-h-[56px] mt-[26px]"
							/>
							<Dropdown
								parentStyle={"w-[82%]"}
								title={" قطع الغيار"}
								data={options}
								placeholder={"اختر قطعة غيار"}
								onChange={changeDropDown}
							/>
						</View>

						{selectedspareParts.length > 0 ? (
							<ScrollComponent parentContainerStyle={" min-h-[20vh]"}>
								{selectedspareParts.map((item, index) => {
									return (
										<ItemControrlList
											key={index}
											data={item}
											removeItem={removeItem}
											incrment={incrmentCounter}
											decrement={decrementCounter}
										/>
									);
								})}
							</ScrollComponent>
						) : (
							<View className="min-h-[20vh] "></View>
						)}
					</>
				) : (
					<>
						<FormField
							handleChangeText={(e) => {
								setFormData({ ...formData, ScheduleCause: e });
							}}
							title={"سبب العمرة"}
							placeholder={"ادخل سبب العمرة"}
						/>
					</>
				)}
			</ScrollComponent>
			<View className="p-4">
				<MainButton
					title="حفظ"
					handlePress={() => {
						createSchedule();
					}}
					icon={icons.ArrowUpRight}
					isLoading={submitting}
				/>
			</View>
		</MainLayout>
	);
};

export default AddSchedule;
