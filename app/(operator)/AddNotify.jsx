import { View } from "react-native";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../utils/dateFormater";
import {
	ErrorMassege,
	Loader,
	MainLayout,
	ScrollComponent,
} from "../../components";
import React, { useEffect, useState } from "react";
import {
	DatePickerInput,
	Dropdown,
	FormField,
	MainButton,
} from "../../components";
import { icons } from "../../constants";
import api from "../../utils/api";
import { router, useLocalSearchParams } from "expo-router";
import { toastMessege } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
const addNotify = () => {
	const { user } = useGlobalContext();
	let { id } = useLocalSearchParams();
	if (id) {
		id = JSON.parse(id);
	}
	const [submitting, setSubmitting] = useState(false);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [formdata, setFormData] = useState({
		DepartmentID: user.DepartmentID,
		StatusDate: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		AssetID: "",
		FailureAction: "",
		FailureDescription: "",
		StatusID: 1,
		OpStatusID: "",
	});
	const [Toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [assetsStatus, setAssetsStatus] = useState([]);
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [error, setError] = useState(null);

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
			const transformedData = data.items.map((item) => ({
				value: item?.StatusName,
				key: item?.StatusID,
			}));

			setAssetsStatus(transformedData);
		} catch (error) {
			setToast({
				type: "error",

				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		}
	};

	const getNotifyData = async () => {
		try {
			const reports = (await api.get(`notify/${id}`)).data.reports[0];

			setFormData({
				DepartmentID: user.DepartmentID,
				StatusDate: reports.StatusDate,
				AssetID: reports.AssetID,
				FailureAction: reports.ActionTaken,
				FailureDescription: reports.FailureDescription,
				StatusID: reports.StatusID,
				OpStatusID: reports.OpStatusID,
			});
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		}
	};

	const submitData = async (confirm) => {
		if (
			!formdata.AssetID ||
			!formdata.OpStatusID ||
			!formdata.FailureAction ||
			!formdata.StatusDate ||
			!formdata.FailureDescription
		) {
			setToast({
				type: "error",
				text2: toastMessege.dataFill,
				counter: Toast.counter + 1,
			});
			return;
		}
		try {
			if (confirm) {
				setConfirmationLoader(true);
			} else {
				setSubmitting(true);
			}

			let res;
			if (id) {
				res = await api.put(
					`notify/${id}`,
					confirm ? { ...formdata, StatusID: 4 } : formdata
				);
			} else {
				res = await api.post(
					"notify",
					confirm ? { ...formdata, StatusID: 4 } : formdata
				);
			}

			setToast({
				type: "success",

				text2: "تم تسجيل البلاغ بنجاح",
				counter: Toast.counter + 1,
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
			});
		} finally {
			if (confirm) {
				setConfirmationLoader(false);
			} else {
				setSubmitting(false);
			}
		}
	};
	const fetchData = async () => {
		setloader(true);
		await getAssets();
		await getAssetStatus();
		if (id) {
			await getNotifyData();
		}
		setloader(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MainLayout
			loading={loader}
			toast={Toast}
			title={"انشاء بلاغ "}>
			{!options.length || !assetsStatus.length ? (
				<ErrorMassege err={"لا توجد بيانات"}></ErrorMassege>
			) : (
				<ScrollComponent
					contentContainerStyle={{ display: "flex", gap: 16, padding: 16 }}
					parentContainerStyle={"min-h-[76vh]"}
					isLoading={loader}
					refreshingFunction={fetchData}>
					<DatePickerInput
						setDate={(value) => {
							setFormData({ ...formdata, StatusDate: value });
						}}
					/>

					<Dropdown
						defaultOption={
							id
								? {
										key: formdata.AssetID,
										value: options.find((item) => item.key === formdata.AssetID)
											?.value,
								  }
								: false
						}
						title={"المعدة"}
						data={options}
						placeholder={"اختر المعدة"}
						onChange={(key) => {
							setFormData({ ...formdata, AssetID: key });
						}}></Dropdown>

					<Dropdown
						title={"حالة المعدة"}
						data={assetsStatus}
						defaultOption={
							id
								? {
										key: formdata.OpStatusID,
										value: assetsStatus.find(
											(item) => item.key === formdata.OpStatusID
										)?.value,
								  }
								: false
						}
						placeholder={"اختر الحالة  "}
						onChange={(optionid) => {
							setFormData({
								...formdata,
								OpStatusID: optionid,
							});
						}}></Dropdown>

					<FormField
						value={formdata.FailureDescription}
						handleChangeText={(value) => {
							setFormData({ ...formdata, FailureDescription: value });
						}}
						title={"تفاصيل العطل"}
						placeholder={"ادخل التفاصيل"}></FormField>

					<FormField
						value={formdata.FailureAction}
						handleChangeText={(value) => {
							setFormData({ ...formdata, FailureAction: value });
						}}
						title={"الاجراء المتخذ قبل الابلاغ"}
						placeholder={"ادخل الاجراء"}></FormField>
				</ScrollComponent>
			)}

			<View className="p-4 flex flex-row">
				<MainButton
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					icon={icons.ArrowUpRight}
					iconStyles={"mr-4"}
					title={"ارسال"}
					handlePress={() => {
						submitData();
					}}
					disabled={confirmationLoader}
					isLoading={submitting}></MainButton>

				<MainButton
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					icon={icons.BlueArrowUpRight}
					alternative={true}
					iconStyles={"mr-4"}
					title={"تأكيد"}
					handlePress={() => {
						submitData(true);
					}}
					disabled={submitting}
					isLoading={confirmationLoader}></MainButton>
			</View>
		</MainLayout>
	);
};

export default addNotify;
