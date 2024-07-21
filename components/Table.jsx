import React, { useState } from "react";
import {
	ScrollView,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
} from "react-native";
import ReportComponent from "../components/ReportComponent";
import TableRow from "./tableRow";
import DailyPrecentageRow from "./DailyPrecentageRow";
import DailyOperation from "./DailyOperation";
import InventoryItemComponent from "./InventoryItemComponent";
import ItemDetailsComponent from "./ItemDetailsComponent";
const Table = ({
	Inventoy,
	inventoryItemDetails,
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
	handlePress,
}) => {
	const renderContent = (item) => {
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
		} else if (dailyOperationalData) {
			return (
				<DailyOperation
					data={item}
					handlePress={handlePress}
				/>
			);
		} else if (Inventoy) {
			return (
				<InventoryItemComponent
					handlePress={handlePress}
					data={item}
				/>
			);
		} else if (inventoryItemDetails) {
			console.log(item, "item");
			return <ItemDetailsComponent data={item} />;
		} else {
			return null; // or some default component
		}
	};

	return (
		<View>
			<View className="flex flex-row p-4 justify-center bg-[#E4E7EC] items-center">
				{header.map((item, index) => (
					<View
						className="flex flex-1"
						key={index}
						style={styles.headerItem}>
						<Text className="font-tregular text-center leading-[18px]">
							{item}
						</Text>
					</View>
				))}
			</View>

			<ScrollView className="flex-1">
				{console.log(data, "data")}
				{data.map((item, index) => {
					console.log(item, "item");
					return <View key={index}>{renderContent(item)}</View>;
					// <View key={index}>{renderContent(item)}</View>;
				})}
			</ScrollView>
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
