import {
	FormField,
	Header,
	Loader,
	MainButton,
	Dropdown,
} from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
export default function dailyExamination() {
	const { user } = useGlobalContext();
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [formdata, setFormData] = useState({
		Date: "",
		AssetID: "",

		WorkDone: "",

		Notes: "",
	});

	console.log(formdata);

	const navigation = useNavigation();

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

	const submitData = async () => {
		console.log(formdata.StatusID);
		console.log(formdata);
		console.log(user);
		try {
			const data = {
				DepartmentID: user.DepartmentID,
				AssetID: formdata.AssetID,
				WorkDone: formdata.WorkDone,
				Notes: formdata.Notes,
			};
			const res = await api.post("/failure/report", data);
			console.log("Response:", res);
			navigation.navigate("/Maintanacehome");
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error("Response Error:", error.response.data);
			} else if (error.request) {
				// The request was made but no response was received
				console.error("Request Error:", error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error("Error:", error.message);
			}
		}
	};

	return (
		<ScrollView>
			<Header title={"بيانات الفحص اليومي"}></Header>

			{loader || !options.length ? (
				<Loader></Loader>
			) : (
				<View className=" flex  gap-6  p-4 pt-6">
					<View>
						<FormField
							value={formdata.Date}
							handleChangeText={(value) => {
								setFormData({ ...formdata, Date: value });
							}}
							title={"التاريخ"}
							placeholder={"اختر التاريخ"}></FormField>
					</View>
					<View>
						<Dropdown
							title={"المعدة"}
							data={options}
							placeholder={"اختر المعدة"}
							onChange={(key) => {
								setFormData({ ...formdata, AssetID: key });
							}}></Dropdown>
					</View>
					<View>
						<FormField
							value={formdata.WorkDone}
							handleChangeText={(value) => {
								setFormData({ ...formdata, WorkDone: value });
							}}
							title={"الاعمال التي تمت"}
							placeholder={"ادخل الاعمال التي تمت"}></FormField>
					</View>
					<View>
						<FormField
							value={formdata.Notes}
							handleChangeText={(value) => {
								setFormData({ ...formdata, Notes: value });
							}}
							title={"الملاحظات"}
							placeholder={"ادخل الملاحظات"}></FormField>
					</View>

					<View>
						<MainButton
							className="mt-3"
							title={"حفظ"}
							handlePress={submitData}></MainButton>
					</View>
				</View>
			)}
		</ScrollView>
	);
}
