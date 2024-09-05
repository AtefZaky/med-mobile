import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
	FormField,
	MainButton,
	MainLayout,
	ScrollComponent,
	Dropdown,
	ItemControrlList,
} from "../../../components";
import { useState } from "react";
import { icons } from "../../../constants";
import { toastMessege } from "../../../constants";
import { router } from "expo-router";
import api from "../../../utils/api";
import { useLocalSearchParams } from "expo-router";
const FinishSchedule = () => {
	const { id } = useLocalSearchParams();
	const [submitting, setSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		ScheduleID: id,
		ActualWorkHours: "",
		ActualServisesCost: "",
		ActualContractorName: "",
	});
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	const [error, setError] = useState(null);
	const [spareParts, setSpareParts] = useState([]);
	const [options, setOptions] = useState([]);
	const [selectedSparePartsInv, setSelectedSparePartsInv] = useState([]);
	const [selectedSparePartsPur, setSelectedSparePartsPur] = useState([]);
	const [selectedSPPurshaseDrop, setSelectedSPPurshaseDrop] = useState([]);
	const [selectedSPInvDrop, setSelectedSPInvDrop] = useState([]);

	const addItem = (
		selectedDrppdownOption,
		selectedspareParts,
		setSelectedspareParts
	) => {
		if (selectedDrppdownOption === "") return;

		const flag = selectedspareParts.some(
			(item) => item.ItemID === selectedDrppdownOption
		);

		if (flag) {
			return incrmentCounter(selectedDrppdownOption, setSelectedspareParts);
		} else {
			const selected = spareParts.find(
				(item) => item.ItemID == selectedDrppdownOption
			);
			selected.counter = 1;

			const data = setSelectedspareParts((selectedspareParts) => [
				...selectedspareParts,
				selected,
			]);
		}
	};

	const removeItem = (itemID, setSelectedspareParts) => {
		setSelectedspareParts((selectedspareParts) => {
			return selectedspareParts.filter((item) => itemID !== item.ItemID);
		});
	};

	const incrmentCounter = (itemid, setSelectedspareParts) => {
		setSelectedspareParts((selectedspareParts) => {
			return selectedspareParts.map((item) => {
				return item.ItemID == itemid
					? { ...item, counter: item.counter + 1 }
					: item;
			});
		});
	};
	const decrementCounter = (itemid, setSelectedspareParts) => {
		setSelectedspareParts((selectedspareParts) => {
			return selectedspareParts.map((item) =>
				item.ItemID == itemid && item.counter > 1
					? { ...item, counter: item.counter - 1 }
					: item
			);
		});
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
	const submitData = async () => {
		setSubmitting(true);
		console.log("formData", formData);
		if (
			!formData.ActualWorkHours ||
			!formData.ActualServisesCost ||
			!formData.ActualContractorName
		) {
			setToast({
				text2: toastMessege.dataFill,
				type: "error",
				counter: toast.counter + 1,
			});
			setSubmitting(false);
			return;
		}
		try {
			const response = await api.post("schedule/finish/" + id, {
				formData: formData,
				sparePartsInv: selectedSparePartsInv,
				sparePartsPur: selectedSparePartsPur,
			});
			setToast({
				text2: "تم انهاء العمرة بنجاح",
				type: "success",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("/Schedule");
			}, 1000);
		} catch (error) {
			setError(error);
			setToast({
				text2: error.response.data.message,
				type: "error",
				counter: toast.counter + 1,
			});
		} finally {
			setSubmitting(false);
		}
	};
	useEffect(() => {
		getSpareParts();
	}, []);
	return (
		<MainLayout
			toast={toast}
			title="انهاء العمرة">
			<ScrollComponent
				contentContainerStyle={{
					padding: 16,
					display: "flex",
					gap: 16,
					flexDirection: "coulmn",
				}}>
				<FormField
					placeholder={"عدد سعات التشغيل الفعلية"}
					handleChangeText={(e) => {
						setFormData({ ...formData, ActualWorkHours: e });
					}}
					numeric
					title={"ادخل عدد سعات التشغيل"}
					value={formData.ActualWorkHours}
				/>

				<FormField
					placeholder={"ادخل قيمة الخدمات الفعلية"}
					numeric
					handleChangeText={(e) => {
						setFormData({ ...formData, ActualServisesCost: e });
					}}
					title={"الخدمات الفعلية"}
					value={formData.ActualServisesCost}
				/>
				<FormField
					placeholder={" اسم المقاول "}
					handleChangeText={(e) => {
						setFormData({ ...formData, ActualContractorName: e });
					}}
					title={"ادخل اسم المقاول"}
					value={formData.ActualContractorName}
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
						handlePress={() => {
							addItem(
								selectedSPInvDrop,
								selectedSparePartsInv,
								setSelectedSparePartsInv
							);
						}}
						title={"+"}
						textStyles={"text-3xl "}
						containerStyles="w-[56px] min-h-[56px] mt-[26px]"
					/>
					<Dropdown
						parentStyle={"w-[82%]"}
						title={"  قطع غيار مخزن"}
						data={options}
						placeholder={"اختر قطعة غيار "}
						onChange={(value) => {
							setSelectedSPInvDrop(value);
						}}
					/>
				</View>
				{selectedSparePartsInv.length > 0 ? (
					<ScrollComponent parentContainerStyle={" min-h-[5vh]"}>
						{selectedSparePartsInv.map((item, index) => {
							return (
								<ItemControrlList
									key={index}
									data={item}
									removeItem={(id) => {
										removeItem(id, setSelectedSparePartsInv);
									}}
									incrment={(id) => {
										incrmentCounter(id, setSelectedSparePartsInv);
									}}
									decrement={(id) => {
										decrementCounter(id, setSelectedSparePartsInv);
									}}
								/>
							);
						})}
					</ScrollComponent>
				) : (
					<View className="min-h-[5vh] bg-[#E4E7EC] rounded-md ">
						<Text className="text-center text-lg py-4 font-tmedium">
							لم يتم اختيار اي قطع غيار
						</Text>
					</View>
				)}
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-start",
						justifyContent: "flex-start",
						columnGap: 8,
					}}>
					<MainButton
						handlePress={() => {
							addItem(
								selectedSPPurshaseDrop,
								selectedSparePartsPur,
								setSelectedSparePartsPur
							);
						}}
						title={"+"}
						textStyles={"text-3xl "}
						containerStyles="w-[56px] min-h-[56px] mt-[26px]"
					/>
					<Dropdown
						parentStyle={"w-[82%]"}
						title={" قطع غيار شراء"}
						data={options}
						placeholder={"اختر قطعة غيار "}
						onChange={(value) => {
							setSelectedSPPurshaseDrop(value);
						}}
					/>
				</View>
				{selectedSparePartsPur.length > 0 ? (
					<ScrollComponent parentContainerStyle={" min-h-[5vh]"}>
						{selectedSparePartsPur.map((item, index) => {
							return (
								<ItemControrlList
									key={index}
									data={item}
									removeItem={(id) => {
										removeItem(id, setSelectedSparePartsPur);
									}}
									incrment={(id) => {
										incrmentCounter(id, setSelectedSparePartsPur);
									}}
									decrement={(id) => {
										decrementCounter(id, setSelectedSparePartsPur);
									}}
								/>
							);
						})}
					</ScrollComponent>
				) : (
					<View className="min-h-[5vh] bg-[#E4E7EC] rounded-md ">
						<Text className="text-center text-lg py-4 font-tmedium">
							لم يتم اختيار اي قطع غيار
						</Text>
					</View>
				)}

				{/* {selectedspareParts.length > 0 ? (
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
				)} */}
			</ScrollComponent>
			<View className="p-4">
				<MainButton
					handlePress={submitData}
					isLoading={submitting}
					title={"حفظ"}
					icon={icons.ArrowUpRight}></MainButton>
			</View>
		</MainLayout>
	);
};

export default FinishSchedule;
