import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
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
		try {
			const { data } = await api.get("/departments");

			if (data.success) {
				const transformedData = data.Assets.map((item) => ({
					value: item.AssetName,
					key: item.AssetID,
				}));

				setOptions(transformedData);
			} else {
				Toast.show({
					type: "error",
					text1: data.data.message || " فشل في الاتصال",
					autoHide: true,
					visibilityTime: 3000,
					text1Style: {
						textAlign: "right",
					},
				});
			}
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
		} finally {
			setloader(false);
		}
	};
	const startChat = async () => {
		if (!chatStartUP.AssetID || !chatStartUP.failureDescription) {
			return Toast.show({
				type: "error",
				text1: "الرجاء ملء البينات",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
					textAlign: "right",
				},
			});
		}
		setloader(true);
		try {
			const start = {
				AssetID: chatStartUP.AssetID,
				history: [],
				q: chatStartUP.failureDescription,
			};
			const res = await api.post("ai", start);
			setChatStartUp({ ...chatStartUP, chating: true });

			setHistory(res.data.history);
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
		} finally {
			setloader(false);
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
				const res = await api.post("ai", {
					history: History,
					q: query,
					AssetID: chatStartUP.AssetID,
				});

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
	const scrollViewRef = useRef(null);
	function scrollViewSizeChanged(height) {
		// y since we want to scroll vertically, use x and the width-value if you want to scroll horizontally
		scrollViewRef.current?.scrollTo({ y: height, animated: true });
	}
	return (
		<View className="bg-white min-h-[103vh]">
			<Header title={"المساعدة في الصيانة"}></Header>
			<View>
				{loader ? (
					<Loader
						minus={140}
						isLoading={loader}></Loader>
				) : (
					<>
						{!options.length ? (
							<>
								<View className="flex w-full h-full items-center mt-4 ">
									<Text className="text-lg  text-black font-tbold">
										لا توجد بينات
									</Text>
								</View>
							</>
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
												keyboardVerticalOffset={
													Platform.OS === "ios" ? 64 : 140
												}>
												<ScrollView
													onContentSizeChange={(width, height) => {
														scrollViewRef.current?.scrollToEnd({
															animated: true,
														});
													}}
													ref={scrollViewRef}
													className="h-[77vh] p-4 ">
													{History.slice(2).map((item, index) => {
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
					</>
				)}
			</View>
			<Toast />
		</View>
	);
}
