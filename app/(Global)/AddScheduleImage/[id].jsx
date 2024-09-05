import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import {
	FormField,
	MainButton,
	MainLayout,
	ScrollComponent,
} from "../../../components";
import { Image } from "expo-image";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import api from "../../../utils/api";
import { icons } from "../../../constants";
import * as ImagePicker from "expo-image-picker";

const AddScheduleImage = () => {
	const { id } = useLocalSearchParams();
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	const [image, setImage] = useState(null);
	const [loader, setLoader] = useState(false);
	const [submitLoader, setSubmitLoader] = useState(false);
	const [Image_description, setImage_description] = useState("");

	async function takeAndUploadPhotoAsync() {
		// Display the camera to the user and wait for them to take a photo or to cancel
		// the action
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.3,
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
		// Assume "photo" is the name of the form field the server expects

		setImage(result.assets[0]);
	}

	const submit = async () => {
		if (!Image_description || !image) {
			setToast({
				type: "error",
				text2: "ادخل وصف الصورة",
				counter: toast.counter + 1,
			});
			return;
		}
		const form = new FormData();
		form.append("Image_description", Image_description);
		form.append("image", {
			uri: image.uri,
			name: image.uri.split("/").pop(),
			type: `image/${image.uri.split(".").pop()}`,
		});
		console.log(form);
		try {
			setSubmitLoader(true);

			const res = await api.post(`schedule/upload/${id}`, form, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			setImage(true);
			setToast({
				type: "success",
				text2: "تم رفع الصورة بنجاح",
				counter: toast.counter + 1,
			});
			setTimeout(() => {
				router.back();
			}, 1000);
		} catch (err) {
			setToast({
				type: "error",
				text2: "حدث خطأ ما",
				counter: toast.counter + 1,
			});
		} finally {
			setSubmitLoader(false);
		}
	};

	return (
		<MainLayout
			title={"اضافة صورة "}
			toast={toast}>
			<ScrollComponent
				contentContainerStyle={{
					padding: 16,
					display: "flex",
					flexDirection: "coulmn",
					gap: 16,
				}}>
				<FormField
					title={"وصف الصورة"}
					value={Image_description}
					handleChangeText={(e) => setImage_description(e)}
					placeholder={" ادخل تفاصيل الصورة"}
				/>
				<View
					className="flex flex-col "
					style={{ gap: 8 }}>
					<Text className="font-tbold"> صورة العمرة </Text>
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
							{image ? " تم رفع الصورة  بنجاح" : " ارفع الصورة "}
						</Text>
					</Pressable>
				</View>
			</ScrollComponent>
			<View className="p-4">
				<MainButton
					title={"حفظ"}
					icon={icons.ArrowUpRight}
					onPress={takeAndUploadPhotoAsync}
					isLoading={submitLoader}
					handlePress={submit}
				/>
			</View>
		</MainLayout>
	);
};

export default AddScheduleImage;
