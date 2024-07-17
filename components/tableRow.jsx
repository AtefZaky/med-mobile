import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getTimeDifference } from "../utils/dateFormater";
import { ActivityIndicator } from "react-native";

const TableRow = ({ item, onStartMachine, onCloseMachine }) => {
	const [date, setDate] = useState({ counter: "", startDate: item.UpdateDate });
	const [active, setActive] = useState(item.StatusID);
	const [loader, setLoader] = useState({ open: false, close: false });

	useEffect(() => {
		if (active == 1) {
			const intervalId = setInterval(() => {
				const time = getTimeDifference(date.startDate);
				setDate({ ...date, counter: time });
			}, 1000);
			return () => clearInterval(intervalId);
		}
		if (active == 2) {
			setDate({ ...date, counter: 0 });
		}
		// Cleanup on unmount or time change
	}, [active]);

	return (
		<View className="flex flex-row justify-between py-2  px-3 items-center">
			<View className="basis-1/4">
				<Text className="text-center font-tmedium">{date.counter}</Text>
			</View>
			<View className="basis-1/4">
				<TouchableOpacity
					disabled={active == 2}
					onPress={async () => {
						setLoader({ ...loader, close: true });
						const res = await onCloseMachine(item.AssetID);
						if (res) {
							setActive(2);
							setLoader({ ...loader, close: false });
						}
					}}
					className={`${
						active == 2
							? "text-[#F15555] bg-[#F9EAEB]										]"
							: "bg-[#F15555] text-white "
					} px-4 py-1 rounded-md max-w-[70px] ml-3`}>
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
			<View className="basis-1/4">
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
							setDate({ counter: 0, startDate: nowDate });
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
			<View className="basis-1/5">
				<Text className="font-tmedium">{item.AssetName}</Text>
			</View>
		</View>
	);
};

export default TableRow;
