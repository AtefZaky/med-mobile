import { Text, View, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import React, { Component } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';

const ReportFailure = () => {
  const {user} = useGlobalContext()
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
            >
            <View className= " mb-20" >
                <Text className="text-right font-tregular text-base text-primary">مرحبا بك</Text>
                <Text className="text-right font-tbold text-base text-primary mb-4">{user.username}</Text>
                <Text className="text-base text-primary font-tregular">اخر ظهور : <Text className="text-sm font-tlight">{user.lastActive}</Text></Text>
            </View>
        </View>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportFailure;
