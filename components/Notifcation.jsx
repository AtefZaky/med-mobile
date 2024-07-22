import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { icons } from "../constants";
const Notify = ({ data }) => {
	const { message, piriority, phone, Department, date } = data;

	return (
		<View className={`w-full bg-[#F6F6F6] p-2  rounded-lg`}>
			<View className="flex flex-row-reverse justify-between mb-2  w-full">
				<Text className="font-tbold  text-base">{Department}</Text>
				<Image
					source={icons.flag}
					resizeMode="contain"
					className="w-4 h-4"
				/>
			</View>
			<View className>
				<Text className=" font-tregular text-base">{message}</Text>
			</View>

			<View>
				<Text className=" font-light mt-2 text-xs mb-2">{date}</Text>
			</View>
		</View>
	);
};

export default Notify;
