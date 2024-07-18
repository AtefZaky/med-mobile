import { Text, View } from "react-native";
import React from "react";

const FailureDetailsHeaderItem = ({ data }) => {
	return (
		<View
			className=" flex-row-reverse gap-[8px] items-center  w-full p-4    ml-0
        ">
			<Text className="font-tmedium text-base w-[70px]">{data.title}</Text>
			<Text className="font-tbold text-base ">{data.value}</Text>
		</View>
	);
};

export default FailureDetailsHeaderItem;
