import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
	Dropdown,
	MainLayout,
	MainButton,
	ErrorMassege,
	ScrollComponent,
	ItemControrlList,
	FormField,
	DatePickerInput,
} from "../../../components";
import api from "../../../utils/api";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "../../../constants";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../../utils/dateFormater";
import { toastMessege } from "../../../constants";

const FixFailure = () => {
	const { id } = useLocalSearchParams();
	const [loader, setLoader] = useState(true);
	const [spareParts, setSpareParts] = useState([]);
	const [options, setOptions] = useState([]);
	const [selectedDrppdownOption, setSelectedDrppdownOption] = useState("");
	const [selectedspareParts, setSelectedspareParts] = useState([]);
	const [formdata, setFormData] = useState({
		StatusIDAfter: "",
		FixDate: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		FixCost: "",
		FailureReason: "",
		FailureAction: "",
		FailureID: id,
		Remarks: "",
	});
	console.log(selectedspareParts);

	const [assetsStatus, setAssetsStatus] = useState([]);

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
			console.log(item.ItemID == itemid);
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

	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	const [submitting, setSubmitting] = useState(false);
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
		setLoader(true);
		try {
			const { data } = (await api.get(`/failure/spare/list`)).data;
			setSpareParts(data);
			setOptions(transFormOptions(data, "ItemName", "ItemID"));
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		}
	};
	const getAssetStatus = async () => {
		try {
			const { data } = await api.get("assets/status/menu");

			setAssetsStatus(transFormOptions(data.items, "StatusName", "StatusID"));
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		}
	};
	const submitData = async () => {
		if (
			formdata.FixCost == "" ||
			formdata.FailureAction == 0 ||
			formdata.FailureReason == "" ||
			formdata.StatusIDAfter == ""
		) {
			setToast({
				type: "error",
				text2: toastMessege.dataFill,
				counter: toast.counter + 1,
			});
			return;
		}
		try {
			setSubmitting(true);
			const res = await api.patch(`failure/repair/${id}`, {
				...formdata,
				spareParts: selectedspareParts,
			});
			setToast({
				type: "success",
				text2: "تم ارسال البيانات",
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
			setSubmitting(false);
		}
	};
	const fetchData = async () => {
		await getSpareParts();
		await getAssetStatus();
	};

	useEffect(() => {
		fetchData();
		setLoader(false);
	}, []);
	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title="اصلاح العطل">
			<ScrollComponent
				contentContainerStyle={{ display: "flex", gap: 16, padding: 16 }}
				parentContainerStyle={"min-h-[76vh]"}>
				<DatePickerInput
					title={"ادخل تاريخ الاصلاح"}
					setDate={(value) => {
						setFormData({ ...formdata, FixDate: value });
					}}
				/>

				<Dropdown
					data={assetsStatus}
					onChange={(key) => {
						setFormData({ ...formdata, StatusIDAfter: key });
					}}
					title={"الحالة بعد الاصلاح"}
					placeholder={"اختر الحالة"}
				/>

				<FormField
					value={formdata.FailureAction}
					title={"الاجراء المتخذ"}
					placeholder={"ادخل الاجراء "}
					handleChangeText={(value) => {
						setFormData({ ...formdata, FailureAction: value });
					}}
				/>

				<FormField
					value={formdata.FailureReason}
					title={" سبب العطل"}
					placeholder={" ادخل سبب العطل "}
					handleChangeText={(value) => {
						setFormData({ ...formdata, FailureReason: value });
					}}
				/>

				<FormField
					value={formdata.FixCost}
					title={"التكلفة"}
					numeric
					placeholder={" ادخل التكلفة "}
					handleChangeText={(value) => {
						setFormData({ ...formdata, FixCost: value });
					}}
				/>

				<FormField
					value={formdata.Remarks}
					title={"الملاحظات"}
					placeholder={" ادخل الملاحظات"}
					handleChangeText={(value) => {
						setFormData({ ...formdata, Remarks: value });
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
			</ScrollComponent>

			<View className="p-4">
				<MainButton
					title={"تأكيد"}
					handlePress={submitData}
					icon={icons.ArrowUpRight}
					isLoading={submitting}
				/>
			</View>
		</MainLayout>
	);
};

export default FixFailure;
