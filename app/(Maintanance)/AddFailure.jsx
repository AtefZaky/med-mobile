import { View, Text, Pressable } from "react-native";
import React from "react";
import {
	MainButton,
	MainLayout,
	ScrollComponent,
	FormField,
	DatePickerInput,
	Dropdown,
} from "../../components";
import { icons } from "../../constants";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useLocalSearchParams } from "expo-router";

import api from "../../utils/api";
import {
	getFormattedLocalDate,
	cairoTimeConverter,
} from "../../utils/dateFormater";
import { toastMessege } from "../../constants";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

const AddFailure = () => {
	let { id } = useLocalSearchParams();
	if (id) {
		id = JSON.parse(id);
	}
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [imageUploading, setImageUploading] = useState(false);
	const [loader, setloader] = useState(true);
	const { user } = useGlobalContext();
	const [formFields, setFormFields] = useState({
		DepartmentID: user.DepartmentID,
		StatusDate: `${getFormattedLocalDate(cairoTimeConverter(new Date()))}`,
		AssetID: "",
		StatusIDBefore: "",
		Remarks: "",
		FailureDescription: "",
		FailureReason: null,
		FailureAction: null,
		FixDate: null,
		FixCost: null,
		StatusID: 0,
		ImageUrl: "",
	});

	const [assetsStatus, setAssetsStatus] = useState([]);
	const [options, setOptions] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [confirmationLoader, setConfirmationLoader] = useState(false);
	const [image, setImage] = useState(null);
	async function takeAndUploadPhotoAsync() {
		// Display the camera to the user and wait for them to take a photo or to cancel
		// the action
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		if (result.canceled) {
			return;
		}
		// ImagePicker saves the taken photo to disk and returns a local URI to it
		let localUri = result.assets[0].uri;

		let filename = localUri.split("/").pop();

		// Infer the type of the image
		let match = /\.(\w+)$/.exec(filename);
		let type = match ? `image/${match[1]}` : `image`;

		// Upload the image using the fetch and FormData APIs
		let formData = new FormData();
		// Assume "photo" is the name of the form field the server expects
		formData.append("image", {
			uri: localUri, // The URI from the ImagePicker
			name: filename, // The name you want to give the file
			type: type, // The MIME type of the file
		});

		try {
			setImageUploading(true);
			const res = await api.post("failure/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setToast({
				type: "success",
				text2: "تم رفع الصورة بنجاح",
				counter: toast.counter + 1,
			});
			setImage(true);
			setFormFields({ ...formFields, ImageUrl: res.data.imagePath });
		} catch (err) {
			console.log(err);
		} finally {
			setImageUploading(false);
		}
	}
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
				counter: toast.counter + 1,
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
				counter: toast.counter + 1,
			});
		}
	};

	const getFailureData = async () => {
		try {
			const data = (await api.get(`failure/${id}`)).data.data[0];

			setFormFields({
				DepartmentID: user.DepartmentID,
				StatusDate: data.StatusDate,
				AssetID: data.AssetID,
				FailureDescription: data.FailureDescription,
				FailureReason: data.FailureReason,
				FailureAction: data.FailureAction,
				StatusIDBefore: data.AssetStatusID1,
				FixDate: data.FixDate,
				FixCost: data.FixCost,
				Remarks: data.Remarks,
				StatusID: data.StatusID,
				ImageUrl: data.ImageUrl,
			});
			if (data.ImageUrl) {
				setImage(true);
			}
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.message,
				counter: toast.counter + 1,
			});
		}
	};

	const submitData = async (confirmation) => {
		console.log(formFields);
		if (
			!formFields.AssetID ||
			!formFields.StatusDate ||
			!formFields.StatusIDBefore ||
			!formFields.FailureDescription ||
			!formFields.Remarks ||
			!formFields.ImageUrl
		) {
			setToast({
				type: "error",
				text2: toastMessege.dataFill,
				counter: toast.counter + 1,
			});
			return;
		}
		try {
			if (confirmation) {
				setConfirmationLoader(true);
			} else {
				setSubmitting(true);
			}

			let res;
			if (id) {
				res = await api.put(
					`failure/${id}`,
					confirmation ? { ...formFields, StatusID: 4 } : formFields
				);
			} else {
				res = await api.post(
					"failure",
					formFields,
					confirmation ? { ...formFields, StatusID: 4 } : formFields
				);
			}

			setToast({
				type: "success",
				text2: `تم تسجيل ${id ? "تعديل" : "اضافة"} العطل بنجاح`,
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
			if (confirmation) {
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
			await getFailureData();
		}
		setloader(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MainLayout
			loading={loader}
			toast={toast}
			title={"انشاء عطل"}>
			<ScrollComponent
				parentContainerStyle={"min-h-[76vh]"}
				refreshingFunction={fetchData}
				isLoading={loader}
				contentContainerStyle={{ display: "flex", gap: 16, padding: 16 }}>
				<DatePickerInput
					defaultDate={id ? formFields.StatusDate : ""}
					title={"تاريخ العطل"}
					setDate={(value) => {
						setFormFields({ ...formFields, StatusDate: value });
					}}
				/>
				<Dropdown
					data={options}
					defaultOption={
						id
							? {
									key: formFields.AssetID,
									value: options.find((item) => item.key === formFields.AssetID)
										?.value,
							  }
							: false
					}
					onChange={(key) => {
						setFormFields({ ...formFields, AssetID: key });
					}}
					title={"المعدة"}
					placeholder={"اختر المعدة"}
				/>

				<Dropdown
					data={assetsStatus}
					onChange={(key) => {
						setFormFields({ ...formFields, StatusIDBefore: key });
					}}
					title={"الحالة قبل الاصلاح"}
					placeholder={
						id
							? formFields.StatusIDBefore == 1
								? "يعمل"
								: "متوقف"
							: "اختر الحالة"
					}
				/>

				<FormField
					value={formFields.FailureDescription}
					title={" تفاصيل العطل"}
					placeholder={"ادخل التفاصيل "}
					handleChangeText={(value) => {
						setFormFields({ ...formFields, FailureDescription: value });
					}}
				/>

				<FormField
					value={formFields.Remarks}
					title={"الملاحظات"}
					placeholder={" ادخل الملاحظات"}
					handleChangeText={(value) => {
						setFormFields({ ...formFields, Remarks: value });
					}}
				/>

				<View
					className="flex flex-col "
					style={{ gap: 8 }}>
					<Text className="font-tbold"> صورة العطل </Text>
					<Pressable
						onPress={takeAndUploadPhotoAsync}
						className="border-[0.5px] w-full min-h-[54px] border-primary text-pr flex  items-center rounded-md p-5 justify-between">
						<Image
							source={image ? icons.Image : icons.Camera}
							className="w-5 h-5"></Image>
						<Text
							className={`font-tmedium ${
								image ? "text-primary" : "opacity-50 "
							} text-base`}>
							{image ? " تم رفع الصورة  بنجاح" : " ارفع صورة العطل"}
						</Text>
					</Pressable>
				</View>
			</ScrollComponent>

			<View className="p-4 flex flex-row">
				<MainButton
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					isLoading={submitting}
					handlePress={() => {
						submitData(false);
					}}
					disabled={confirmationLoader || imageUploading}
					icon={icons.ArrowUpRight}
					title={"ارسال"}
				/>
				<MainButton
					isLoading={confirmationLoader}
					disabled={submitting || imageUploading}
					handlePress={() => {
						submitData(true);
					}}
					alternative={true}
					icon={icons.BlueArrowUpRight}
					containerStyles={" w-[48%] min-h-[50px]  mr-2"}
					title={"تاكيد"}
				/>
			</View>
		</MainLayout>
	);
};

export default AddFailure;
