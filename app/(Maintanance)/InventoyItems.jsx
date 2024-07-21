import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Header, SearchInput, Table } from "../../components";
import api from "../../utils/api";
import Loader from "../../components/Loader";
import { useRouter } from "expo-router";
import { da } from "date-fns/locale";
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
			// setError(error.message);
			console.log(error.massge);
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
		<View>
			<Header title="الاصناف المخزنية" />
			<SearchInput
				setQuery={(value) => {
					setQuery(value);
				}}
			/>
			{Loading ? (
				<Loader />
			) : (
				<>
					{Error ? (
						<Text className=" justify-center items-center font-tbold">
							{Error}
						</Text>
					) : (
						<>
							<ScrollView className="mb-3">
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
	);
}
