import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";

const DailyOperation = ({data, handlePress}) => {
      const filteredAsset = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => !isNaN(Number(key)) && value != null)
      ); 
      let values = Object.keys(filteredAsset)
      let size = values.length
      let lastKey = values[size-1]
      
      
  return (
    <View>
			<TouchableOpacity
				onPress={()=> handlePress(data.AssetID, data.OperationItemID)}
				className=" font-tmedium flex flex-row items-center px-4 justify-center"
				style={[
					tw`   flex-1 flex justify-between items-center  flex-row-reverse  items-center py-[16px]   `,
					{ width: "100%" },
				]}>
				<Text className="font-tbold text-center flex-1">{data.AssetName}</Text>

				<Text className={`font-tbold text-center leading-6 flex-1`}>
					{data.OperationItemName}
				</Text>

				<Text className={`font-tbold text-center flex-1`}>
					{values[size-1]}
				</Text>
				<Text className={`font-tbold text-center flex-1`}>
					{filteredAsset[lastKey]}
				</Text>

			</TouchableOpacity>
		</View>
  )
}

export default DailyOperation
