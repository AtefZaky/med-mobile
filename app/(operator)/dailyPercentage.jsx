import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
	PopUp,
	Table,
	MainLayout,
	ErrorMassege,
	ScrollComponent,
} from "../../components";
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { getCurrentHour } from "../../utils/dateFormater";
const DailyPercentage = () => {
	const [data, setData] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [Modal, setModel] = useState({ show: false, item: "" });
	const [lastKey, setLastKey] = useState(0);
	const [Toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const header = [
		"منسوب بعد الشبك",
		"منسوب قبل الشبك",
		"ضغط الهواء",
		"الكيلو وات",
		"الطرد",
		"المص",
		"س",
	];
	let dailyDataSample = [];
	const createObject = (
		time,
		suck,
		direct,
		kiloWaat,
		airPressure,
		bMerge,
		aMerge
	) => {
		return { time, suck, direct, kiloWaat, airPressure, bMerge, aMerge };
	};

	const ChanageRow = (item) => {
		if (getCurrentHour() + 1 < parseInt(item.time) - 1) {
			setToast({
				type: "error",

				text2: "لا يمكن تعديل البيانات المستقبلية",
			});

			return;
		}
		setModel({ show: true, item: item });
	};
	useEffect(() => {
		if (data.length > 0) {
			const key = data.find((item, index) => {
				if (Object.values(item).includes(null)) {
					setLastKey(index);
					return index;
				}
			});
		} else {
			setLastKey(1);
		}
	}, [data]);

	const getData = async () => {
		try {
			const data = await api.get("/operation/department");

			const suck = data.data.operations[0];
			const direct = data.data.operations[1];
			const killowaat = data.data.operations[2];
			const air = data.data.operations[3];
			const bMerge = data.data.operations[4];
			const aMerge = data.data.operations[5];

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
			const filteredBMerge = Object.fromEntries(
				Object.entries(bMerge).filter(([key, value]) => !isNaN(Number(key)))
			);
			const filteredAMerge = Object.fromEntries(
				Object.entries(aMerge).filter(([key, value]) => !isNaN(Number(key)))
			);

			for (let key in filteredSuck) {
				const row = createObject(
					key,
					filteredSuck[key],
					filteredDirect[key],
					filteredKilo[key],
					filteredAir[key],
					filteredBMerge[key],
					filteredAMerge[key]
				);

				dailyDataSample.push(row);
			}
			setData(dailyDataSample);
		} catch (error) {
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
		getData();
	}, []);
	const UpdateRows = (item) => {
		const UpdatedData = data.map((row) => {
			return row.time == item.time ? item : row;
		});
		setData(UpdatedData);
	};
	return (
		<MainLayout
			loading={Loading}
			title=" المناسيب اليومية لمحطة الطلمبات"
			toast={Toast}>
			{!data.length ? (
				<ErrorMassege err="لا توجد بيانات"></ErrorMassege>
			) : (
				<>
					<PopUp
						item={Modal.item}
						show={Modal.show}
						updateParent={UpdateRows}
						closeModel={() => {
							setModel({ ...Modal, show: false });
						}}
					/>
					<ScrollComponent
						refreshingFunction={getData}
						isLoading={Loading}
						parentContainerStyle={"h-[85vh]"}>
						<Table
							handlePress={(item) => {
								if (item.time > lastKey + 1) {
									setToast({
										type: "error",
										text2: " يجب ادخال البيانات بالترتيب",
										modal: false,
									});
								} else {
									ChanageRow(item);
								}
							}}
							header={header}
							dailyPrecentageData={true}
							data={data}></Table>
					</ScrollComponent>
				</>
			)}
		</MainLayout>
	);
};

export default DailyPercentage;
