import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
} from "react-native";
import ReportComponent from "../components/ReportComponent";
import TableRow from "./tableRow";
import DailyPrecentageRow from "./DailyPrecentageRow";

const Table = ({
	header,
	routingfunction,
	data,
	onStartMachine,
	onCloseMachine,
	inputRecord,
	dailyPrecentageData,
	assetsOperation,
	dailyOperationalData,
	addingDailyPrecentageFunction,
	reports,
}) => {
	return (
		<View>
			<View className="flex flex-row gap-3 p-4 justify-between bg-[#E4E7EC] font items-center">
				{header.map((item, index) => (
					<View
						className="max-w-[70px] "
						key={index}
						style={styles.headerItem}>
						<Text className="font-tregular">{item}</Text>
					</View>
				))}
			</View>
			<View style={styles.scrollStyle}>
				<FlatList
					data={data}
					renderItem={({ item }) => {
						if (assetsOperation) {
							return (
								<TableRow
									item={item}
									onStartMachine={onStartMachine}
									onCloseMachine={onCloseMachine}
								/>
							);
						} else if (reports) {
							return (
								<ReportComponent
									data={item}
									routing={(failureID) => {
										routingfunction(failureID);
									}}
								/>
							);
						} else if (dailyPrecentageData) {
							return <DailyPrecentageRow data={item} />;
						}
					}}
				/>
			</View>
		</View>
	);
};

export default Table;

const styles = StyleSheet.create({
	rowStyle: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		width: "100%",
		display: "flex ",
		justifyContent: "center",
	},
	tableHeader: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 8,
	},
	scrollStyle: {
		display: "flex",

		// justifyContent: "center",
		// alignContent: "center",
	},
});
