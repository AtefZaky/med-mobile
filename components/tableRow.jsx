import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getTimeDifference } from "../utils/dateFormater";
import { ActivityIndicator } from "react-native";
import ProgressBar from "./ProgressBar";

const TableRow = ({ item, onStartMachine, onCloseMachine, numOfRows }) => {
	const [date, setDate] = useState({
		counter: "",
		startDate: item.StartIn,
		endDate: item.EndIn,
	});

	const [active, setActive] = useState(
		new Date(date.startDate) > new Date(date.endDate) ? 1 : 2
	);
	const [loader, setLoader] = useState({ open: false, close: false });

	useEffect(() => {
		if (active == 1) {
			const intervalId = setInterval(() => {
				const time = getTimeDifference(date.startDate);
				setDate({ ...date, counter: time });
			}, 1000);
			return () => clearInterval(intervalId);
		} else if (active == 2) {
			if (date.startDate && date.endDate) {
				const time = getTimeDifference(date.startDate, date.endDate);
				setDate({ ...date, counter: time });
			} else {
				setDate({ ...date, counter: 0 });
			}
		}

		// Cleanup on unmount or time change
	}, [active]);

	return (
		<View className="flex flex-row justify-between p-3 items-center border-b-[1px] border-[#E4E7EC]">
			<View className="flex flex-1">
				<Text className="text-center font-tmedium">{date.counter}</Text>
			</View>
			<View className="flex flex-1">
				<TouchableOpacity
					disabled={active == 2}
					onPress={async () => {
						setLoader({ ...loader, close: true });
						const res = await onCloseMachine(item.AssetID);
						if (res) {
							const nowDate = new Date();
							nowDate.setHours(nowDate.getHours() + 3);
							setDate({ ...date, endDate: nowDate });
							setActive(2);
							setLoader({ ...loader, close: false });
						}
					}}
					className={`${
						active == 2
							? "text-[#F15555] bg-[#F9EAEB]"
							: "bg-[#F15555] text-white "
					} px-4 py-1 rounded-md max-w-[1/${numOfRows}] ml-3`}>
					{loader.close ? (
						<ActivityIndicator
							animating={loader.close}
							color="#fff"
							size="small"
							className="ml-2"
						/>
					) : (
						<Text
							className={`text-center font-tmedium
                    ${active == 2 ? "text-[#F15555] " : " text-white "}`}>
							ايقاف
						</Text>
					)}
				</TouchableOpacity>
			</View>
			<View className="flex flex-1">
				<TouchableOpacity
					className={`${
						active == 1
							? "text-[#019444] bg-[#E8F0EE]"
							: "bg-[#019444] text-white "
					}  px-6 py-1 rounded-md max-w-[70px] ml-3`}
					disabled={active == 1}
					onPress={async () => {
						setLoader({ ...loader, open: true });
						const res = await onStartMachine(item.AssetID);
						if (res) {
							setLoader(false);
							const nowDate = new Date();
							nowDate.setHours(nowDate.getHours() + 3);
							setDate({ ...date, counter: 0, startDate: nowDate });
							setActive(1);
							setLoader({ ...loader, open: false });
						}
					}}>
					{loader.open ? (
						<ActivityIndicator
							animating={loader.open}
							color="#fff"
							size="small"
							className="ml-2"
						/>
					) : (
						<Text
							className={`font-tmedium ${
								active == 1 ? "text-[#019444]" : " text-white"
							}`}>
							بدء
						</Text>
					)}
				</TouchableOpacity>
			</View>
			<View className="flex flex-1">
				<Text className="font-tmedium text-center">{item.AssetName}</Text>
				<ProgressBar value={99} />
			</View>
		</View>
	);
};

export default TableRow;
