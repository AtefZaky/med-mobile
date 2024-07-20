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

const PopUpOper = ({setModalVisible, modalVisible, handleSubmit, isLoading }) => {
  const [formData , setFormData] = useState({
    H: "",
    value: ""
  })
  const handleChange = () => {
    if (formData.H === "" || formData.value === ""){
      return
    }
    handleSubmit(formData.H, formData.value)
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
								placeholder="أدخل الساعه"
								value={formData.H}
								keyboardType="numeric"
								onChangeText={(value) => {
									setFormData({ ...formData, H: value });
								}}
							/>
							<Text style={styles.textStyle}>س(الساعه)</Text>
						</View>

						<View style={styles.container}>
							<TextInput
								style={styles.input}
								placeholder="اخر قراءة"
								keyboardType="numeric"
								value={formData.value}
								onChangeText={(value) => {
									setFormData({ ...formData, value: value });
								}}
							/>
							<Text style={styles.textStyle}>اخر قرائه</Text>
						</View>

						<TouchableOpacity
							onPress={handleChange}
							activeOpacity={0.7}
							className={`bg-primary rounded-lg min-h-[33px] flex flex-row justify-center w-[250px] m-3 mt-5 items-center`}>
							<Image
								source={icons.ArrowUp}
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

export default PopUpOper;
