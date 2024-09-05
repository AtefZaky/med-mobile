import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
	MainButton,
	MainLayout,
	ScrollComponent,
} from "../../../../../components";
import { Image } from "expo-image";
import api from "../../../../../utils/api";
import { router } from "expo-router";
import { icons } from "../../../../../constants";
import { useState } from "react";
const Image_description = () => {
	let { data } = useLocalSearchParams();
	data = JSON.parse(data);
	const [deleteLoader, setDeleteLoader] = useState(false);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",

		type: "",
		counter: 0,
	});

	const deleteImage = async () => {
		setDeleteLoader(true);
		try {
			console.log(data.ImageID);
			const response = await api.delete(`schedule/image/${data.ImageID}`);
			setToast({
				counter: toast.counter + 1,
				type: "success",
				text2: "تم الحذف بنجاح",
			});
			setTimeout(() => {
				router.back();
			}, 800);
		} catch (error) {
			console.log(error);

			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setDeleteLoader(false);
		}
	};

	return (
		<MainLayout toast={toast}>
			<ScrollComponent
				contentContainerStyle={{
					padding: 16,
					display: "flex",
					gap: 16,
					flexDirection: "coulmn",
				}}>
				<View
					className="flex flex-col bg-[#E5E5E5] p-4  rounded-lg "
					style={{ gap: 12 }}>
					<View
						className="flex flex-row-reverse  items-center   "
						style={{ gap: 16 }}>
						<View>
							<Text className="font-tbold text-base">وصف الصورة:</Text>
						</View>
						<View>
							<Text className="font-tmedium text-base">
								{data.Image_description}
							</Text>
						</View>
					</View>
					<View
						className="flex flex-row-reverse  items-center "
						style={{ gap: 16 }}>
						<View>
							<Text className="font-tbold text-base">تاريخ الصورة:</Text>
						</View>
						<View>
							<Text className="font-tmedium text-base">
								{data.ImageDate?.split("T")[0]}
							</Text>
						</View>
					</View>
				</View>
				<View className="w-full rounded-lg">
					<Image
						className="rounded-lg"
						source={{
							uri: data.ImageUrl,
						}}
						style={{
							borderRadius: 8,
							width: "100%",
							height: 300,
						}}
					/>
				</View>
			</ScrollComponent>
			{data.StatusID != 5 ? (
				<>
					<View className="p-4">
						<MainButton
							isLoading={deleteLoader}
							alternative
							title={"حذف "}
							icon={icons.Trash}
							handlePress={() => {
								deleteImage();
							}}
						/>
					</View>
				</>
			) : (
				<></>
			)}
		</MainLayout>
	);
};

export default Image_description;
