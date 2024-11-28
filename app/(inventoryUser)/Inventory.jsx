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
import PopUpEditInv from "../../components/UI/PopUpEditInv";

export default function InventoyItem() {
	const [Query, setQuery] = useState("");
	const [Data, setData] = useState([]);
	const [FilteredData, setFilteredData] = useState([]);
	const [Loading, setLoading] = useState(false);
	const [Error, setError] = useState(null);
	const [dataofItem, setDataofItem] = useState([]);
	const [Toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
		modal: false,
	});
	const [modalVisible, setModalVisible] = useState(false);

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
	const updateItem = async (formData, itemID) => {
		try {
			const response = await api.post(`balance/${itemID}`, formData);
			setToast({
				type: "success",
				text2: "تم تعديل الصنف بنجاح",
				counter: Toast.counter + 1,
				modal: true,
			});
			setTimeout(() => {
				setModalVisible(false);
			}, 1000);
			setData((prev) => {
				return prev.map((item) => {
					if (item.ItemID === itemID) {
						return formData;
					}
					return item;
				});
			});
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: Toast.counter + 1,
				modal: true,
			});
		}
	};
	return (
		<MainLayout
			loading={Loading}
			toast={Toast}
			title={"الاصناف المخزنية"}>
			<PopUpEditInv
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}
				toast={Toast}
				data={dataofItem}
				updateItem={updateItem}
			/>
			<SearchInput
				setQuery={(value) => {
					setQuery(value);
				}}
			/>
			<>
				{Error ? (
					<ErrorMassege err={"لا توجد بيانات"}></ErrorMassege>
				) : (
					<ScrollComponent
						isLoading={Loading}
						refreshingFunction={fetchItems}>
						<Table
							editInventory={true}
							header={header}
							handlePress={(data) => {
								setDataofItem(data);
								setModalVisible(true);
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
