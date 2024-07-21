import { View, Text } from 'react-native'
import React from 'react'
import { Header } from '../../components'
import { useGlobalContext } from '../../context/GlobalProvider';
export default function notifcation() {

  return (
    <View>
     <Header title={"التنبيهات"}/>
     <ScrollView>
	</ScrollView>
    </View>
  )
}