import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

export default function ReportComponent({ data, routing }) {
	return (
		<View
			className={`${data.AssetStatus == 1 ? "bg-[#E8F0EE]" : "bg-[#F9EAEB]"}`}>
			<TouchableOpacity
				onPress={() => {
					routing(data.FailureID);
				}}
				className=" font-tmedium flex flex-row items-center px-4 gap-2 justify-center"
				style={[
					tw`   flex-1 flex justify-between items-center  flex-row-reverse  items-center p-[16px]   `,
					{ width: "100%" },
				]}>
				<Text className="font-tbold center max-w-[80px]">{data.FailureID}</Text>

				<Text className={`font-tbold center max-w-[80px] leading-6`}>
					{data.AssetName}
				</Text>

				<Text className={`font-tbold center max-w-[80px]`}>
					{data.FailureDate.split("T")[0] || 0}
				</Text>

				<Text
					className={` font-tbold center max-w-[80px]  ${
						data.AssetStatus == 1 ? "text-[#019444] " : "text-[#F15555]"
					}`}>
					{data.AssetStatus == 1 ? "تعمل" : "لا تعمل"}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
