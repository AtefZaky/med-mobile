import { View, Text } from "react-native";
import React from "react";
import {
	ErrorMassege,
	Loader,
	MainButton,
	MainLayout,
	ScrollComponent,
	Table,
} from "../../components";
import { router } from "expo-router";
import { icons } from "../../constants";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
const Failures = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [loader, setLoader] = useState(true);
	const getFailures = async () => {
		try {
			setLoader(true);
			const response = await api.get("failure");
			setData(response.data.data);
		} catch (error) {
			setError(error);
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
	useFocusEffect(
		useCallback(() => {
			getFailures();

			return () => {
				console.log("This route is now unfocused.");
			};
		}, [])
	);

	return (
		<MainLayout
			toast={toast}
			loading={loader}
			title={"الاعطال"}>
			<ScrollComponent
				refreshingFunction={getFailures}
				isLoading={loader}>
				{data?.length ? (
					<Table
						Failures={true}
						routingfunction={(id) => {
							router.push(`FailureDetails/${id}`);
						}}
						data={data}
						header={["الاعطال", "التاريخ", "المعدة"].reverse()}></Table>
				) : (
					<>
						<ErrorMassege err={"لا توجد اعطال"}></ErrorMassege>
					</>
				)}
			</ScrollComponent>
			<View className="p-4">
				<MainButton
					icon={icons.pencil}
					handlePress={() => {
						router.push("AddFailure");
					}}
					title={"انشاء عطل"}></MainButton>
			</View>
		</MainLayout>
	);
};

export default Failures;
