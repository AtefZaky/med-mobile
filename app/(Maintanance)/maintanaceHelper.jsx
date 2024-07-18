import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
	Loader,
	Header,
	Dropdown,
	FormField,
	MainButton,
} from "../../components";
import { ScrollView } from "react-native-virtualized-view";
export default function maintanaceHelper() {
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [chatStartUP, setChatStartUp] = useState({
		failureDescription: "",
		AssetID: "",
	});
	const getAssets = async () => {
		const { data } = await api.get("/assets");
		if (data.success) {
			const transformedData = data.machines.map((item) => ({
				value: item.AssetName,
				key: item.AssetID,
			}));
			setOptions(transformedData);
			setloader(false);
		} else {
			console.log("error");
		}
	};
	useEffect(() => {
		getAssets();
	}, []);
	return (
		<ScrollView>
			<Header title={"بيانات الفحص اليومي"}></Header>

			{loader || !options.length ? (
				<Loader></Loader>
			) : (
				<View className=" flex  gap-6  p-4 pt-6">
					<View>
						<Dropdown
							title={"المعدة"}
							data={options}
							placeholder={"اختر المعدة"}
							onChange={(key) => {
								setChatStartUp({ ...chatStartUP, AssetID: key });
							}}></Dropdown>
					</View>

					<View>
						<FormField
							value={chatStartUP.failureDescription}
							handleChangeText={(value) => {
								setFormData({ ...chatStartUP, failureDescription: value });
							}}
							title={"وصف العطل"}
							placeholder={"ادخل وصف العطل"}></FormField>
					</View>

					<View>
						<MainButton
							className="mt-6"
							title={"حفظ"}
							handlePress={() => {
								console.log("k");
							}}></MainButton>
					</View>
				</View>
			)}
		</ScrollView>
	);
}
