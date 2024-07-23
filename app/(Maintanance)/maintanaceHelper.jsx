import {
	View,
	Text,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import {
	Loader,
	Header,
	MassegeContainer,
	ChatBotStartUp,
} from "../../components";
import Toast from "react-native-toast-message";
import SubmitFormAiChat from "../../components/SubmitFormAiChat";
export default function maintanaceHelper() {
	const [options, setOptions] = useState([]);
	const [loader, setloader] = useState(true);
	const [chatStartUP, setChatStartUp] = useState({
		failureDescription: "",
		AssetID: "",
		chating: false,
	});

	const [buttonDisabled, setButtonDisabled] = useState(false);

	const [History, setHistory] = useState([]);

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
	const sendMassege = async (query) => {
		if (!query) {
			Toast.show({
				type: "error",
				text1: "الرجاء ملء البينات",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
			});
			return false;
		} else {
			setButtonDisabled(true);
			try {
				const res = await api.post("ai", { history: History, q: query });
				setHistory(res.data.history);
				setButtonDisabled(false);
				return true;
			} catch (err) {
				Toast.show({
					type: "error",
					text1: " فشل الاتصال",
					autoHide: true,
					visibilityTime: 3000,
					text1Style: {
						textAlign: "right",
					},
				});
				setButtonDisabled(false);

				return true;
			}
		}
	};

	useEffect(() => {
		getAssets();
	}, []);

	useEffect(() => {}, [chatStartUP.chating]);
	return (
		<View>
			<Header title={"المساعدة في الصيانة"}></Header>

			{loader || !options.length ? (
				<Loader></Loader>
			) : (
				<>
					{!chatStartUP.chating ? (
						<ChatBotStartUp
							startChatBot={startChat}
							setAssets={(v) => {
								setChatStartUp({ ...chatStartUP, AssetID: v });
							}}
							setfailureDescription={(v) => {
								setChatStartUp({ ...chatStartUP, failureDescription: v });
							}}
							failureDescription={chatStartUP.failureDescription}
							dropdownOptions={options}
						/>
					) : (
						<>
							{loader ? (
								<Loader isLoading={loader}></Loader>
							) : (
								<KeyboardAvoidingView
									behavior={Platform.OS === "ios" ? "padding" : "height"}
									keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 64}>
									<ScrollView className="h-[76vh] p-4">
										{History.map((item, index) => {
											return (
												<MassegeContainer
													{...item}
													key={index}
												/>
											);
										}) || <Text>لا يوجد رسائل</Text>}
									</ScrollView>

									<SubmitFormAiChat
										buttonDisabled={buttonDisabled}
										sendMassege={sendMassege}
									/>
								</KeyboardAvoidingView>
							)}
						</>
					)}
				</>
			)}
			<Toast />
		</View>
	);
}
