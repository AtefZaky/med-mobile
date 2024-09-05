import Header from "./header";
import { View } from "react-native";
import React, { useEffect } from "react";
import Loader from "../UI/Loader";
import Toast from "react-native-toast-message";
import { toastMessege } from "../../constants";
const MainLayout = ({
	children,
	title,
	loading = false,
	hasLeftComponent = false,
	onDrawerPress,
	toast,
}) => {
	useEffect(() => {
		if (toast?.type && !toast?.modal) {
			Toast.show({
				type: toast?.type,
				text1:
					toast.type == "error" ? toastMessege.failure : toastMessege.success,
				text2: !toast.text2
					? toast.type === "error"
						? toastMessege.serverError
						: toastMessege.serverSuccess
					: toast.text2,
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Bold",
					fontSize: 16,
				},
				text2Style: {
					textAlign: "right",
					fontFamily: "Tajawal-Regular",
					fontSize: 14,
				},
			});
		}
	}, [toast]);

	return (
		<View className="bg-white min-h-[103vh]">
			<Header
				onDrawerPress={onDrawerPress}
				hasLeftComponent={hasLeftComponent}
				title={title}
			/>

			<Toast />

			<View style={{ zIndex: 4 }}>
				{loading ? (
					<Loader
						minus={140}
						isLoading={loading}
					/>
				) : (
					<>{children}</>
				)}
			</View>
		</View>
	);
};
export default MainLayout;
