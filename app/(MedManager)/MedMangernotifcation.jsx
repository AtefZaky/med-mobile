import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ErrorMassege, ScrollComponent, MainLayout } from "../../components";
import { Notifcation } from "../../components";
import Toast from "react-native-toast-message";
import api from "../../utils/api";
const MedMangernotifcation = () => {
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	const getNotfications = async () => {
		try {
			setLoader(true);
			const data = await api.get("/notifications");
			setData(data.data.notifications);
		} catch (error) {
			Toast.show({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setLoader(false);
		}
	};
	useEffect(() => {
		getNotfications();
	}, []);
	return (
		<MainLayout
			title={"التنبيهات"}
			loading={loader}>
			<>
				{data.length == 0 ? (
					<ErrorMassege err={"لا يوجد تنبيهات"} />
				) : (
					<ScrollComponent
						parentContainerStyle={"min-h-[85vh]"}
						refreshingFunction={getNotfications}
						isLoading={loader}>
						<View className="p-4">
							{data.map((item, index) => (
								<Notifcation
									key={index}
									data={item}
								/>
							))}
						</View>
					</ScrollComponent>
				)}
			</>
		</MainLayout>
	);
};

export default MedMangernotifcation;
