import { View, Text } from "react-native";
import React from "react";
import { MainLayout, ScrollComponent, MainButton } from "../../../components";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
const ScheduleItemsScreen = () => {
	const { id, ScheduleTypeID } = useLocalSearchParams();
	return (
		<MainLayout title={"تفاصيل العمرة"}>
			<ScrollComponent
				parentContainerStyle={"min-h-[85vh]"}
				contentContainerStyle={{
					alignItems: "center",
					display: "flex",
					height: "100%",
					flexDirection: "coulmn",
					padding: 16,
					gap: 16,
					justifyContent: "center",
				}}>
				<MainButton
					containerStyles={`${ScheduleTypeID == 2 ? "hidden" : ""}`}
					title={" قطع غيار مخططة"}
					handlePress={() => {
						router.navigate(`ScheduleSpareParts/${id}?sparePartType=0`);
					}}
				/>
				<MainButton
					title={"مقايسة تقديرية"}
					containerStyles={`${ScheduleTypeID == 2 ? "hidden" : ""}`}
					handlePress={() => {
						router.navigate({
							pathname: `Assesment/${id}`,
							params: {
								AssesmentType: 0,
								editable: false,
								showToast: false,
							},
						});
					}}
				/>

				<MainButton
					title={"قطع غيار فعلية"}
					handlePress={() => {
						router.navigate(`ScheduleSpareParts/${id}?sparePartType=1`);
					}}
				/>

				<MainButton
					title={"اعمال مقاولة فعلية"}
					handlePress={() => {
						router.navigate({
							pathname: `Assesment/${id}`,
							params: {
								AssesmentType: 1,
								editable: false,
								showToast: false,
							},
						});
					}}
				/>
				<MainButton
					title={"صور العمرة"}
					handlePress={() => {
						router.navigate(`ScheduleData/ScheduleGallery/${id}`);
					}}
				/>
			</ScrollComponent>
		</MainLayout>
	);
};

export default ScheduleItemsScreen;
