import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Redirect, Stack, useRouter } from "expo-router";
import { roles } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
export default function MangerLayout() {
	const { loading, isLogged, user } = useGlobalContext();

	if (user.type === roles.operator) {
		 <Redirect href="/home" />;
	} else if (user.type === roles.maintenar) {
			<Redirect href="/Maintanacehome" />;
	} else if (user.type === roles.manager) {
		 <Redirect href="/MangerHome" />;
	}

	return (
		<>
			<SafeAreaView>
				<Stack>
					<Stack.Screen name="MangerHome" options={{ headerShown: true }}/>
					<Stack.Screen name="notifcation" options={{headerShown:false}}/>

				
				</Stack>
			</SafeAreaView>
		</>
	);
}
