import { Text, View } from "react-native";
import React from "react";

const FailureDetailsHeaderItem = ({ data }) => {
	return (
		<View
			className=" flex-row-reverse gap-[8px] items-center  w-full px-4    m-0
        ">
			<Text className="font-tregular text-base w-[70px]">{data.title}</Text>
			<Text className="font-tmedium text-base ">{data.value}</Text>
		</View>
	);
};

export default FailureDetailsHeaderItem;
