import { Text, View } from "react-native";
import React from "react";

const FailureDetailsHeaderItem = ({
	data,
	labelStyle = "",
	valueStyle = "",
}) => {
	return (
		<View className=" flex-row-reverse gap-[8px] items-center  w-full px-4  m-0 border-b-[0.5px] border-[#2B2B2B20] ">
			<Text
				className={`font-tregular text-base break-all w-[36%] ${labelStyle}`}>
				{data?.title}
			</Text>
			<Text className={`font-tmedium text-base  max-w-[63%] ${valueStyle}`}>
				{data?.value}
			</Text>
		</View>
	);
};

export default FailureDetailsHeaderItem;
