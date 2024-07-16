import { Text, View, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import React, { Component } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { Header, Table } from '../../components';


const AssetsOperations = () => {
    const {user} = useGlobalContext()
    const assetsOperationHeader = [
        "عدد ساعات التشغيل من  بدء التشغيل",
        "ايقاف",
        "بدء",
        "اسم المعدة",
      ];
    const assetsOperatinData = [
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
        {
          AssetID: 435078,
          AssetName: "طلمبه رقم1",
          AssetClassID: 27,
          IsActive: 1,
          Active_Start_In: null,
          StatusID: null,
        },
      ];
      const date= new Date()
      const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
      
        // Ensure day and month are two digits
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}-${formattedMonth}-${year}`;
      };
      const formatedDate = formatDate(date)
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Header />
        <View className="flex justify-center p-4">
            <Text className="font-tregular text-base text-center">
                {formatedDate}
            </Text>
        </View>
        <View
          className="w-full flex py-4"
          style={{
              minHeight: Dimensions.get("window").height,
            }}
            >
            <Table assetsOperation={true} header={assetsOperationHeader} data={assetsOperatinData}/>
        </View>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssetsOperations;
