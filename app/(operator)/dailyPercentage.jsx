import { Text, View, Dimensions } from "react-native";
import Toast from "react-native-toast-message";
import { PopUp, Header, Table } from "../../components";
import { ScrollView } from "react-native-virtualized-view";

import React, { Component, useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import api from "../../utils/api";

const DailyPercentage = () => {
	const { user } = useGlobalContext();
  const [data, setData] = useState([])

	const header = ["ضغط الهواء", "الكيلو وات", "الطرد", "المص", "س"];
	let dailyDataSample = [];
  const createObject = (time, suck, direct, kiloWaat, airPressure) => {
    return { time, suck, direct, kiloWaat, airPressure };
  };
  useEffect(() => {
    const getData = async () => {
      const data = await api.get('/operation/department')
      console.log(data.data.operations)
      const suck = data.data.operations[0]
      const direct = data.data.operations[1]
      const killowaat = data.data.operations[2]
      const air = data.data.operations[3]
      const filteredSuck = Object.fromEntries(
        Object.entries(suck).filter(([key, value]) => key.startsWith('H') && value != null)
      );
      console.log(filteredSuck,"------------------------------")
      const filteredDirect = Object.fromEntries(
        Object.entries(direct).filter(([key, value]) => key.startsWith('H') && value != null)
      );
      console.log(filteredDirect,"------------------------------")
      const filteredKilo = Object.fromEntries(
        Object.entries(killowaat).filter(([key, value]) => key.startsWith('H') && value != null)
      );
      console.log(filteredKilo,"------------------------------")
      const filteredAir = Object.fromEntries(
        Object.entries(air).filter(([key, value]) => key.startsWith('H') && value != null)
      );
      console.log(filteredAir,"------------------------------")
      let index = 1
      for (let key in filteredSuck) {
        const row = createObject(index, filteredSuck[key], filteredDirect[key], filteredKilo[key], filteredAir[key])
        console.log(row)
        dailyDataSample.push(row)
        index++;
      }
      console.log(dailyDataSample)
      setData(dailyDataSample)
    }
    getData()
  }, [])
  
	return (
		<ScrollView>
			<Header title="المناسيب اليومية" />
			<View>
				<View className="p-4 w-full">
					<PopUp updateParent = {(e)=> setData([...data,e])}/>
				</View>
				<View
					className="w-full flex mt-4">
					<Table
						header={header}
						dailyPrecentageData={true}
						data={data}></Table>
				</View>
				<Toast />
			</View>
		</ScrollView>
	);
};

export default DailyPercentage;
