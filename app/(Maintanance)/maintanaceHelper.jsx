import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Loader, Header } from "../../components";
import { ScrollView } from "react-native-virtualized-view";
import { ChatBotStartUp } from "../../components";
import Toast from "react-native-toast-message";
export default function maintanaceHelper() {
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [chatStartUP, setChatStartUp] = useState({
		failureDescription: "",
		AssetID: "",
		chating: false,
	});
	const [masseges, setMessages] = useState([
		{ massege: "this is massege ", massegeCreator: "Ai" },
		{ massege: "this is massege ", massegeCreator: "user" },
		{ massege: "this is massege ", massegeCreator: "Ai" },
	]);
	const getAssets = async () => {
		const { data } = await api.get("/assets");
		if (data.success) {
			const transformedData = data.machines.map((item) => ({
				value: item.AssetName,
				key: item.AssetID,
			}));
			setOptions(transformedData);
			setloader(false);
		} else {
			console.log("error");
		}
	};
	const startChat = () => {
		if (!chatStartUP.AssetID || !chatStartUP.failureDescription) {
			console.log("false");
			Toast.show({
				type: "error",
				text1: "الرجاء ملء البينات",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
			});
		} else {
			setChatStartUp({ ...chatStartUP, chating: true });
		}
	};
	useEffect(() => {
		getAssets();
	}, []);
	return (
		<View>
			<Header title={"بيانات الفحص اليومي"}></Header>

			{loader || !options.length ? (
				<Loader></Loader>
			) : (
				<View>
					<ScrollView></ScrollView>
				</View>

				// <ChatBotStartUp
				// 	startChatBot={startChat}
				// 	setAssets={(v) => {
				// 		setChatStartUp({ ...chatStartUP, AssetID: v });
				// 	}}
				// 	setfailureDescription={(v) => {
				// 		setChatStartUp({ ...chatStartUP, failureDescription: v });
				// 	}}
				// 	failureDescription={chatStartUP.failureDescription}
				// 	dropdownOptions={options}
				// />
			)}
			<Toast />
		</View>
	);
}
