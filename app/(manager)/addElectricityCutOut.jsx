import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
	MainButton,
	FormField,
	DatePickerInput,
	MainLayout,
	ScrollComponent,
} from "../../components";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../utils/dateFormater";
import { toastMessege } from "../../constants";
import api from "../../utils/api";
import { router, useLocalSearchParams } from "expo-router";
const addElectricityCutOut = () => {
	let { id } = useLocalSearchParams("id");
	if (id) {
		id = JSON.parse(id);
	}

	const { user } = useGlobalContext();
	const [isLoading, setIsLoading] = useState(false);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	const [submitting, setSubmitting] = useState(false);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [formFields, setFormFields] = useState({
		DepartmentID: user.DepartmentID,
		Date: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		cuttime: "",
		backtime: "",
		cut_duration: "",
		suction_cut: "",
		discharge_cut: "",
		suction_back: "",
		discharge_back: "",
		no_circle: "",
		StatusID: 0,
		cut_reason: "",
	});
	const getCutOutDetails = async () => {
		try {
			const response = await api.get(`powerFailure/${id}`);
			const data = response.data.data[0];
			setFormFields({
				...formFields,
				DepartmentID: user.DepartmentID,
				Date: data.Date,
				cuttime: data.cuttime?.toString(),
				backtime: data.backtime?.toString(),
				cut_duration: data.cut_duration?.toString(),
				suction_cut: data.suction_cut?.toString(),
				discharge_cut: data.discharge_cut?.toString(),
				suction_back: data.suction_back?.toString(),
				discharge_back: data.discharge_back?.toString(),
				no_circle: data.no_circle?.toString(),
				StatusID: data.StatusID,
				cut_reason: data.cut_reason?.toString(),
			});
		} catch (error) {
			setToast({
				type: "error",

				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		} finally {
			setIsLoading(false);
		}
	};

	const sumbitForm = async (confirm) => {
		if (
			!formFields.Date ||
			!formFields.cuttime ||
			!formFields.cut_duration ||
			!formFields.no_circle ||
			!formFields.cut_reason ||
			!formFields.suction_cut ||
			!formFields.suction_back ||
			!formFields.discharge_cut ||
			!formFields.discharge_back
		) {
			setToast({
				type: "error",

				text2: toastMessege.dataFill,
				counter: toast.counter + 1,
			});
			return;
		}
		if (!confirm) {
			setSubmitting(true);
		} else {
			setConfirmationLoader(true);
		}
		try {
			if (id) {
				const res = await api.put(
					"powerFailure/" + id,
					confirm ? { ...formFields, StatusID: 4 } : formFields
				);
			} else {
				const res = await api.post(
					"powerFailure",
					confirm ? { ...formFields, StatusID: 4 } : formFields
				);
			}

			setToast({
				type: "success",

				text2: "تم اضافة الانقطاع بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.navigate("electricityCutOut");
			}, 1500);
		} catch (err) {
			setToast({
				type: "error",
				text2: err.message ? err.message : false,
				counter: toast.counter + 1,
			});
		} finally {
			if (!confirm) {
				setSubmitting(false);
			} else {
				setConfirmationLoader(false);
			}
		}
	};

	useEffect(() => {
		if (id) {
			getCutOutDetails();
		}
	}, []);
	return (
		<MainLayout
			toast={toast}
			loading={isLoading}
			title={"اضافة انقطاع التيار"}>
			<ScrollComponent
				parentContainerStyle={"min-h-[75vh]"}
				contentContainerStyle={{
					padding: 16,
					display: "flex",
					gap: 16,
					flexDirection: "column",
				}}>
				<DatePickerInput
					defaultDate={formFields.Date}
					setDate={(date) => setFormFields({ ...formFields, Date: date })}
				/>
				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, cuttime: text })
					}
					value={formFields.cuttime}
					placeholder={`وقت انقطاع التيار`}
					title={"وقت انقطاع التيار"}
				/>
				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, cut_duration: text })
					}
					value={formFields.cut_duration}
					placeholder={`مدة انقطاع التيار `}
					title={" مدة انقطاع التيار "}
				/>
				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, backtime: text })
					}
					value={formFields.backtime}
					placeholder={`  وقت عودة التيار`}
					title={" وقت عودة التيار"}
				/>

				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, no_circle: text })
					}
					value={formFields.no_circle}
					placeholder={`رقم الدائرة `}
					title={"رقم الدائرة "}
				/>
				<FormField
					handleChangeText={(text) =>
						setFormFields({ ...formFields, cut_reason: text })
					}
					value={formFields.cut_reason}
					placeholder={`سبب انقطاع التيار`}
					title={"سبب انقطاع التيار"}
				/>
				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, suction_cut: text })
					}
					value={formFields.suction_cut}
					placeholder={` مص قبل `}
					title={"مص قبل"}
				/>
				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, suction_back: text })
					}
					value={formFields.suction_back}
					placeholder={"  مص بعد"}
					title={" مص بعد"}
				/>
				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, discharge_cut: text })
					}
					value={formFields.discharge_cut}
					placeholder={"  طرد قبل "}
					title={" طرد قبل "}
				/>
				<FormField
					numeric
					handleChangeText={(text) =>
						setFormFields({ ...formFields, discharge_back: text })
					}
					value={formFields.discharge_back}
					placeholder={" طرد بعد "}
					title={"طرد بعد "}
				/>
			</ScrollComponent>
			<View className="p-4  flex flex-row ">
				<MainButton
					isLoading={submitting}
					disabled={confirmationLoader}
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					icon={icons.ArrowUpRight}
					iconStyles={"mr-4"}
					handlePress={() => {
						sumbitForm();
					}}
					title={"حفظ"}></MainButton>
				<MainButton
					isLoading={confirmationLoader}
					disabled={submitting}
					icon={icons.BlueArrowUpRight}
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					iconStyles={"mr-4"}
					alternative={true}
					handlePress={() => {
						sumbitForm(true);
					}}
					title={"تأكيد "}></MainButton>
			</View>
		</MainLayout>
	);
};

export default addElectricityCutOut;
