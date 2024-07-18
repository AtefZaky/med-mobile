import { Text, View, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { PopUp, Header, Table } from "../../components";
import { ScrollView } from "react-native-virtualized-view";

import React, { Component } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";

const DailyPercentage = () => {
	const { user } = useGlobalContext();

	const header = ["ضغط الهواء", "الكيلو وات", "الطرد", "المص", "س"];
	const dailyDataSample = [
		{ time: 1, suck: 4, direct: 455, kiloWaat: 546, airPressure: 54 },
		{ time: 1, suck: 4, direct: 455, kiloWaat: 546, airPressure: 54 },
		{ time: 1, suck: 4, direct: 455, kiloWaat: 546, airPressure: 54 },
		{ time: 1, suck: 4, direct: 455, kiloWaat: 546, airPressure: 54 },
		{ time: 1, suck: 4, direct: 455, kiloWaat: 546, airPressure: 54 },
		{ time: 1, suck: 4, direct: 455, kiloWaat: 546, airPressure: 54 },
	];
	return (
		<ScrollView>
			<Header title="المناسيب اليومية" />
			<View>
				<View className="p-4 w-full">
					<PopUp />
				</View>

				<View className="w-full flex mt-4">
					<Table
						header={header}
						dailyPrecentageData={true}
						data={dailyDataSample}></Table>
				</View>
				<Toast />
			</View>
		</ScrollView>
	);
};

export default DailyPercentage;
