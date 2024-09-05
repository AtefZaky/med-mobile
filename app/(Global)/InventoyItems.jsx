import React from "react";
import { useState, useEffect } from "react";
import {
	SearchInput,
	Table,
	MainLayout,
	ErrorMassege,
	ScrollComponent,
} from "../../components";
import api from "../../utils/api";
import { useRouter } from "expo-router";

export default function InventoyItem() {
	const [Query, setQuery] = useState("");
	const [Data, setData] = useState([]);
	const [FilteredData, setFilteredData] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);
	const [Toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const router = useRouter();
	const header = ["الرصيد", "اسم الصنف", "كود الصنف"];
	const fetchItems = async () => {
		setLoading(true);
		setQuery("");
		try {
			const data = await api.get(`balance/items`);
			setData(data.data.data);
		} catch (error) {
			setError("حدث خطأ ما");
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: Toast.counter + 1,
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
		<MainLayout
			loading={Loading}
			toast={Toast}
			title={"الاصناف المخزنية"}>
			<SearchInput
				setQuery={(value) => {
					setQuery(value);
				}}
			/>
			<>
				{Error ? (
					<ErrorMassege err={"لا توجد بينات"}></ErrorMassege>
				) : (
					<ScrollComponent
						isLoading={Loading}
						refreshingFunction={fetchItems}>
						<Table
							header={header}
							handlePress={(id, ItemName) => {
								router.navigate({
									pathname: `itemDetails/${id}`,
									params: { ItemName: ItemName },
								});
							}}
							data={Query ? FilteredData : Data}
							Inventoy={true}
						/>
					</ScrollComponent>
				)}
			</>
		</MainLayout>
	);
}
