import { Text, View, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { PopUp, Header, Table } from "../../components";
import { useNavigation } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";

import React, { Component, useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";
import PopUpOper from "../../components/popUpOper";

const DailyOperation = () => {
  const { user } = useGlobalContext();
  const [data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
	AssetID: "",
	OperationItemID: ""
  });
  const [isSubmitting, setSubmitting] = useState(false)
  const [key, setKey] = useState(0);

	const reloadScreen = () => {
	setKey(prevKey => prevKey + 1);
	};

	const getData = async () => {
		try {
			setSubmitting(true)
		  const response = await api.get('/operation/assets');
		  const assets = response.data.assets;
		  setData(assets);
		  setSubmitting(false)
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
		  setSubmitting(false)
		}
	  };


  const header = ["اخر قراءة", "اخر ساعة", "الوحدة", "المعدة"];
  const handleSubmit = async (H, value) => {
    if (H === "" || value === "" || formData.OperationItemID === "" || formData.AssetID === "") {
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
      setSubmitting(true);
      await api.put('/operation/assets', {
        H: H,
        value: value,
        AssetID: formData.AssetID,
        OperationItemID: formData.OperationItemID
      });
      setSubmitting(false);
      setModalVisible(false);
      await getData(); // Fetch the latest data
      reloadScreen(); // Force a re-render
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
      setSubmitting(false);
    }
  };

  const handlePress = (AssetID, OperationItemID) => {
    setModalVisible(true);
    setFormData({ ...formData, AssetID: AssetID, OperationItemID: OperationItemID });
  };

  useEffect(() => {
    getData();
  }, []);
  
	return (
		<ScrollView>
			<Header title="بينات التشغيل اليومية" />
			<View>
				<View
					className="w-full flex">
					<Table
						header={header}
						dailyOperationalData={true}
						data={data}
						handlePress={handlePress}
					></Table>
					<PopUpOper setModalVisible={setModalVisible} modalVisible={modalVisible} setFormData={setFormData} formData= {formData} handleSubmit={handleSubmit} isLoading = {isSubmitting}/>
				</View>
				<Toast />
			</View>
			
		</ScrollView>
	);
};

export default DailyOperation;
