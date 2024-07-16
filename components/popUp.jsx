import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Image ,TouchableOpacity} from 'react-native';
import MainButton from './MainButton';
import { icons } from '../constants';

const PopUp = (componentStyle) => {
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
            <TextInput
              style={styles.input}
              placeholder="المص "
              value={itemName}
              onChangeText={setItemName}
            />
            <TextInput
              style={styles.input}
              placeholder="الطرد "
              value={itemDescription}
              onChangeText={setItemDescription}
            />
              <TextInput
              style={styles.input}
              placeholder="الكيلو وات "
              value={itemDescription}
              onChangeText={setItemDescription}
            />
              <TextInput
              style={styles.input}
              placeholder="ضغط الهواء "
              value={itemDescription}
              onChangeText={setItemDescription}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleAddItem}>
              <Text style={styles.textStyle}>إضافة </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width:200,
  },
  buttonOpen: {
    backgroundColor: '#1C5B7D',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default PopUp;