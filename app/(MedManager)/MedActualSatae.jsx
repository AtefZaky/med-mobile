import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
	Dropdown,
	ErrorMassege,
	MainLayout,
	ScrollComponent,
} from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getDropdownData } from "../../utils/getFunction";
import api from "../../utils/api";
import { Loader } from "../../components";
import Station from "../../components/UI/Station";
import { Image } from "expo-image";
import { icons } from "../../constants";
import { Modal } from "react-native-web";
import PopUpLegend from "../../components/UI/PopUpLegend.";
import CustomDropDown from "../../components/UI/CustomDropDown";
const MedActualSatae = () => {
	const { user } = useGlobalContext();
	const [loader, setLoader] = useState(true);
	const [toast, setToast] = useState({
		type: "",
		text1: "",
		text2: "",
		counter: 0,
	});
	const [modalVisible, setModalVisible] = useState(false);
	const [dashnoardData, setDashnoardData] = useState({});
	const [selectedData, setSelectedData] = useState({
		DepartmentID: user.DepartmentID,
	});
	const [dashLoader, setDashLoader] = useState(false);
	const [DepartmentData, setDepartmentData] = useState([]);
	const getDepartmentData = async () => {
		try {
			const deparments = await getDropdownData(
				`/list/department/station/${selectedData.DepartmentID}`,
				"DepartmentID",
				"DepartmentName"
			);
			setDepartmentData(deparments);
		} catch (error) {
			console.log("error", error);
		} finally {
			setLoader(false);
		}
	};

	const getDashnoardData = async () => {
		setDashLoader(true);
		try {
			const data = await api.get(
				`stats/dashboard/${selectedData.DepartmentID}`
			);
			setDashnoardData(data.data.data);
			console.log(data.data.data);
		} catch (error) {
			console.log("error", error);
		} finally {
			setDashLoader(false);
		}
	};
	useEffect(() => {
		getDepartmentData();
	}, []);
	useEffect(() => {
		getDashnoardData();
	}, [selectedData]);

	return (
		<MainLayout
			toast={toast}
			title={"الحالة اللحظية لمحطات الطلمبات"}
			loading={loader}>
			<PopUpLegend
				setModalVisible={setModalVisible}
				modalVisible={modalVisible}></PopUpLegend>
			<View
				className="flex flex-row items-start justify-start py-1 px-4"
				style={{ gap: 12 }}>
				<Pressable
					onPress={() => {
						setModalVisible(true);
					}}>
					<Image
						className="mt-[26px]"
						source={icons.legendIcon}
						style={{ width: 35, height: 35 }}
					/>
				</Pressable>

				<Dropdown
					parentStyle={"basis-[78%] "}
					data={DepartmentData}
					DropdownHeghit={40}
					onChange={(e) => {
						setSelectedData({ ...selectedData, DepartmentID: e });
					}}
					defaultOption={{
						key: user.DepartmentID,
						value: user.UserDepartmentName,
					}}
				/>
			</View>

			{dashLoader ? (
				<>
					<Loader
						minus={180}
						isLoading={dashLoader}
					/>
				</>
			) : (
				<ScrollComponent
					contentContainerStyle={{ padding: 16, display: "flex" }}
					parentContainerStyle={"min-h-[79vh]"}>
					<>
						{dashnoardData.length > 0 ? (
							<>
								{dashnoardData?.map((item, index) => (
									<Station
										key={index}
										data={item}
									/>
								))}
							</>
						) : (
							<ErrorMassege></ErrorMassege>
						)}
					</>
				</ScrollComponent>
			)}
		</MainLayout>
	);
};

export default MedActualSatae;
