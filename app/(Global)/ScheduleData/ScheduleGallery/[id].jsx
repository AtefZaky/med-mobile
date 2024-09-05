import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
	MainLayout,
	ScrollComponent,
	MainButton,
	ErrorMassege,
} from "../../../../components";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import api from "../../../../utils/api";
import { FlatList } from "react-native";
import { Image } from "expo-image";
const ScheduleGallery = () => {
	const { id } = useLocalSearchParams();
	const [images, setImages] = useState([]);
	const [loader, setLoader] = useState(false);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});

	const fetchImages = async () => {
		setLoader(true);
		try {
			const response = await api.get(`schedule/images/${id}`);

			setImages(splitArrayIntoChunks(response.data.data, 3));
		} catch (error) {
		} finally {
			setLoader(false);
		}
	};

	function splitArrayIntoChunks(array, chunkSize) {
		const result = [];
		for (let i = 0; i < array.length; i += chunkSize) {
			const chunk = array.slice(i, i + chunkSize);
			result.push(chunk);
		}
		return result;
	}
	useFocusEffect(
		useCallback(() => {
			fetchImages();
		}, [])
	);

	return (
		<MainLayout
			loading={loader}
			toast={toast}
			title={"صور العمرة "}>
			{images.length > 0 ? (
				<FlatList
					key={images.length > 0 ? images[0].ImageUrl : "no data"}
					style={{
						padding: 16,
						width: Dimensions.get("window").width,
						height: Dimensions.get("window").height,
					}}
					data={images}
					renderItem={({ item, index }) => (
						<View
							className="flex flex-row"
							style={{ gap: 6 }}>
							{item.map((image, index) => (
								<Pressable
									className="rounded-md"
									key={index}
									onPress={() => {
										router.navigate({
											pathname: `ScheduleData/ScheduleGallery/Image_description/${id}`,
											params: { data: JSON.stringify(image) },
										});
									}}
									style={{
										width: Dimensions.get("window").width / 3 - 16,
										height: 100,
									}}>
									<Image
										className="rounded-md"
										style={{
											width: "100%",
											height: "100%",
										}}
										source={{ uri: image.ImageUrl }}
									/>
								</Pressable>
							))}
						</View>
					)}></FlatList>
			) : (
				<>
					<ErrorMassege err={"لا توجد صور"}></ErrorMassege>
				</>
			)}
		</MainLayout>
	);
};

export default ScheduleGallery;
