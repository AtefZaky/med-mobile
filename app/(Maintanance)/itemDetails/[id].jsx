import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Header, Table, Loader } from "../../../components";
import api from "../../../utils/api";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export default function itemDetails() {
	const { id, ItemName } = useLocalSearchParams();
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(null);
	const header = ["المخزن", "الرصيد", "الهاتف"];
	header.reverse();
	useEffect(() => {
		const getItemData = async () => {
			try {
				const res = await api.get(`balance/${id}`);

				setData(res.data.data);

				if (res.data.data == 0) {
					setError("هذا الصنف غير متوفر حالياً");
				} else {
					setError(null);
				}
			} catch (error) {
				setError("حدث خطأ ما");
			} finally {
				setLoader(false);
			}
		};
		getItemData();
	}, []);

	return (
		<View>
			<Header title={ItemName} />
			{loader ? (
				<Loader isLoading={loader}></Loader>
			) : (
				<>
					{error || data.length == 0 ? (
						<View className="flex  items-center mt-4 h-[90vh]">
							<Text className="font-tbold text-center text-lg">
								{error || "لا توجد بينات"}
							</Text>
						</View>
					) : (
						<ScrollView className="h-[73vh]">
							<Table
								data={data}
								inventoryItemDetails={true}
								header={header}></Table>
						</ScrollView>
					)}
				</>
			)}
		</View>
	);
}
