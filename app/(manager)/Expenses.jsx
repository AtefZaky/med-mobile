import { View, Text } from "react-native";
import React, { useState } from "react";
import {
	MainLayout,
	MainButton,
	Table,
	ScrollComponent,
	ErrorMassege,
} from "../../components";
import { router, useFocusEffect } from "expo-router";
import api from "../../utils/api";
import { useCallback } from "react";
import { icons } from "../../constants";
const Expenses = () => {
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [loading, setLoading] = useState(true);
	const [expenses, setExpenses] = useState([]);

	const getExpenses = async () => {
		setLoading(true);
		try {
			const { data } = await api.get("/expenses");
			console.log(data);

			setExpenses(data.data);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
			});
		} finally {
			setLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getExpenses();
		}, [])
	);
	const header = ["المصروف", "الشهر", "السنة"];
	return (
		<MainLayout
			toast={toast}
			loading={loading}
			title="المصروفات">
			<ScrollComponent parentContainerStyle={"min-h-[75vh]"}>
				{expenses?.length ? (
					<>
						<Table
							header={header}
							data={expenses}
							Expenses
							routingfunction={(id) => {
								router.navigate("Expenses/" + id);
							}}></Table>
					</>
				) : (
					<ErrorMassege err="لا توجد مصروفات حاليا" />
				)}
			</ScrollComponent>
			<View className="p-4">
				<MainButton
					title={"اضافة"}
					icon={icons.pencil}
					handlePress={() => {
						router.navigate("AddExpenses");
					}}
				/>
			</View>
		</MainLayout>
	);
};

export default Expenses;
