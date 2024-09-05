import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
	ErrorMassege,
	MainLayout,
	ScrollComponent,
	Table,
} from "../../../components";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import api from "../../../utils/api";
const ScheduleSpareParts = () => {
	const { id, sparePartType } = useLocalSearchParams();
	const [loader, setLoader] = useState(true);
	const [data, setData] = useState([]);
	const [toast, setToast] = useState({
		text1: "",
		text2: "",
		type: "",
		counter: 0,
	});
	console.log("id", id);
	console.log("sparePartType", sparePartType);

	const getSpareParts = async () => {
		try {
			setLoader(true);
			const response = await api.get(
				`schedule/sparePart/${id}?typeID=${sparePartType}`
			);
			setData(response.data.data);
			console.log("response", response.data.data);
		} catch (error) {
			setToast({
				counter: toast.counter + 1,
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setLoader(false);
		}
	};
	const header =
		sparePartType == 1
			? ["الاسم ", "عدد", "السعر", "المصدر"]
			: ["الاسم ", "عدد", "السعر"];

	useEffect(() => {
		getSpareParts();
	}, []);
	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={sparePartType == 1 ? "قطع غيار فعلية" : "قطع غيار مخططة"}>
			<ScrollComponent parentContainerStyle={"min-h-[85vh]"}>
				{data.length > 0 ? (
					<Table
						sparePart
						data={data}
						header={header.reverse()}
					/>
				) : (
					<ErrorMassege></ErrorMassege>
				)}
			</ScrollComponent>
		</MainLayout>
	);
};

export default ScheduleSpareParts;
