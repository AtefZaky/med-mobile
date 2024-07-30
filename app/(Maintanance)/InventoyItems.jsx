import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Header, SearchInput, Table } from "../../components";
import api from "../../utils/api";
import Loader from "../../components/Loader";
import { useRouter } from "expo-router";

import Toast from "react-native-toast-message";
export default function InventoyItem() {
	const [Query, setQuery] = useState("");
	const [Data, setData] = useState([]);
	const [FilteredData, setFilteredData] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);
	const router = useRouter();
	const header = ["الرصيد", "اسم الصنف", "كود الصنف"];
	const fetchItems = async () => {
		setLoading(true);
		try {
			const data = await api.get(`balance/items`);
			setData(data.data.data);
		} catch (error) {
			setError("حدث خطأ ما");
			Toast.show({
				type: "error",
				text1: error.massge,
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
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchItems();
	}, []);
	useEffect(() => {
		if (Query) {
			const filteredData = Data.filter((item) => {
				return (
					item.ItemCode.toLowerCase().includes(Query.toLowerCase()) ||
					item.ItemName.toLowerCase().includes(Query.toLowerCase())
				);
			});
			setFilteredData(filteredData);
		}
	}, [Query]);

	return (
		<View className="bg-white min-h-[103vh]">
			<Toast></Toast>
			<Header title="الاصناف المخزنية" />
			<SearchInput
				setQuery={(value) => {
					setQuery(value);
				}}
			/>
			<View>
				{Loading ? (
					<Loader
						minus={160}
						isLoading={Loading}
					/>
				) : (
					<>
						{Error ? (
							<Text className=" justify-center items-center font-tbold">
								{Error}
							</Text>
						) : (
							<>
								<ScrollView className="h-[73vh]">
									<Table
										header={header}
										handlePress={(id, ItemName) => {
											router.push({
												pathname: `itemDetails/${id}`,
												params: { ItemName: ItemName },
											});
										}}
										data={Query ? FilteredData : Data}
										Inventoy={true}
									/>
								</ScrollView>
							</>
						)}
					</>
				)}
			</View>
		</View>
	);
}
