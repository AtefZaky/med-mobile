import { Text, View, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import React, { Component, useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';
import { Header, Table } from '../../components';
import { formatDate } from '../../utils/dateFormater';
import api from '../../utils/api';


const AssetsOperations = () => {
    const {user} = useGlobalContext()
    const [data, setData] = useState({})
    const assetsOperationHeader = [
        "عدد ساعات التشغيل من  بدء التشغيل",
        "ايقاف",
        "بدء",
        "اسم المعدة",
      ];

      useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getData();
            console.log(result.data);
            setData(result.data);
          } catch (error) {
            console.error('Error fetching data: ', error);
          }
        };
        fetchData()
      }, [])

      const getData = async () => {
        const response = await api.get("/assets");
        return response;
      };

      const handleStart = async(id) => {
        try {
          const date = new Date
          console.log(date)
          const currentDate = formatDate(date)
          console.log(currentDate)
          api.put(`/assets/${id}`, {
            StatusID: 1,
            StatusDate: currentDate
          })  
        } catch (error) {
          console.log(error)
        }
      }
      const handleEnd = async(id) => {
        try {
          const date = new Date
          console.log(date)
          const currentDate = formatDate(date)
          console.log(currentDate)
          api.put(`/assets/${id}`, {
            StatusID: 2,
            StatusDate: currentDate
          })  
        } catch (error) {
          console.log(error)
        }
      }
      
      const date= new Date()

      const formatDatee = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
      
        // Ensure day and month are two digits
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        return `${formattedDay}-${formattedMonth}-${year}`;
      };
      const formatedDate = formatDatee(date)
  return (
    <>
    {data ? (
        <ScrollView>
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
            <Table assetsOperation={true} header={assetsOperationHeader} data={data.machines} onStartMachine={handleStart} onCloseMachine={handleEnd}/>
        </View>
        <Toast />
      </ScrollView>
    ) : (
      <View className="flex justify-center p-4">
            <Text className="font-tregular text-base text-center">
                لا يوجد معدات
            </Text>
        </View>
    )}
      </>
  );
};

export default AssetsOperations;
