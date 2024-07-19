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
			<View className="flex flex-row p-4 justify-center bg-[#E4E7EC] items-center">
				{header.map((item, index) => (
					<View
						className=" flex flex-1 "
						key={index}
						style={styles.headerItem}>
						<Text className="font-tregular text-center">{item}</Text>
					</View>
				))}
			</View>
			<View>
				<FlatList
					extraData={data}
					data={data}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => {
						if (assetsOperation) {
							return (
								<TableRow
									item={item}
									onStartMachine={onStartMachine}
									onCloseMachine={onCloseMachine}
									numOfRows="4"
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
});
