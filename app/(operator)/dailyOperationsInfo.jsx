import { Text, View, ScrollView, Dimensions } from 'react-native'
import Toast from "react-native-toast-message";
import { Header } from '../../components';
import React, { Component } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider';

const DailyOperationsInfo = () => {
  const {user} = useGlobalContext()
  return (
      <ScrollView>
        <Header title="المناسيب اليومية" />
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
  );
};

export default DailyOperationsInfo;
