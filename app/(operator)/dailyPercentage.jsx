import { Text, View, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Header, PopUp } from "../../components"

import React, { Component } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';

const DailyPercentage = () => {
  const {user} = useGlobalContext()
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <Header />
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
    </SafeAreaView>
  );
};

export default DailyPercentage;
