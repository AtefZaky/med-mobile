import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { PopUp, Header, Table } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import { Loader } from "../../components";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";
import { getCurrentHour } from "../../utils/dateFormater";
const DailyPercentage = () => {
	const [data, setData] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [Modal, setModel] = useState({ show: false, item: "" });
	const header = ["ضغط الهواء", "الكيلو وات", "الطرد", "المص", "س"];
	let dailyDataSample = [];
	const createObject = (time, suck, direct, kiloWaat, airPressure) => {
		return { time, suck, direct, kiloWaat, airPressure };
	};

	const ChanageRow = (item) => {
		if (getCurrentHour() + 1 < parseInt(item.time) - 1) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "لا يمكن تعديل البيانات المستقبلية",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
			return;
		}
		setModel({ show: true, item: item });
	};

	const getData = async () => {
		try {
			const data = await api.get("/operation/department");
			const suck = data.data.operations[0];
			const direct = data.data.operations[1];
			const killowaat = data.data.operations[2];
			const air = data.data.operations[3];

			const filteredSuck = Object.fromEntries(
				Object.entries(suck).filter(([key, value]) => !isNaN(Number(key)))
			);

			const filteredDirect = Object.fromEntries(
				Object.entries(direct).filter(([key, value]) => !isNaN(Number(key)))
			);

			const filteredKilo = Object.fromEntries(
				Object.entries(killowaat).filter(([key, value]) => !isNaN(Number(key)))
			);

			const filteredAir = Object.fromEntries(
				Object.entries(air).filter(([key, value]) => !isNaN(Number(key)))
			);

			for (let key in filteredSuck) {
				const row = createObject(
					key,
					filteredSuck[key],
					filteredDirect[key],
					filteredKilo[key],
					filteredAir[key]
				);

				dailyDataSample.push(row);
			}
			setData(dailyDataSample);
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: error.message,
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);
	const UpdateRows = (item) => {
		const UpdatedData = data.map((row) => {
			return row.time == item.time ? item : row;
		});
		setData(UpdatedData);
	};
	return (
		<View className="bg-white min-h-[103vh]">
			<Header title="المناسيب اليومية" />
			<View>
				{Loading ? (
					<Loader
						isLoading={Loading}
						minus={140}></Loader>
				) : !data.length ? (
					<View className="flex justify-center items-center min-h-[73vh ]  ">
						<Text className="font-tbold text-lg mt-4"> لا توجد بينات</Text>
					</View>
				) : (
					<>
						<ScrollView className="max-h-[85vh]">
							<PopUp
								item={Modal.item}
								show={Modal.show}
								updateParent={UpdateRows}
								closeModel={() => {
									setModel({ ...Modal, show: false });
								}}
							/>

							<View className="w-full flex">
								<Table
									handlePress={(item) => {
										ChanageRow(item);
									}}
									header={header}
									dailyPrecentageData={true}
									data={data}></Table>
							</View>
						</ScrollView>
					</>
				)}
			</View>
			<Toast />
		</View>
	);
};

export default DailyPercentage;
