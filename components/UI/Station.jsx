import { View, Text } from "react-native";
import React from "react";

const Station = ({ data }) => {
	const colors = {
		"circle circle3": "green",
		"circle circle4": "orange",
		"circle circle2": "blue",
		"circle circle1": "red",
		"circle circle5": "brown",
		"circle circle6": "white",
		"circle circle7": "black",
	};

	return (
		<View
			className="flex mt-4 bg-[#F6F6F6] p-4 rounded-lg"
			style={{ gap: 12 }}>
			<View
				className="flex "
				style={{ gap: 8 }}>
				<View>
					<Text className="text-center font-tbold text-lg">
						{data.DepartmentName}
					</Text>
				</View>

				<View className="flex  items-center">
					<View className="flex flex-1 flex-row">
						<Text className="flex-1 font-tregular text-center "> المعدات</Text>
						<Text className="flex-1 font-tregular  text-center ">البلاغات</Text>
						<Text className="flex-1 font-tregular  text-center">الاعطال</Text>
						<Text className="flex-1 font-tregular  text-center">العمرات</Text>
					</View>
					<View className="flex flex-1 flex-row">
						<Text className="flex-1 font-tmedium text-center ">
							{data.OpAssetCount}
						</Text>
						<Text className="flex-1 font-tmedium text-center ">
							{data.OpNotify}
						</Text>
						<Text className="flex-1 font-tmedium  text-center">
							{data.OpFailure}
						</Text>
						<Text className="flex-1 font-tmedium text-center ">
							{data.OpSchedule}
						</Text>
					</View>
				</View>
			</View>

			<View className="flex flex-row-reverse items-center justify-evenly  px-4">
				{Object.keys(data).map((key, index) => {
					if (
						key[0] == "P" &&
						key[1] == "s" &&
						data[key] !== "circle circle6"
					) {
						return (
							<View
								key={index}
								className=" font-tmedium rounded-full w-4 h-4"
								style={{ backgroundColor: colors[data[key]] }}></View>
						);
					} else {
						return null;
					}
				})}
			</View>
		</View>
	);
};

export default Station;
