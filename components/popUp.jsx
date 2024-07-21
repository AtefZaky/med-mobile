import React, { useState } from "react";
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	View,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";
import MainButton from "./MainButton";
import { icons, colors } from "../constants";
import Toast from "react-native-toast-message";
import api from "../utils/api";

const PopUp = ({ updateParent }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		time: "",
		suck: "",
		direct: "",
		kiloWaat: "",
		airPressure: "",
	});
	const handleSubmit = async () => {
		if(formData.time === "" || formData.suck === ""|| formData.direct === ""|| formData.kiloWaat === ""||formData.airPressure === ""){
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: "من فضلك ادخل البيانات المطلوبه",
				autoHide: true,
				visibilityTime: 3000,
				text1Style: {
				  textAlign: 'right',
				},
				text2Style: {
				  textAlign: 'right',
				},
			  });
			  return; // Prevent form submission if fields are empty
		}
		try {
			setIsLoading(true)
			await api.put('/operation/department', {
				H: formData.time,
				suck: formData.suck,
				direct: formData.direct,
				kilo: formData.kiloWaat,
				air: formData.airPressure
			});
			Toast.show({
				type: "success",
				text1: "عملية ناجحه",
				text2: "تم تسجيل الساعه بنجاح",
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
				  textAlign: 'right',
				},
				text2Style: {
				  textAlign: 'right',
				},
			  });
		
			  setTimeout(() => {
				updateParent(formData)
				setIsLoading(false)
				setModalVisible(false)
			  }, 1500);
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "خطأ",
				text2: error.message,
				autoHide: true,
				visibilityTime: 1500,
				text1Style: {
				  textAlign: 'right',
				},
				text2Style: {
				  textAlign: 'right',
				},
			  });
			  setIsLoading(false)
			  return; // Prevent form submission if fields are empty
		}
	}

	return (
		<View className="">
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.container}>
							<TextInput
								style={styles.input}
								placeholder="أدخل الساعه "
								value={formData.time}
								keyboardType="numeric"
								className="px-4"
								onChangeText={(value) => {
									setFormData({ ...formData, time: value });
								}}
							/>
							<Text style={styles.textStyle}>س(الساعه)</Text>
						</View>

						<View style={styles.container}>
							<TextInput
								style={styles.input}
								placeholder=" منسوب المص "
								keyboardType="numeric"
								value={formData.suck}
								className="px-4"
								onChangeText={(value) => {
									setFormData({ ...formData, suck: value });
								}}
							/>
							<Text style={styles.textStyle}>منسوب المص</Text>
						</View>

						<View style={styles.container}>
							<TextInput
								style={styles.input}
								placeholder="منسوب الطرد "
								keyboardType="numeric"
								value={formData.direct}
								className="px-4"
								onChangeText={(value) => {
									setFormData({ ...formData, direct: value });
								}}
							/>
							<Text style={styles.textStyle}>منسوب الطرد</Text>
						</View>
						<View style={styles.container}>
							<TextInput
								style={styles.input}
								placeholder="الكيلو وات "
								keyboardType="numeric"
								className="px-4"
								value={formData.kiloWaat}
								onChangeText={(value) => {
									setFormData({ ...formData, kiloWaat: value });
								}}
							/>
							<Text style={styles.textStyle}>الكيلو وات</Text>
						</View>
						<View style={styles.container}>
							<TextInput
								style={styles.input}
								placeholder="ضغط الهواء "
								keyboardType="numeric"
								className="px-4"
								value={formData.airPressure}
								onChangeText={(value) => {
									setFormData({ ...formData, airPressure: value });
								}}
							/>

							<Text style={styles.textStyle}>ضغط الهواء</Text>
						</View>

						<TouchableOpacity
							onPress={handleSubmit}
							activeOpacity={0.7}
							className={`bg-primary rounded-lg min-h-[33px] flex flex-row justify-center w-[250px] m-3 mt-5 items-center py-3`}>
							<Image
								source={icons.ArrowUpRight}
								className={`h-5 w-5 mr-1`}
							/>
							<Text className={`text-white font-tbold text-md`}>حفظ</Text>

							{isLoading && (
							<ActivityIndicator
								animating={isLoading}
								color="#fff"
								size="small"
								className="ml-2"
							/>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<TouchableOpacity
				onPress={() => setModalVisible(true)}
				activeOpacity={0.7}
				className={`bg-primary rounded-lg min-h-[33px] flex flex-row justify-center w-[111px] items-center`}>
				<Image
					source={icons.pencil}
					className={`h-5 w-5 mr-1`}
				/>
				<Text className={`text-white font-tbold text-md`}>اضافة</Text>

				{/* {isLoading && (
					<ActivityIndicator
					animating={isLoading}
					color="#fff"
					size="small"
					className="ml-2"
					/>
				)} */}
			</TouchableOpacity>
			{/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        className= " rounded-lg flex justify-center"
        onPress={() => setModalVisible(true)}>
        <Image source={icons.pencil} className={`h-6 w-6 mr-6`} />
        <Text style={styles.textStyle}>إضافة</Text>
      </Pressable> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		textAlign: "center",
		textAlignVertical: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		backgroundColor: "#2B2B2B3D",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 5,
		padding: 16,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 5,
		padding: 10,
		elevation: 2,
		marginTop: 10,
		width: 250,
	},
	buttonOpen: {
		backgroundColor: colors.primary,
		color: "white",
	},
	buttonClose: {
		backgroundColor: colors.primary,
	},
	textStyle: {
		color: "black",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 14,
	},
	modalText: {
		marginBottom: 10,
		textAlign: "center",
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 4,
		width: "70%",
		borderRadius: 5,
	},
});

export default PopUp;
