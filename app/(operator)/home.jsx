import { Text, View, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';

import React, { Component, useState, useEffect } from 'react'
import { Header, MainButton } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';

const Home = () => {
  const {user} = useGlobalContext()
  const navigation = useNavigation();
  const [data, setData] = useState(null)
    // useEffect(() => {
       
    // }, [third])
    
  return (
    <SafeAreaView className="bg-white h-full">
        <Header />
      <ScrollView>
        <View
          className="flex px-4 my-6"
          style={{
              minHeight: Dimensions.get("window").height,
            }}
            >
            <View className= " mb-20" >
                <Text className="text-right font-tregular text-base text-primary">مرحبا بك</Text>
                <Text className="text-right font-tbold text-base text-primary mb-4">{user.username}</Text>
                <Text className="text-base text-primary font-tregular">اخر ظهور : <Text className="text-sm font-tlight">{user.lastActive}</Text></Text>
            </View>
          <MainButton
            title="تشغيل و ايقاف الوحدات"
            containerStyles="mt-7"
            handlePress={()=> navigation.navigate('assetsOperations')}
          />
          <MainButton
            title="المناسيب اليومية"
            containerStyles="mt-7"
            handlePress={()=> navigation.navigate('dailyPercentage')}
          />
          <MainButton
            title="بيانات التشغيل اليومية"
            containerStyles="mt-7"
            handlePress={()=> navigation.navigate('dailyOperationsInfo')}
          />
          <MainButton
            title="الابلاغ عن العطال"
            containerStyles="mt-7"
            handlePress={()=> navigation.navigate('reportFailure')}
          />
        </View>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
