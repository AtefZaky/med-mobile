import { Text, View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';
import {
	FormField,
	Header,
	Loader,
	MainButton,
	Select,
} from "../../components";
import React, { Component, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";
const ReportFailure = () => {
	const { user } = useGlobalContext();
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [formdata, setFormData] = useState({
		StatusDate: "",
		AssetID: "",
		FailureِAction: "",
		StatusID: "",
	});
	const assetsStatus = [
		{ option: "يعمل", id: "1" },
		{ option: "متوقف", id: "2" },
		// { option: "بلاغ", id: "3" },
		// { option: "عاطل", id: "4" },
		// { option: "عمرة", id: "5" },
		// { option: "لا يوجد", id: "6" },
	];
  const navigation = useNavigation();
	const getAssets = async () => {
		const { data } = await api.get("/assets");
		if (data.success) {
			const transformedData = data.machines.map((item) => ({
				option: item.AssetName,
				id: item.AssetID,
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
    console.log(formdata.StatusID)
    console.log(formdata)
    console.log(user)
    try {
      const data = {
        DepartmentID: user.DepartmentID,
        StatusDate: formdata.StatusDate,
        AssetID: formdata.AssetID,
        FailureِAction: formdata.FailureِAction,
        StatusID: formdata.StatusID
      }
      const res = await api.post('/failure/report', data);
      console.log('Response:', res);
      navigation.navigate('home')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response Error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request Error:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
  };

	return (
			<ScrollView>
				<View>
					<Header title={"الابلاغ عن الاعطال"} />
				</View>

				{loader || !options.length ? (
					<Loader></Loader>
				) : (
					<View className=" flex  gap-6  p-4 pt-6">
						<View>
							<FormField
								value={formdata.StatusDate}
								handleChangeText={(value) => {
									setFormData({ ...formdata, StatusDate: value });
								}}
								title={"التاريخ"}
								placeholder={"اختر التاريخ"}></FormField>
						</View>
						<View>
							<Select
								options={options}
								title={"المعدة"}
								placeHolder={"اختر المعدة"}
								setOption={(optionid) => {
									setFormData({
										...formdata,
										AssetID: optionid,
									});
								}}></Select>
						</View>
						<View>
							<Select
								options={assetsStatus}
								title={"حالة المعدة"}
								placeHolder={"اختر الحالة "}
								setOption={(optionid) => {
									setFormData({
										...formdata,
										StatusID: optionid,
									});
								}}></Select>
						</View>
						<View>
							<FormField
								value={formdata.FailureِAction}
								handleChangeText={(value) => {
									setFormData({ ...formdata, FailureِAction: value });
								}}
								title={"الاجراء المتخذ قبل الابلاغ"}
								placeholder={"ادخل الاجراء"}></FormField>
						</View>

						<View>
							<MainButton title={"ارسال"} handlePress={submitData}></MainButton>
						</View>
					</View>
				)}
				<Toast />
			</ScrollView>
	);

};

export default ReportFailure;
