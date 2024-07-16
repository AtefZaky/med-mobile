import { Text, View, ScrollView, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import Toast from "react-native-toast-message";

import React, { Component, useState } from 'react'
// import { useGlobalContext } from '../../context/GlobalProvider';

const SelectComponenet = ({
    title,
    otherStyles,
    icon
}) => {
    //   const {user} = useGlobalContext()
    const [value, setValue] = useState(null)
  return (
    <View className={`space-y-4 ${otherStyles}`}>
    <View className={` flex flex-row justify-end`}>
      <Text className="text-base text-dark font-tbold text-right">{title}</Text>
       {icon ? (<Image source={icon} resizeMode="contain" className={`h-6 w-6 ml-1`} />): ""} 
      </View>
      <View className="w-full h-16 px-4 bg-#FEFEFE rounded-lg border-[0.5px] border-primary focus:border-primary flex flex-row items-center">
          {/* {title === "كلمة المرور" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eyeIcon : icons.eyeIcon}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )} */}
          {icon && (
            <Image
            source={icon}
            className="w-6 h-6"
            resizeMode="contain"
            />
          )}
        {/* <TextInput
          className="flex-1 text-base text-dark font-tregular text-right"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#2B2B2B80"
          onChangeText={handleChangeText}
          secureTextEntry={title === "كلمة المرور" && !showPassword}
          {...props}
        /> */}
        <RNPickerSelect
        onValueChange={(value) => setValue(value)}
        items={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        value={value}
      />

      </View>
    </View>
  );
};

export default SelectComponenet;
