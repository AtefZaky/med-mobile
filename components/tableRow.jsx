import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getTimeDifference } from '../utils/dateFormater'

const TableRow = ({item, onStartMachine, onCloseMachine}) => {
    const [time, setTime] = useState(0)
    console.log(item)
    useEffect(() => {
        const date = new Date
        console.log(date)
        setTimeout(() => {
            const time = getTimeDifference(item.UpdateDate, date)
            console.log(time)
            setTime(time)
        }, 1000);
    }, [time])
    console.log(time)
    
  return (
    <View className="flex flex-row justify-between py-2  px-3 items-center">
    <View className="basis-1/4">
        <Text className="text-center font-tmedium">
            {time}
        </Text>
    </View>
    <View className="basis-1/4">
        <TouchableOpacity
            onPress={() => {
                onCloseMachine(item.AssetID);
            }}
            className={`${
                item.IsActive == 2
                    ? "text-[#F15555] bg-[#F9EAEB]										]"
                    : "bg-[#F15555] text-white "
            } px-4 py-1 rounded-md max-w-[70px] ml-3`}>
            <Text
                className={`text-center font-tmedium
                    ${item.IsActive == 2 ? "text-[#F15555] " : " text-white "}`}>
                ايقاف
            </Text>
        </TouchableOpacity>
    </View>
    <View className="basis-1/4">
        <TouchableOpacity
            className={`${
                item.IsActive == 1
                    ? "text-[#019444] bg-[#E8F0EE]"
                    : "bg-[#019444] text-white "
            }  px-6 py-1 rounded-md max-w-[70px] ml-3`}
            onPress={() => {
                onStartMachine(item.AssetID);
            }}>
            <Text
                className={`font-tmedium ${
                    item.IsActive == 1 ? "text-[#019444]" : " text-white"
                }`}>
                بدء
            </Text>
        </TouchableOpacity>
    </View>
    <View className="basis-1/5">
        <Text className="font-tmedium">{item.AssetName}</Text>
    </View>
</View>
  )
}

export default TableRow