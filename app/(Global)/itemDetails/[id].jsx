import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
	Header,
	Table,
	Loader,
	MainLayout,
	ErrorMassege,
	ScrollComponent,
} from "../../../components";
import api from "../../../utils/api";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export default function itemDetails() {
	const { id, ItemName } = useLocalSearchParams();
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(true);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const header = ["المخزن", "الرصيد", "الهاتف"];
	header.reverse();
	const getItemData = async () => {
		setLoader(true);
		try {
			const res = await api.get(`balance/${id}`);
			setData(res.data.data);
		} catch (error) {
			setToast({
				type: "error",
				text2: "لا توجد بيانات",
				counter: toast.counter + 1,
			});
		} finally {
			setLoader(false);
		}
	};
	useEffect(() => {
		getItemData();
	}, []);

	return (
		<MainLayout
			loading={loader}
			toast={toast}
			title={ItemName}>
			<>
				{error || data.length == 0 ? (
					<ErrorMassege err={error || "لا توجد بينات"}></ErrorMassege>
				) : (
					<ScrollComponent
						refreshingFunction={getItemData}
						isLoading={loader}>
						<Table
							data={data}
							inventoryItemDetails={true}
							header={header}></Table>
					</ScrollComponent>
				)}
			</>
		</MainLayout>
	);
}
