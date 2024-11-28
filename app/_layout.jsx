import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import GlobalProvider from "../context/GlobalProvider";
import "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import notifee, { AndroidImportance } from "@notifee/react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootStack = () => {
	//load the font to the app
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribeForeground = messaging().onMessage(
			async (remoteMessage) => {
				// Display a custom notification using Notifee
				const channelId = await notifee.createChannel({
					id: "default",
					name: "Default Channel",
					android: {
						importance: AndroidImportance.HIGH,
					},
				});

				await notifee.displayNotification({
					title: remoteMessage.notification?.title,
					body: remoteMessage.notification?.body,
					android: {
						channelId: channelId,
					},
				});
			}
		);

		return unsubscribeForeground;
	}, []);

	useEffect(() => {
		messaging().setBackgroundMessageHandler(async (remoteMessage) => {
			console.log("Message handled in the background!", remoteMessage);

			// Handle navigation based on notification data
			const { type, ...data } = remoteMessage.data;
			if (type === "specificType") {
				navigation.navigate("TargetScreen", { data });
			}
		});

		messaging()
			.getInitialNotification()
			.then((remoteMessage) => {
				if (remoteMessage) {
					console.log(
						"Notification caused app to open from quit state:",
						remoteMessage
					);

					// Handle deep linking based on the message content
					const { type, ...data } = remoteMessage.data;
					if (type === "specificType") {
						navigation.navigate("TargetScreen", { data });
					}
				}
			});
	}, [navigation]);

	const [fontsLoaded, error] = useFonts({
		"Tajawal-Bold": require("../assets/fonts/Tajawal-Bold.ttf"),
		"Tajawal-Light": require("../assets/fonts/Tajawal-Light.ttf"),
		"Tajawal-Medium": require("../assets/fonts/Tajawal-Medium.ttf"),
		"Tajawal-Regular": require("../assets/fonts/Tajawal-Regular.ttf"),
	});

	useEffect(() => {
		if (error) throw error;

		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, error]);

	if (!fontsLoaded) {
		return null;
	}

	if (!fontsLoaded && !error) {
		return null;
	}

	return (
		// the global provider is the context provider for the app provide user data  look at the context folder
		<GlobalProvider>
			<Stack>
				<Stack.Screen
					name="index"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(operator)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(Maintanance)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(manager)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(Global)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(inventoryUser)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="(MedManager)"
					options={{ headerShown: false }}
				/>
			</Stack>
		</GlobalProvider>
	);
};

export default RootStack;
