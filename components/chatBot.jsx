import { Text, View, ScrollView, Dimensions, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import ChatbotComponent from "./chatContent";
import { Header } from "./index";

import React, { Component } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const ChatBot = () => {
	const { user } = useGlobalContext();
	return (
		<View>
			<Header title="المناسيب اليوميه " />
			<ChatbotComponent />

			<Toast />
		</View>
	);
};

const styles = StyleSheet.create({
	contant: {
		flexDirection: "column",
		//   width: "90%" ,
		//   textAlign: "center",
		//   textAlignVertical: "center",
		//   height:"80%",
	},
});

export default ChatBot;
