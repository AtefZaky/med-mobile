import React, {useState} from "react";
import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
} from "react-native";
import ReportComponent from "../components/ReportComponent";
import TableRow from "./tableRow";


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
								<TableRow item={item} onStartMachine={onStartMachine} onCloseMachine={onCloseMachine} />
								// <View className="flex flex-row justify-between py-2  px-3 items-center">
								// 	<View className="basis-1/4">
								// 		<Text className="text-center font-tmedium">
								// 			{item.Active_Start_In || 0}
								// 		</Text>
								// 	</View>
								// 	<View className="basis-1/4">
								// 		<TouchableOpacity
								// 			onPress={() => {
								// 				onCloseMachine(item.AssetID);
								// 			}}
								// 			className={`${
								// 				item.IsActive == 2
								// 					? "text-[#F15555] bg-[#F9EAEB]										]"
								// 					: "bg-[#F15555] text-white "
								// 			} px-4 py-1 rounded-md max-w-[70px] ml-3`}>
								// 			<Text
								// 				className={`text-center font-tmedium
								// 					${item.IsActive == 2 ? "text-[#F15555] " : " text-white "}`}>
								// 				ايقاف
								// 			</Text>
								// 		</TouchableOpacity>
								// 	</View>
								// 	<View className="basis-1/4">
								// 		<TouchableOpacity
								// 			className={`${
								// 				item.IsActive == 1
								// 					? "text-[#019444] bg-[#E8F0EE]"
								// 					: "bg-[#019444] text-white "
								// 			}  px-6 py-1 rounded-md max-w-[70px] ml-3`}
								// 			onPress={() => {
								// 				onStartMachine(item.AssetID);
								// 			}}>
								// 			<Text
								// 				className={`font-tmedium ${
								// 					item.IsActive == 1 ? "text-[#019444]" : " text-white"
								// 				}`}>
								// 				بدء
								// 			</Text>
								// 		</TouchableOpacity>
								// 	</View>
								// 	<View className="basis-1/5">
								// 		<Text className="font-tmedium">{item.AssetName}</Text>
								// 	</View>
								// </View>

							);
						} else if (reports) {
							return (
								<ReportComponent
									data={item}
									onPress={() => {
										routingfunction;
									}}
								/>
							);
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
