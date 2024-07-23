import { View, Text } from "react-native";
import React from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { formatDate } from "../utils/dateFormater";
export default function UserInfo() {
	const { user } = useGlobalContext();
	const lastSeen = formatDate(new Date(user?.lastActive), true);

	return (
		<View className=" mb-14 p-4">
			<Text className="text-right font-tregular text-base text-[#133E54]">
				مرحبا بك
			</Text>
			<Text className="text-right font-tbold text-base text-[#133E54] mb-4">
				{user ? user?.username : ""}
			</Text>
			<Text className="text-base text-[#133E54] font-tregular">
				اخر ظهور :
				<Text className="text-sm font-tregular">
					{user ? `${lastSeen[0] || ""}     الساعة: ${lastSeen[1] || ""}` : ""}
				</Text>
			</Text>
		</View>
	);
}
