import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Image, TouchableOpacity } from 'react-native';
import MainButton from './MainButton';
import { icons, colors } from '../constants';

const PopUpFirst = (componentStyle) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleAddItem = () => {
    if (itemName && itemDescription) {
      // Logic to add the item can be added here.
      Alert.alert('Item Added', `Name: ${itemName}`, `Description: ${itemDescription}`);
      setModalVisible(!modalVisible);
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View className="">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="أدخل الساعه "
                value={itemName}
                onChangeText={setItemName}
              />
              <Text style={styles.textStyle}>س(الساعه)</Text>

            </View>

            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder=" منسوب المص "
                value={itemName}
                onChangeText={setItemName}
              />
              <Text style={styles.textStyle}>منسوب المص</Text>

            </View>

            <View style={styles.container}>

              <TextInput
                style={styles.input}
                placeholder="منسوب الطرد "
                value={itemDescription}
                onChangeText={setItemDescription}
              />
              <Text style={styles.textStyle}>منسوب الطرد</Text>

            </View>
            <View style={styles.container}>

              <TextInput
                style={styles.input}
                placeholder="الكيلو وات "
                value={itemDescription}
                onChangeText={setItemDescription}
              />
              <Text style={styles.textStyle}>الكيلو وات</Text>

            </View>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="ضغط الهواء "
                value={itemDescription}
                onChangeText={setItemDescription}
              />

              <Text style={styles.textStyle}>ضغط الهواء</Text>

            </View>

            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
              className={`bg-primary rounded-lg min-h-[33px] flex flex-row justify-center w-[250px] m-3 mt-5 items-center`}
            >
              <Image source={icons.ArrowLineUpRight} className={`h-5 w-5 mr-1`} />
              <Text className={`text-white font-tbold text-md`}>
                حفظ
              </Text>

              {/* {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            className="ml-2"
          />
        )} */}
            </TouchableOpacity>


          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        className={`bg-primary rounded-lg min-h-[33px] flex flex-row justify-center w-[111px] items-center`}
      >
        <Image source={icons.pencil} className={`h-5 w-5 mr-1`} />
        <Text className={`text-white font-tbold text-md`}>
          اضافة
        </Text>

        {/* {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )} */}
      </TouchableOpacity>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        className= " rounded-lg flex justify-center"
        onPress={() => setModalVisible(true)}>
        <Image source={icons.pencil} className={`h-6 w-6 mr-6`} />
        <Text style={styles.textStyle}>إضافة</Text>
      </Pressable> */}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    textAlign: "center",
    textAlignVertical: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#2B2B2B3D',

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: 250,
  },
  buttonOpen: {
    backgroundColor: colors.primary,
    color: 'white',
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 4,
    width: "70%",
    borderRadius: 5,
  },
});

export default PopUpFirst;