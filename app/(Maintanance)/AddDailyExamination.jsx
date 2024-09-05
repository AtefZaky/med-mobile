import {
	MainButton,
	Loader,
	Dropdown,
	FormField,
	ScrollComponent,
	MainLayout,
	DatePickerInput,
	ErrorMassege,
} from "../../components";
import React, { useEffect, useState } from "react";

import api from "../../utils/api";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../utils/dateFormater";
import { View, Text } from "react-native";
import { icons } from "../../constants";
import { router, useLocalSearchParams } from "expo-router";
import { toastMessege } from "../../constants";
export default function dailyExamination() {
	let { id } = useLocalSearchParams(id);
	console.log(id);
	if (id) {
		id = JSON.parse(id);
	}
	const [loader, setloader] = useState(true);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [options, setOptions] = useState([]);
	const [formdata, setFormData] = useState({
		CheckDate: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		AssetID: "",
		StatusID: 1,
		WorksDone: "",
		CheckRemarks: null,
	});

	const getAssets = async () => {
		try {
			const { data } = await api.get("/departments");
			const transformedData = data.Assets.map((item) => ({
				value: item.AssetName,
				key: item.AssetID,
			}));
			setOptions(transformedData);
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setloader(false);
		}
	};
	const getDailyExaminationDetails = async () => {
		try {
			const res = await api.get(`check/${id}`);
			const data = res.data.data[0];

			setFormData({
				CheckDate: data.CheckDate,
				AssetID: data.AssetID,
				WorksDone: data.WorksDone,
				CheckRemarks: data.CheckRemarks,
			});
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
	fetchData = async () => {
		await getAssets();
		if (id) {
			await getDailyExaminationDetails();
		}

		setloader(false);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const submitData = async (confirmation) => {
		if (
			formdata.AssetID === "" ||
			formdata.WorksDone === "" ||
			formdata.CheckDate === "" ||
			formdata.CheckRemarks === ""
		) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: toastMessege.dataFill,
			});

			return; // Prevent form submission if fields are empty
		}

		if (confirmation) {
			setConfirmationLoader(true);
		} else {
			setButtonLoading(true);
		}
		try {
			if (id) {
				const res = await api.put(
					`check/${id}`,
					confirmation ? { ...formdata, StatusID: 4 } : formdata
				);
			} else {
				const res = await api.post(
					"check",
					confirmation ? { ...formdata, StatusID: 4 } : formdata
				);
			}

			setToast({
				counter: toast.counter + 1,
				type: "success",

				text2: "تم اضافة الفحص بنجاح",
			});

			setTimeout(() => {
				router.navigate("/DailyExaminationList");
			}, 1500);
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",

				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			if (confirmation) {
				setConfirmationLoader(false);
			} else {
				setButtonLoading(false);
			}
		}
	};

	return (
		<MainLayout
			loading={loader}
			title={"اضافة بينات الفحص اليومي"}
			toast={toast}>
			<ScrollComponent
				contentContainerStyle={{ display: "flex", gap: 16, padding: 16 }}
				parentContainerStyle={"min-h-[76vh]"}>
				{options.length > 0 ? (
					<>
						<DatePickerInput
							defaultDate={formdata.CheckDate}
							title={"ادخل تاريخ الفحص"}
							setDate={(value) => {
								setFormData({ ...formdata, CheckDate: value });
							}}
						/>

						<Dropdown
							title={"المعدة"}
							data={options}
							placeholder={"اختر المعدة"}
							defaultOption={
								id
									? {
											key: formdata.AssetID,
											value: options.find(
												(item) => item.key === formdata.AssetID
											)?.value,
									  }
									: false
							}
							onChange={(key) => {
								setFormData({ ...formdata, AssetID: key });
							}}></Dropdown>

						<FormField
							value={formdata.WorksDone}
							handleChangeText={(value) => {
								setFormData({ ...formdata, WorksDone: value });
							}}
							title={" اعمال الفحص التي تمت"}
							placeholder={"ادخل الاعمال التي تمت"}></FormField>

						<FormField
							value={formdata.CheckRemarks}
							handleChangeText={(value) => {
								setFormData({ ...formdata, CheckRemarks: value });
							}}
							title={"ملاحظات الفحص"}
							placeholder={"ادخل الملاحظات"}></FormField>
					</>
				) : (
					<ErrorMassege err="لا توجد بيانات"></ErrorMassege>
				)}
			</ScrollComponent>
			<View className="p-4 flex flex-row">
				<MainButton
					isLoading={buttonLoading}
					disabled={confirmationLoader}
					icon={icons.ArrowUpRight}
					iconStyles={"mr-4"}
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					title={"ارسال"}
					handlePress={() => {
						submitData();
					}}></MainButton>

				<MainButton
					isLoading={confirmationLoader}
					disabled={buttonLoading}
					icon={icons.BlueArrowUpRight}
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					alternative={true}
					iconStyles={"mr-4"}
					title={"تأكيد الفحص"}
					handlePress={() => {
						submitData(true);
					}}></MainButton>
			</View>
		</MainLayout>
	);
}
// isLoading={buttonLoading}
