import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Header, MassegeContainer, Loader } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import { Notifcation } from "../../components";
import Toast from "react-native-toast-message";
import api from "../../utils/api";
const notifcation = () => {
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	useEffect(() => {
		const getNotfications = async () => {
			try {
				const data = await api.get("/notifications");
				setData(data.data.notifications);
			} catch (error) {
				console.log(error);
			} finally {
				setLoader(false);
			}
		};
		getNotfications();
	}, []);
	return (
		<View className=" min-h-[100%] bg-white">
			<Toast></Toast>
			<Header title={"التنبيهات"} />
			<View className="px-4 py-4">
				<ScrollView>
					{loader ? (
						<Loader isLoading={loader}></Loader>
					) : (
						<>
							{data.length == 0 ? (
								<View className="h-full w-full flex justify-center items-center">
									<Text className="font-tbold text-base text-black">
										لا توجد تنبيهات الان{" "}
									</Text>
								</View>
							) : (
								data.map((item, index) => (
									<Notifcation
										key={index}
										data={item}
									/>
								))
							)}
						</>
					)}
				</ScrollView>
			</View>
		</View>
	);
};

export default notifcation;
