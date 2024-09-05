import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import {
	Header,
	Table,
	Loader,
	PopUpOper,
	MainLayout,
	ScrollComponent,
	ErrorMassege,
} from "../../components";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import api from "../../utils/api";
import { router } from "expo-router";

const DailyOperation = () => {
	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});

	function getMaxDigitKey(data) {
		let maxKey = null;

		data.forEach((item) => {
			Object.keys(item).forEach((key) => {
				// Check if the key is composed only of digits
				if (/^\d+$/.test(key)) {
					// Convert the key to a number for comparison
					const numericKey = Number(key);

					// Check if the value is not null
					if (item[key] !== null) {
						// Update maxKey if it is null or the current numeric key is greater
						if (maxKey === null || numericKey > Number(maxKey)) {
							maxKey = key;
						}
					}
				}
			});
		});

		return maxKey;
	}

	function getObjectsByAssetID(data, assetID) {
		return data.filter((item) => item.AssetID === assetID);
	}

	function getUniqueAssetIDAndName(data) {
		const uniqueAssets = [];

		data.forEach((item) => {
			const exists = uniqueAssets.some(
				(uniqueItem) =>
					uniqueItem.AssetID === item.AssetID &&
					uniqueItem.AssetName === item.AssetName
			);
			if (!exists) {
				uniqueAssets.push({
					AssetID: item.AssetID,
					AssetName: item.AssetName,
				});
			}
		});

		return uniqueAssets;
	}

	const getData = async () => {
		try {
			const response = await api.get("/operation/assets");
			const assets = response.data.assets;

			let filterdAsset = getUniqueAssetIDAndName(assets);
			filterdAsset = filterdAsset.map((item) => {
				const itemData = getObjectsByAssetID(assets, item.AssetID);
				const maxKey = getMaxDigitKey(itemData);

				return { ...item, lastHour: maxKey || "0 " };
			});

			setData(filterdAsset);
		} catch (error) {
			setToast({
				type: "error",
				text2: error.response.data.message
					? error.response.data.message
					: false,
				counter: toast.counter + 1,
			});
		} finally {
			setLoading(false);
		}
	};

	const header = ["اخر ساعة", "المعدة"];

	const handlePress = (AssetID) => {
		router.push("DailyOperationAsset/" + AssetID);
	};

	useFocusEffect(
		useCallback(() => {
			getData();
			return () => {
				console.log("This route is now unfocused.");
			};
		}, [])
	);

	return (
		<MainLayout
			title="بيانات التشغيل اليومية"
			toast={toast}
			loading={isLoading}>
			<>
				{data.length ? (
					<>
						<ScrollComponent
							refreshingFunction={getData}
							isLoading={isLoading}
							parentContainerStyle={"h-[85vh]"}>
							<Table
								header={header}
								DailyOperationAssets={true}
								data={data}
								routingfunction={handlePress}></Table>
						</ScrollComponent>
					</>
				) : (
					<ErrorMassege err={"لا توجد بيانات"}></ErrorMassege>
				)}
			</>
		</MainLayout>
	);
};

export default DailyOperation;
