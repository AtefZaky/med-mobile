import { Text, View, ScrollView, Dimensions } from 'react-native'
import Toast from "react-native-toast-message";
import { PopUp } from "../../components"

import React, { Component } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';

const DailyPercentage = () => {
  const {user} = useGlobalContext()
  return (
      <ScrollView>
        <View className="p-4">
      <PopUp/>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
            >
        </View>
        <Toast />
        </View>
      </ScrollView>
  );
};

export default DailyPercentage;
