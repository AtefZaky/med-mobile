import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { Header, Table, Loader } from "../../components";
import { ScrollView } from "react-native-virtualized-view";

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import PopUpOper from "../../components/popUpOper";

const DailyOperation = () => {
	const [data, setData] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [formData, setFormData] = useState({
		AssetID: "",
		OperationItemID: "",
	});
	const [isSubmitting, setSubmitting] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [key, setKey] = useState(0);

	const reloadScreen = () => {
		setKey((prevKey) => prevKey + 1);
	};

	const getData = async () => {
		try {
			const response = await api.get("/operation/assets");
			const assets = response.data.assets;
			setData(assets);
			setLoading(false);
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: error.message,
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
			setLoading(false);
		}
	};

	const header = ["اخر قراءة", "اخر ساعة", "الوحدة", "المعدة"];
	const handleSubmit = async (H, value) => {
		if (formData.OperationItemID === "" || formData.AssetID === "") {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
			return;
			// Prevent form submission if fields are empty
		}

		// Prevent form submission if time exceeds current  and next hour

		try {
			setSubmitting(true);
			await api.put("/operation/assets", {
				H: H,
				value: value,
				AssetID: formData.AssetID,
				OperationItemID: formData.OperationItemID,
			});
			setSubmitting(false);
			setModalVisible(false);
			await getData(); // Fetch the latest data
			reloadScreen(); // Force a re-render
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: error.message,
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
			setSubmitting(false);
		}
	};

	const handlePress = (AssetID, OperationItemID) => {
		setModalVisible(true);
		setFormData({
			...formData,
			AssetID: AssetID,
			OperationItemID: OperationItemID,
		});
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<View className="bg-white min-h-[103vh]">
			<Header title="بيانات التشغيل اليومية" />
			<View>
				{isLoading ? (
					<Loader
						minus={140}
						isLoading={isLoading}></Loader>
				) : (
					<>
						{data.length ? (
							<>
								<View className="w-full flex">
									<ScrollView className="max-h-[85vh]">
										<Table
											header={header}
											dailyOperationalData={true}
											data={data}
											handlePress={handlePress}></Table>
										<PopUpOper
											setModalVisible={setModalVisible}
											modalVisible={modalVisible}
											setFormData={setFormData}
											formData={formData}
											handleSubmit={handleSubmit}
											isLoading={isSubmitting}
										/>
									</ScrollView>
								</View>
							</>
						) : (
							<View className="flex justify-center items-center min-h-[73vh ] ">
								<Text className="font-tbold text-lg mt-4"> لا توجد بينات</Text>
							</View>
						)}
					</>
				)}

				<Toast />
			</View>
		</View>
	);
};

export default DailyOperation;
